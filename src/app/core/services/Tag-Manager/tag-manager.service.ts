import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';

  declare const dataLayer: any[];
@Injectable({
  providedIn: 'root'
})
export class TagManagerService {
constructor(private router: Router) {
}

//tracking pages view
trackPageView(url: string) {
       dataLayer.push({
         event: 'pages_view',
         page_path: url,
         page_title: document.title
       });
       console.log(document.title)
     }


// tracking section time 
   trackSectionView(sectionId: string, timeSpent: number, pagePath: string) {
       dataLayer.push({
         event: 'section_view',
         section_id: sectionId,
         time_spent: timeSpent,
         page_path: pagePath,
       });
     }  


      trackButtonClick(buttonId: string, pagePath: string) {
       dataLayer.push({
         event: 'button_click',
         button_id: buttonId,
         page_path: pagePath
       });
     }

     trackFormSubmit(formId: string, pagePath: string) {
       dataLayer.push({
         event: 'form_submit',
         form_id: formId,
         page_path: pagePath
       });
     }

     trackLogin(pagePath: string) {
       dataLayer.push({
         event: 'login',
         page_path: pagePath
       });
     }

     trackRegister(pagePath: string) {
       dataLayer.push({
         event: 'register',
         page_path: pagePath
       });
     }

}
