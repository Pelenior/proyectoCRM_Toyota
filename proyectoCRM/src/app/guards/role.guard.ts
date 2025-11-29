import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  // 1. Inject dependencies
  const authService = inject(AuthService);
  const router = inject(Router);

  // 2. Get the token
  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  // 3. Get the user's role from the token
  const userRole = authService.getRoleFromToken(token);

  // 4. Get the "Required Roles" (Array) from the route
  const expectedRoles = (route.data['expectedRole'] as Array<string>) || [];

  // 5. Compare: Check if the user's role exists inside the array
  // We add "userRole &&" to ensure we don't pass null to .includes()
  if (userRole && expectedRoles.includes(userRole)) {
    return true;
  } else {
    // User is logged in, but has the WRONG role
    console.warn(`Access Denied: User is '${userRole}', but path requires one of: ${JSON.stringify(expectedRoles)}`);
    
    // Redirect logic: send them to their "home" or back to login
    if (userRole === 'ADMIN' || userRole === 'ROLE_ADMIN') {
        router.navigate(['/admin']);
    } else if (userRole === 'CHOFER' || userRole === 'ROLE_CHOFER') {
        router.navigate(['/chofer']);
    } else {
        router.navigate(['/login']);
    }
    
    return false;
  }
};