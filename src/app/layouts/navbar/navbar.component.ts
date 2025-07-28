import { isPlatformBrowser, NgClass } from '@angular/common';
import { Component, ElementRef, HostListener, inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {  Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/Auth/auth.service';

interface solutions{
  title: string,
  description:string,
  image:string ,
  icon:string 

} 
interface industries {
  title:string ,
  description :string ,
  icon:string
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive , NgClass],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

   private elementRef = inject(ElementRef);
   private sanitizer = inject(DomSanitizer)
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
   pLATFORM_ID = inject(PLATFORM_ID)


ngOnInit(): void {
}

  // all of this coe for solution dropdown
  solution:solutions[] = [
    {
      title: 'Digital Maturity Assessment',
      description:"Digital Maturity Assessment is a systematic evaluation of an organization's digital capabilities and readiness. It helps identify strengths and weaknesses, guiding strategic improvements for digital transformation.",
      image: 'assets/images/digital-maturity.jpg',
      icon: `<svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
               <path d="M7 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
               <path d="M11 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
               <path d="M15 15V17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
               <path d="M19 17V17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
             </svg>`
    },
    {
      title: 'Digital Transformation',
      description: "Digital Transformation involves integrating digital technologies into all areas of a business, fundamentally changing operations and delivering value to customers. It enhances efficiency and fosters innovation through technology adoption.",
      image: 'assets/images/digital-transformation.jpg',
      icon:  `<svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6Z" stroke="currentColor" stroke-width="2"/>
               <path d="M7 14L10 11L13 14L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
               <path d="M8 7H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
             </svg>`
    },
    {
      title: 'Smart Manufacturing',
      description: "Smart Manufacturing leverages advanced technologies like IoT and AI to optimize production processes. It increases efficiency, reduces costs, and improves product quality through real-time data analysis and automation.",
      image: 'assets/images/smart-manufacturing.jpg',
      icon: `<svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
               <path d="M7 7H10V17H7V7Z" fill="currentColor"/>
               <path d="M14 7H17V17H14V7Z" fill="currentColor"/>
               <path d="M3 10H21" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
               <path d="M3 14H21" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
             </svg>`
    },
    {
      title: 'Industrial Automation',
      description: "Industrial Automation refers to the use of control systems, such as computers and robots, to operate industrial processes. It enhances productivity, minimizes human error, and improves product consistency in manufacturing.",
      image: 'assets/images/industrial-automation.jpg',
      icon:  `<svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M12 3V9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
               <path d="M12 9L17 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
               <path d="M12 9L7 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
               <rect x="10" y="14" width="4" height="7" fill="currentColor"/>
               <path d="M5 21H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
             </svg>`
    },
    {
      title: 'PI System',
      description: "The PI System is a data management platform that collects, analyzes, and visualizes time-series data from industrial equipment. It provides real-time insights, enabling organizations to make informed decisions and optimize operations.",
      image: 'assets/images/pi-system.jpg',
      icon:  `<svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
               <path d="M12 8V16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
               <path d="M8 12H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
             </svg>`
    },
    {
      title: 'Real-Time Data & Analytics',
      description:"Real-Time Data & Analytics involve the immediate collection and analysis of data as it occurs. This capability allows businesses to respond swiftly to changes, enhancing operational efficiency and competitive advantage.",
      image: 'assets/images/realtime-analytics.jpg',
      icon: `<svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
               <path d="M7 14L10 11L13 14L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
               <path d="M8 7H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
             </svg>`
    },
    {
      title: 'AI-Ready IIoT Platform',
      description: "An AI-Ready IIoT Platform offers a comprehensive environment for gathering and analyzing data from connected devices. It supports intelligent and predictive applications, driving operational efficiency and fostering innovation in industrial processes.",
      image: 'assets/images/ai-iiot.jpg',
      icon: `<svg
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4C12 5.10457 11.1046 6 10 6C8.89543 6 8 5.10457 8 4C8 2.89543 8.89543 2 10 2C11.1046 2 12 2.89543 12 4Z"
                    />
                    <path
                      d="M16 15C16 16.1046 15.1046 17 14 17C12.8954 17 12 16.1046 12 15C12 13.8954 12.8954 13 14 13C15.1046 13 16 13.8954 16 15Z"
                    />
                    <path
                      d="M7 13C7 14.1046 6.10457 15 5 15C3.89543 15 3 14.1046 3 13C3 11.8954 3.89543 11 5 11C6.10457 11 7 11.8954 7 13Z"
                    />
                    <path
                      d="M20 8C20 9.10457 19.1046 10 18 10C16.8954 10 16 9.10457 16 8C16 6.89543 16.8954 6 18 6C19.1046 6 20 6.89543 20 8Z"
                    />
                    <path
                      d="M10 6L14 13"
                      stroke="currentColor"
                      stroke-width="1"
                      stroke-linecap="round"
                    />
                    <path
                      d="M14 13L18 10"
                      stroke="currentColor"
                      stroke-width="1"
                      stroke-linecap="round"
                    />
                    <path
                      d="M5 11L10 6"
                      stroke="currentColor"
                      stroke-width="1"
                      stroke-linecap="round"
                    />
                    <path
                      d="M14 13L5 15"
                      stroke="currentColor"
                      stroke-width="1"
                      stroke-linecap="round"
                    />
                  </svg>`
    }
  ];
  industry:industries[] =[
  
     {
      title :'Food & Beverage',
      description :"The Food & Beverage industry focuses on the processing, packaging, and distribution of food products. It emphasizes quality control, sustainability, and innovation to meet consumer demands and regulatory standards.",
      icon :` <svg
                  width='21'
                  height='21'
                  class="icon-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z"
                  />
                </svg>`

    },
     {
      title :'Life Sciences & Pharmaceuticals',
      description :'Life Sciences & Pharmaceuticals involve the research, development, and manufacturing of medical products and therapies. This sector is driven by innovation and regulatory compliance to enhance health outcomes and improve patient care.',
      icon :`<svg 
                  width='21'
                  height='21'
                  class="icon-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M7 2v2h1v14c0 2.21 1.79 4 4 4s4-1.79 4-4V4h1V2H7zm5 14c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2-4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm0-4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-4 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
                  />
                </svg>`

    },
     {
      title :'Water & Wastewater',
      description :'Water & Wastewater management encompasses the processes of collecting, treating, and distributing water, as well as treating sewage. Effective management ensures safe water supply and environmental protection, addressing public health and sustainability challenges.',
      icon :`<svg  
                 width='21'
                  height='21'
                  class="icon-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm0 18c-3.35 0-6-2.57-6-6.2 0-2.34 1.95-5.44 6-9.14 4.05 3.7 6 6.79 6 9.14 0 3.63-2.65 6.2-6 6.2zm-4-8c0 2.21 1.79 4 4 4s4-1.79 4-4c0-.5-.18-1.21-.82-2.26L12 4.8l-3.18 4.94C8.18 10.79 8 11.5 8 12z"
                  />
                </svg>`

    },
    {
      title :'Smart Cities',
      description :'Smart Cities utilize technology and data analytics to improve urban living conditions. They focus on enhancing transportation, energy efficiency, and public services, fostering sustainable development and improving the quality of life for residents.',
      icon :`<svg
                   width='21'
                  height='21'
                  class="icon-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z"
                  />
                </svg>`

    }
    ,
    {
      title :'Energy Management',
      description :'Energy Management involves monitoring and optimizing energy consumption in organizations. It aims to reduce costs, enhance sustainability, and improve operational efficiency through strategic energy use and renewable energy integration.',
      icon :`<svg
                   width='21'
                  height='21'
                  class="icon-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7 2v11h3v9l7-12h-4l4-8z" />
                </svg>`

    }
    
    
    ,{
      title :'Oil and Gas',
      description :'The Oil and Gas industry encompasses exploration, extraction, refining, and distribution of petroleum products. This sector is crucial for global energy supply and is increasingly focusing on sustainability and reducing environmental impact.',
      icon :`<svg
                 width='21'
                  height='21'
                  class="icon-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M20 13V4.83C20 3.27 18.73 2 17.17 2c-.75 0-1.47.3-2 .83l-1.25 1.25c-.16-.05-.33-.08-.51-.08-.4 0-.77.12-1.08.32l2.76 2.76c.2-.31.32-.68.32-1.08 0-.18-.03-.34-.07-.51l1.25-1.25c.15-.15.36-.24.58-.24.46 0 .83.37.83.83V13h-6.85c-.3-.21-.57-.45-.82-.72l-1.4-1.55c-.19-.21-.43-.38-.69-.5-.31-.15-.65-.23-1-.23C6 10.01 5 11.01 5 12.25V13H2v6c0 1.1.9 2 2 2 0 .55.45 1 1 1h14c.55 0 1-.45 1-1 1.1 0 2-.9 2-2v-6h-2z"
                  />
                </svg>`

    },
    {
      title :'Concrete Batching',
      description :'Concrete Batching refers to the process of mixing concrete ingredients to produce concrete for construction. It emphasizes precision, efficiency, and quality control to meet construction standards and project requirements.',
      icon :`<svg
                   width='21'
                  height='21'
                  class="icon-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z"
                  />
                </svg>`

    },
  ]
  isDropdownOpen:{ [key: string]: boolean }  = {
    dashboard: false,
    solutions: false,
    account: false ,
    industries : false
  };

  @ViewChild('dropdown') dropdown: ElementRef | undefined;
  @ViewChild('dropdown1') dropdown1: ElementRef | undefined;
  @ViewChild('dropdown2') dropdown2: ElementRef | undefined;
    @ViewChild('dropdown4') dropdown4: ElementRef | undefined;


   selectedSolution = this.solution[0]; // Default selection
   selectedIndustrey = this.industry[0];
  toggleDropdown(dropdownId: string, event: Event): void {
    event.stopPropagation();
    
    // Close all other dropdowns
    for (const key in this.isDropdownOpen) {
      if (key !== dropdownId) {
        this.isDropdownOpen[key] = false;
      }
    }
    // Toggle the clicked dropdown
    this.isDropdownOpen[dropdownId] = !this.isDropdownOpen[dropdownId];
  }

  preventClose(event: Event): void {
    event.stopPropagation();
  }

  selectSolution(solution: any, event: Event): void {
    event.stopPropagation();
    this.selectedSolution = solution;
  }

   selectindustries(industry: any, event: Event): void {
    event.stopPropagation();
    this.selectedIndustrey = industry;
  }
  getSvgSafe(icon: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }
@HostListener('document:click', ['$event'])
  closeDropdown(event: Event): void {
  const dropdowns = [this.dropdown, this.dropdown1, this.dropdown2 , this.dropdown4];
  const isClickInsideDropdown = dropdowns.some(d => d && d.nativeElement.contains(event.target));
  
  if (!isClickInsideDropdown) {
    this.isDropdownOpen = {
      dashboard: false,
      solutions: false,
      account: false ,
      industries : false ,
    };
  }
  }

  // to close all dropwon before go to page that i clicked
  closeAllDropdowns(event: Event): void {
  event.stopPropagation();
  this.isDropdownOpen = {
    dashboard: false,
    solutions: false,
    account: false ,
    inustries:false
  };
}
  // for dashboard to just apprear for admin 

  isAdmin() {
if(isPlatformBrowser(this.pLATFORM_ID)){
    return this.authService.isAdmin()

}
else return false
}
isLogged() :any{
  if(isPlatformBrowser(this.pLATFORM_ID)){
    const user = this.authService.getUser()
    return user != null  ? true : false
  }
}

 logOut(){
   const refreshToken = this.authService.getRefreshToken();
   this.authService.logout(refreshToken!).subscribe({
        next: (res) => {
          this.authService.clearTokens();
          this.router.navigate(['/home']);

          console.log(res)
        },
        error: () => {
          this.authService.clearTokens();
          this.router.navigate(['/home']);
        }
 
  })

}
}
