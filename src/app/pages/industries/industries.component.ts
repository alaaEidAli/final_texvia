import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { fromEvent, Subject, takeUntil, throttleTime } from 'rxjs';
import { IndustriesService } from '../../core/services/industries/industries.service';
import { Iindustry } from '../../shared/Interfaces/Iindustry/iindustry';
@Component({
  selector: 'app-industries',
  imports: [RouterLink],
  templateUrl: './industries.component.html',
  styleUrl: './industries.component.scss'
})
export class IndustriesComponent implements OnInit{


 private readonly router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private industriesService = inject(IndustriesService)
 industryData : Iindustry[] =[]

ngOnInit(): void {
  this.getIndustriesData()
}


private destroy$ = new Subject<void>(); 
  constructor() {
       if(isPlatformBrowser(this.platformId)) {
    fromEvent(window, 'scroll')
      .pipe(
        throttleTime(100, undefined, { leading: true, trailing: true }), 
        takeUntil(this.destroy$) 
      )
      .subscribe((event) => this.onWindowScroll(event));
  }
}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onWindowScroll(event: Event): void {
 
         if (isPlatformBrowser(this.platformId)) {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      const adjustedScrollPosition = scrollPosition + window.innerHeight / 2; 
      
      const sections = document.querySelectorAll<HTMLElement>('.industry-cards');
      let activeSectionId: string | null = null;

      sections.forEach((section: HTMLElement) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

      
        if (
          sectionTop <= adjustedScrollPosition &&
          sectionBottom > adjustedScrollPosition
        ) {
          activeSectionId = section.id;
        }
      });


      const navLinks = document.querySelectorAll<HTMLAnchorElement>('.navs .nav .nav-item .nav-link');

      navLinks.forEach((link: HTMLAnchorElement) => {
       const href = link.getAttribute('href');
               const linkFragment = href ? href.split('#')[1] : null;
        if (activeSectionId && linkFragment === String(activeSectionId)) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
}


// get Inustries 
getIndustriesData():void {
this.industriesService.getIndustries().subscribe({
  next:(res) =>{
    this.industryData = res.data
  },
  error:(err) =>{
    console.log(err)
  }
})
}


}
