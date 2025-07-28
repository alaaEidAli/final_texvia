import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/Auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink} from '@angular/router';
import { NgClass } from '@angular/common';
import { AuthResponse } from '../../shared/Interfaces/user/user';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , RouterLink , NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

private readonly _FormBuilder = inject(FormBuilder)
private readonly authService = inject(AuthService)
private toastrService = inject(ToastrService)
private readonly router = inject (Router)

isLoading:boolean = false




loginForm =this._FormBuilder.group({
email :['' , [Validators.required , Validators.email]],
password :['' , [Validators.required , Validators.pattern('^(?=.*[0-9])(?=.*[A-Z]).{6,}$')]],

})

get passwordHasLength(){
    const password = this.loginForm.get('password')?.value;
    return password && password.length >= 6;
  }

  get passwordHasDigit(){
    const password = this.loginForm.get('password')?.value;
    return password && /\d/.test(password);
  }

  get passwordHasUpper() {
    const password = this.loginForm.get('password')?.value;
    return password && /[A-Z]/.test(password);
  }


  // submit login form 
submitLogin(){
if(this.loginForm.valid){
   this.isLoading= true ;
 const {...formData } = this.loginForm.value
 const userData: { email: string; password: string} = {
      email: formData.email!,
      password: formData.password!,
    };
  this.authService.Login(userData).subscribe({
        next:(res: AuthResponse) =>{
             this.authService.saveTokens(res);

    this.toastrService.success( 'log in sucessfully ');
         setTimeout(() => {
          if(this.authService.isAdmin()){
            this.router.navigate(['/dashboard-home']);
          }
          this.router.navigate(['/home']);
         }, 1000);
          
 } ,
 error:(err) =>{
  this.isLoading = false
  
  this.toastrService.error("invalid email or password")
 }
  })
}
else {
  this.loginForm.markAllAsTouched()
}
}


}
