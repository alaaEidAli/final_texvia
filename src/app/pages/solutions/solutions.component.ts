import { isPlatformBrowser, NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { fromEvent, Subject, take, takeUntil, throttleTime } from 'rxjs';
import { SolutionsService } from '../../core/services/Solutions/solutions.service';
import { Isolutions } from '../../shared/Interfaces/Isolution/isolutions';
@Component({
  selector: 'app-solutions',
  imports: [RouterLink],
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.scss'
})
export class SolutionsComponent implements OnInit {
private readonly router = inject(Router);
  private solutionsService = inject(SolutionsService);
  private platformId = inject(PLATFORM_ID);
  private route = inject(ActivatedRoute);
  SolutionsData: Isolutions[] = [];
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.getSolutionsData();
    if (isPlatformBrowser(this.platformId)) {
      fromEvent(window, 'scroll')
        .pipe(
          throttleTime(100, undefined, { leading: true, trailing: true }),
          takeUntil(this.destroy$)
        )
        .subscribe((event) => this.onWindowScroll(event));
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.route.fragment.subscribe((fragment) => {
        if (fragment) {
          const fragmentAsString = String(fragment);
          const scrollToSection = (attempts = 10, interval = 100) => {
            const element = document.getElementById(fragmentAsString);
            if (element) {
              const navbarHeight = 80; 
              const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
              window.scrollTo({
                top: elementPosition - navbarHeight,
                behavior: 'smooth'
              });
              this.updateActiveNavLink(fragmentAsString);
            } else if (this.SolutionsData.length > 0 || attempts <= 0) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              setTimeout(() => scrollToSection(attempts - 1, interval), interval);
            }
          };
          setTimeout(() => scrollToSection(), 100);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getSolutionsData(): void {
    this.solutionsService.getSolutions().subscribe({
      next: (res) => {
        this.SolutionsData = res.data;
      },
      error: (err) => {
      }
    });
  }

  onWindowScroll(event: Event): void {
    if (isPlatformBrowser(this.platformId)) {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      const adjustedScrollPosition = scrollPosition + window.innerHeight / 2;

      const sections = document.querySelectorAll<HTMLElement>('.solutions-cards');
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

      this.updateActiveNavLink(activeSectionId);
    }
  }

  updateActiveNavLink(activeSectionId: string | null): void {
    const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav .nav-item .nav-link');
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

  goToIndustries(): void {
    this.router.navigate(['/industries']);
  }
  
}
