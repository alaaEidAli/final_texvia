import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/Auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AuthResponse } from '../../shared/Interfaces/user/user';



@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule , NgClass , RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
private readonly router= inject(Router)
private readonly _FormBuilder = inject(FormBuilder)
private readonly authService = inject(AuthService)
private toastrService = inject(ToastrService)
isLoading:boolean = false

registerForm =this._FormBuilder.group({
name :['' ,[Validators.required , Validators.minLength(3) , Validators.maxLength(20)] ],
email :['' , [Validators.required , Validators.email]],
password :['' , [Validators.required , Validators.pattern('^(?=.*[0-9])(?=.*[A-Z]).{6,}$')]],
// repassword: ['', Validators.required]

})

get passwordHasLength(){
    const password = this.registerForm.get('password')?.value;
    return password && password.length >= 6;
  }

  get passwordHasDigit(){
    const password = this.registerForm.get('password')?.value;
    return password && /\d/.test(password);
  }

  get passwordHasUpper() {
    const password = this.registerForm.get('password')?.value;
    return password && /[A-Z]/.test(password);
  }

submitRegisterForm():void {

if(this.registerForm.valid){
  this.isLoading= true ;
 const {...formData } = this.registerForm.value
 const userData: { email: string; password: string; name: string } = {
      email: formData.email!,
      password: formData.password!,
      name: formData.name!
    };
  this.authService.Register(userData).subscribe({
 next:(res: AuthResponse) =>{
    this.authService.saveTokens(res);
       this.toastrService.success( 'Email created successfully  ');
         setTimeout(() => {
          this.router.navigate(['/login']);
         }, 1000);
          
         console.log(res) 
        } ,
       error:(err) =>{
      this.isLoading = false
       this.toastrService.error(err.error.description)
 }
  })
}
else {
  this.registerForm.markAllAsTouched()
}
}

// confirmPassword(group : AbstractControl) {
// let password = group.get('password')?.value ;
// let rePassword = group.get('repassword')?.value;
//  return password === rePassword ? null : {mismatch : true}
// }



} 
 

