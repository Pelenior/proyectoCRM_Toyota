import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Get the token from local storage
  const token = localStorage.getItem('token');

  // 2. If token exists, clone the request and add the header
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    // Pass the modified request to the next step
    return next(clonedRequest);
  }

  // 3. If no token (e.g. login page), just pass the original request
  return next(req);
};