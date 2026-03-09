import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { NavigationService } from '../services/navigation-service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { map } from 'rxjs';
export const accessGuardGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  let naviagationService = inject(NavigationService);
  let router: Router = inject(Router);

  return authService.user$.pipe(
    map((user) => {
      if (user) {
       
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }),
  );
};
