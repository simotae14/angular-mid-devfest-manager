import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isAdmin = localStorage.getItem('isAdmin') === 'true'; // because localStorage stores everything as strings

  if (isAdmin) {
    return true; // Allow access to the route
  }

  alert('No Access here!!!');
  return router.createUrlTree(['/']); // Redirect to home page if not admin
};