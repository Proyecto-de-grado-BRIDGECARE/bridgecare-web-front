import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';

function getCurrentUserRole(): string | null {
  const userJson = sessionStorage.getItem('user');
  return userJson ? JSON.parse(userJson).type : null;
}

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const router = inject(Router);
  const requiredRoles = route.data['requiredRole'] as string[];
  const currentUserRole = getCurrentUserRole();

  if (currentUserRole && requiredRoles.includes(currentUserRole)) {
    return true;
  } else {
    router.navigate(['/unauthorized']);
    return false;
  }
};
