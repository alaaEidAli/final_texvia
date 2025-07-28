import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';
import { of, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const adminGuard: CanActivateFn = (route, state) => {
   const router = inject(Router)
  const authService= inject(AuthService)
  const toastrService= inject(ToastrService)
    const pLATFORM_ID =inject(PLATFORM_ID)
  
    if(isPlatformBrowser(pLATFORM_ID)){
  const user =authService.getUser()
        //  if (!user) {
        //    return authService.tryRefreshToken().pipe(
        //      switchMap(success => {
        //        if (success) {
        //          if (authService.isAdmin()) {
        //            return of(true);
        //          } else {
        //             toastrService.error('Access denied: Admins only.');
        //            router.navigate(['/home']);
        //            return of(false);
        //          }
        //        } else {
        //          toastrService.error('Please log in to access this page.');
        //          router.navigate(['/login']);
        //          return of(false);
        //        }
        //      })
        //    );
        //  }
        //  if (!authService.isAdmin()) {
        //   toastrService.error('Access denied: Admins only.');
        //    router.navigate(['/home']);
        //    return of(false);
        //  }
        //  return of(true);
        
    if (user && authService.isAdmin()) {
      return of(true);
    }
    return authService.tryRefreshToken().pipe(
      switchMap(success => {
        if (success) {
          if (authService.isAdmin()) {
            console.log('Admin access granted after token refresh');
            return of(true);
          } else {
            console.log('User is not an admin after token refresh');
            toastrService.error('Access denied: Admins only.');
            router.navigate(['/home']);
            return of(false);
          }
        } else {
          console.log('Token refresh failed, redirecting to login');
          toastrService.error('Please log in to access this page.');
          router.navigate(['/login']);
          return of(false);
        }
      })
    );
  }
       
       else{
        return false
       }
      
};
