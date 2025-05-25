#!/bin/bash

# Exit on errors
set -e

# Define paths
PROJECT_DIR=~/services/bridgecare-web-front
DEPLOY_DIR=/var/www/html

echo "Starting deployment..."

# Navigate to project directory
cd "$PROJECT_DIR"

# Optional: Install dependencies only if package.json or package-lock.json changed
PACKAGE_HASH_FILE="$PROJECT_DIR/.package_hash"
CURRENT_HASH=$(cat "$PROJECT_DIR/package.json" "$PROJECT_DIR/package-lock.json" 2>/dev/null | sha256sum | cut -d' ' -f1)

if [[ -f "$PACKAGE_HASH_FILE" ]]; then
    LAST_HASH=$(cat "$PACKAGE_HASH_FILE")
else
    LAST_HASH=""
fi

if [[ "$CURRENT_HASH" != "$LAST_HASH" ]]; then
    echo "Detected change in dependencies, running npm install..."
    /home/dan/.nvm/versions/node/v22.15.1/bin/npm install --prefix "$PROJECT_DIR"
    echo "$CURRENT_HASH" > "$PACKAGE_HASH_FILE"
else
    echo "No dependency changes detected, skipping npm install."
fi

# Clean previous Angular cache and build files
rm -rf .angular/cache dist

# Build Angular project
echo "Building Angular project..."
/home/dan/.nvm/versions/node/v22.15.1/bin/ng build --configuration=production

# Set DIST_DIR after building
DIST_DIR=$(ls -d "$PROJECT_DIR/dist/"* | head -n 1)

# Ensure correct permissions for copying
echo "Updating deployment folder..."
sudo rm -rf "$DEPLOY_DIR"/*
sudo cp -r "$DIST_DIR"/* "$DEPLOY_DIR"/

# Restart Nginx to apply changes
echo "Restarting Nginx..."
sudo systemctl restart nginx

echo "Deployment successful!"
