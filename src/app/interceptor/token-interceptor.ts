import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);
  const router = inject(Router);

  console.log(auth.getToken());

  if (!auth.getToken()) return next(req);

  const cloned = req.clone({
    headers: req.headers.set(
      'Authorization',
      'Bearer ' + auth.getToken()
    ),
  });

  return next(cloned).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        auth
          .refreshToken({
            email: auth.getUserDetail()?.email,
            token: auth.getToken() || '',
            refreshToken: auth.getRefreshToken() || '',
          })
          .subscribe({
            next: (response) => {
              if (response.isSuccess) {
                localStorage.setItem('user', JSON.stringify(response));
                const cloned = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${response.token}`,
                  },
                });
                location.reload();
              }
            },
            error: () => {
              auth.logout();
              router.navigate(['/login']);
            },
          });
      }
      return throwError(err);
    })
  );
};