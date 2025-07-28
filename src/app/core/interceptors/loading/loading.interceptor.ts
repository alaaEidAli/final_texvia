import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
    const ngxSpinnerService = inject(NgxSpinnerService)
 if(!req.url.includes('/register') && !req.url.includes('/login') && !req.url.includes('/ForgetPassword') && !req.url.includes('/api/Contacts') && !req.url.includes('/api/auth/logout') ){
  ngxSpinnerService.show()
 }
  return next(req).pipe(finalize( ()=>{
    ngxSpinnerService.hide()
  }));
};
