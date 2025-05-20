#!/bin/bash

# Exit on errors
set -e

# Define paths
PROJECT_DIR=~/services/bridgecare-web-front
DEPLOY_DIR=/var/www/html

echo "Starting deployment..."

# Navigate to project directory
cd $PROJECT_DIR

# Build Angular project
echo "Building Angular project..."
ng build --configuration=production

# Set DIST_DIR after building
DIST_DIR=$(ls -d ~/services/bridgecare-web-front/dist/* | head -n 1)

# Ensure correct permissions for copying
echo "Updating deployment folder..."
sudo rm -rf $DEPLOY_DIR/*
sudo cp -r $DIST_DIR/* $DEPLOY_DIR/

# Restart Nginx to apply changes
echo "Restarting Nginx..."
sudo systemctl restart nginx

echo "Deployment successful!"
