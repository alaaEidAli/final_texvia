
 import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/Auth/auth.service';
import { User } from '../../../shared/Interfaces/user/user';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-dashboard-users',
  imports: [ RouterLink , RouterLinkActive , ReactiveFormsModule , NgClass],
  templateUrl: './dashboard-users.component.html',
  styleUrl: './dashboard-users.component.scss'
})
export class DashboardUsersComponent {
 private readonly _FormBuilder = inject(FormBuilder)
 private readonly authService = inject(AuthService)
 private readonly toastrService= inject(ToastrService)
  admins: User[] = [];
  users: User[] = [];


  // Pagination variables for Admins
  currentPageAdmins: number = 1;
  pageSizeAdmins: number = 4;
  totalAdmins: number = 0;

  // Pagination variables for Users
  currentPageUsers: number = 1;
  pageSizeUsers: number = 4; 
  totalUsers: number = 0;

  ngOnInit(): void {
    this.getusers();
    // this.getAllUsers();
  }

  getusers(): void {
    this.authService.getAllusers().subscribe({
      next: (res) => {
        this.admins = res.filter(res => res.role == 'admin');
         this.users = res.filter(res => res.role =='user')
        this.totalAdmins = this.admins.length;
        this.totalUsers = this.users.length;
      },
      error: (err) => {
        if (err.status === 401) {
          const refreshToken = this.authService.getRefreshToken();
          if (refreshToken) {
            this.authService.refreshToken(refreshToken).subscribe({
              next: (authResponse) => {
                this.authService.saveTokens(authResponse);
                 if (!this.authService.getUser()) {
                  this.authService.clearTokens();
                } else {
                 this.getusers(); // Retry
                }
               
              },
              error: () => {
                this.authService.clearTokens();
              }
            });
          } else {
            this.authService.clearTokens();
          }
        }
      }
    });
  }



  // Pagination for Admins
  get paginatedAdmins(): User[] {
    const startIndex = (this.currentPageAdmins - 1) * this.pageSizeAdmins;
    return this.admins.slice(startIndex, startIndex + this.pageSizeAdmins);
  }

  get adminPages(): number[] {
    const pageCount = Math.ceil(this.totalAdmins / this.pageSizeAdmins);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  changeAdminPage(page: number): void {
    if (page >= 1 && page <= this.adminPages.length) {
      this.currentPageAdmins = page;
    }
  }

  // Pagination for Users
  get paginatedUsers(): User[] {
    const startIndex = (this.currentPageUsers - 1) * this.pageSizeUsers;
    return this.users.slice(startIndex, startIndex + this.pageSizeUsers);
  }

  get userPages(): number[] {
    const pageCount = Math.ceil(this.totalUsers / this.pageSizeUsers);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  changeUserPage(page: number): void {
    if (page >= 1 && page <= this.userPages.length) {
      this.currentPageUsers = page;
    }
  }


  // add new admin 
  addAdminForm =this._FormBuilder.group({
name :['' ,[Validators.required , Validators.minLength(3) , Validators.maxLength(20)] ],
email :['' , [Validators.required , Validators.email]],
password :['' , [Validators.required , Validators.pattern('^(?=.*[0-9])(?=.*[A-Z]).{6,}$')]],
// repassword: ['', Validators.required]

})

submitAddAdmin(){
   if (this.addAdminForm.valid) {
    
      const {...newAdmin} = this.addAdminForm.value;
       const userData :{email:string  ; password :string ; name: string ; role : string  | undefined |any} ={
        email : newAdmin.email! ,
       password :newAdmin.password! ,
         name: newAdmin.name ! ,
      role : 'admin' ,
       }
      this.authService.Register(userData).subscribe({
        next: (response) => {
          this.toastrService.success('New admin added successfully.');
          this.addAdminForm.reset();
           this.getusers()
          
        },
        error: (err) => {
          this.toastrService.error(err.error?.message || 'Failed to add new admin.');
          if (err.status === 401) {
            const refreshToken = this.authService.getRefreshToken();
            if (refreshToken) {
              this.authService.refreshToken(refreshToken).subscribe({
                next: (authResponse) => {
                  this.authService.saveTokens(authResponse);
                    if (!this.authService.getUser()) {
                  this.authService.clearTokens();
                } else {
               this.submitAddAdmin(); // Retry adding admin
                }
                  
                },
                error: (refreshErr) => {
                  this.authService.clearTokens();
                  this.toastrService.error('Session expired. Please log in again.');
                }
              });
            } else {
              this.authService.clearTokens();
              this.toastrService.error('Please log in to access this page.');
            }
          }
        }
      });
    }
}
}
