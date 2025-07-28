import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/Auth/auth.service';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
const authService = inject(AuthService)
const token  = authService.getAccessToken() ;
// if the rquest has a header 
  if(token) {
    if(!req.url.includes('login')  && !req.url.includes('solutions') && !req.url.includes('inustries')  ){
    req=  req.clone({
        setHeaders :{  
           Authorization: `Bearer ${token}`
          }
      })
    }
  }
  return next(req);
};
