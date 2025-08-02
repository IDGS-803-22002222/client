import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

export const roleGuard: CanActivateFn = (route, state) => {
  const roles = route.data['roles'] as string[];
  const auth = inject(Auth);
  const matSnackBar = inject(MatSnackBar);

  const router = inject(Router);
  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    matSnackBar.open('You must log in to view this page', 'OK', {
      duration: 3000,
    });
    return false;
  }
  const userRoles = auth.getRoles();
  console.log(userRoles);
  console.log(roles);

  if (roles.some((role) => userRoles?.includes(role))) return true;
  router.navigate(['/']);
  matSnackBar.open('You do not have permission to view this page', 'OK', {
    duration: 3000,
  });
  return false;
};