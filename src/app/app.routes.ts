import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { adminGuard } from './core/guards/admin/admin.guard';

export const routes: Routes = [
     {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
   title :'Home - TEXVIA'
    },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/DashBoard-pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate:[adminGuard],
   children:[
    {path: '' , redirectTo:'dashboard-home' , pathMatch:'full'},
    {
        path: 'dashboard-home',
        loadComponent: () => import('./pages/DashBoard-pages/dashboard-Home/dashboard.component').then(m => m.DashboardComponent),
        title: 'dashboard- home TEXVIA'
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/DashBoard-pages/dashboard-users/dashboard-users.component').then(m => m.DashboardUsersComponent),
         title: 'dashboard- user TEXVIA'
      },
      {
        path: 'contact-submission',
        loadComponent: () => import('./pages/DashBoard-pages/dashdoard-contact-submissions/dashdoard-contact-submissions.component').then(m => m.DashdoardContactSubmissionsComponent ),
      },
       {
        path: 'job-Management',
        loadComponent: () => import('./pages/DashBoard-pages/dahboard-job-management/dahboard-job-management.component').then(m => m.DahboardJobManagementComponent),
      },
      {
        path: 'Applicant-Page',
        loadComponent: () => import('./pages/DashBoard-pages/applicant-page/applicant-page.component').then(m => m.ApplicantPageComponent),
      },
   ]
    
  },
  

  {
    path: 'solutions',
    loadComponent: () => import('./pages/solutions/solutions.component').then(m => m.SolutionsComponent),
 title: 'Solutions - TEXVIA' 
  },
  {
    path: 'industries',
    loadComponent: () => import('./pages/industries/industries.component').then(m => m.IndustriesComponent),
   title: 'Industries - TEXVIA' 
  },
   {
    path: 'careers',
    loadComponent: () => import('./pages/careers/careers.component').then(m => m.CareersComponent),
  title: 'careers - TEXVIA', 
   },
   {
    path: 'Automation-job-Details',
    loadComponent: () => import('./pages/position-job-details/position-job-details.component').then(m => m.PositionJobDetailsComponent),
    title: 'job Details -TEXVIA' 
  },
  {
    path: 'MES-Engineer-job-Details',
    loadComponent: () => import('./pages/position-job-details copy/position-job-details.component').then(m => m.PositionJobDetailsComponent),
    title: 'job Details -TEXVIA' 
  },
  {
    path: 'courses',
    loadComponent: () => import('./pages/courses/courses.component').then(m => m.CoursesComponent),
    //data:{ title: 'Courses',
  },
  
 {
    path: 'contact',
    loadComponent: () => import('./pages/contact-us/contact-us.component').then(m => m.ContactUsComponent),
   title: 'contact - TEXVIA ' 
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
   title: 'Login - TEXVIA' 
  },
  {
    path: 'ForgetPassword',
    loadComponent :() => import('./pages/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent),
   title: 'Forget Password - TEXVIA' 
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
   title: 'Register - TEXVIA' 
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
