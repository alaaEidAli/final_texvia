import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

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
//   {
//   path: 'careers',
//   loadComponent: () => import('./pages/careers/careers.component').then(m => m.CareersComponent),
//   title: 'Careers - TEXVIA',
//   children: [
//     { path: '', pathMatch: 'full'  },          
//     { path: ':jobSlug'  }    
//   ]
// }, 
  {
    path:'support',
    loadComponent:() =>import('./pages/support/support.component').then(m=> m.SupportComponent),
    title:'Support -TEXVIA'
  },  

  {
    path: 'events',
    loadComponent: () => import('./pages/events/events.component').then(m => m.EventsComponent),
   title: 'Events - TEXVIA ' 
  },
  
 {
    path: 'contact',
    loadComponent: () => import('./pages/contact-us/contact-us.component').then(m => m.ContactUsComponent),
   title: 'contact - TEXVIA ' 
  },
 
  {
    path: '**',
    redirectTo: 'home',
  },
];
