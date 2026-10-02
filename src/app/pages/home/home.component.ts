
import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef,ViewChild, inject, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { NgParticlesService, NgxParticlesModule} from '@tsparticles/angular';
import { loadSlim } from '@tsparticles/slim';
import {   Engine, FullScreen, } from '@tsparticles/engine';
import { Router, RouterLink } from '@angular/router';
import { concatMap,  Subject, takeUntil, timer } from 'rxjs';
import { VerticalProgressBarComponent } from "../vertical-progress-bar/vertical-progress-bar.component";

interface home{
  top:string,
  header:string,
  description:string,
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass, NgxParticlesModule, VerticalProgressBarComponent , RouterLink],
  templateUrl: './home.component.html',
 
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
@ViewChild('flowTrack') flowTrack!: ElementRef;

  // Services
  private readonly ngParticlesService = inject(NgParticlesService);
  private readonly router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
   
  

  // Tracking time for Google Analytics
  private observers: IntersectionObserver[] = [];
  private sectionTimes: { [key: string]: number } = {
    'Home-Page-First-Screen-Section': 0,
    'Who-We-Are-Section': 0,
    'Solutions-Section': 0,
    'How-We-Do-Section': 0,
    'Core-Values-Section': 0,
    'Why-Texvia-Section': 0,
    'Insights-Section': 0
  };
  private sectionStartTimes: { [key: string]: number } = {};

  // Particles options
 
 particlesOptions1:any = {
    Background:{position:{value:'absolute'} , resizeTo : true },
    fpsLimit: 120,
    interactivity: {
      // detectsOn: 'window',
      events: {
        onClick: { enable: false },
        onHover: { enable: true, mode: 'repulse' }
      },
      modes: {
        push: { quantity: 4 },
        repulse: { distance: 200, duration: 0.4 }
      }
    },
    particles: {
      color: { value: '#ffffff' },
      links: { color: '#ffffff', distance: 150, enable: true, opacity: 0.5, width: .5 },
      move: { direction: 'none', enable: true, outModes: { default: 'bounce' }, random: false, speed: 2, straight: false },
      number: { density: { enable: true, area: 800 }, value: 70 },
      opacity: { value: 0.5 },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };
  particlesOptions2: any = {
    // background: { resizeTo: true },
    fpsLimit: 80,
     FullScreen:{enable: false},
    interactivity: {
      events: { onClick: { enable: true, mode: 'push' }, onHover: { enable: true, mode: 'repulse' }, resize: { enable: true } },
      modes: { push: { quantity: 4 }, repulse: { distance: 200, duration: 0.4 } }
    },
    particles: {
      color: { value: '#ffffff' },
      links: { color: '#ffffff', distance: 150, enable: true, opacity: 0.5, width: 0.5 },
      move: { direction: 'none', enable: true, outModes: { default: 'bounce' }, random: false, speed: 2, straight: false },
      number: { density: { enable: true, area: 100 }, value: 50 },
      opacity: { value: 0.5 },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 2 } }
    },
    detectRetina: true
  };




  // Home caption data
  homeCaption: home[] = [
    { top: 'Your Digital Transformation Partner', header: 'From Data to Decisions. Smarter Industry Starts Here', description: 'We help industrial enterprises improve efficiency, gain real-time visibility, and future-proof their operations through digital transformation, automation, and connected technologies' },
    { top: 'Operational Intelligence Delivered', header: 'Digitize. Connect. Transform', description: 'Empower your operations with integrated platforms for automation, real-time monitoring, and industrial analytics—designed to scale with your digital innovation goals.' },
    { top: 'Built for Industry 4.0', header: 'Connected Operations for a Connected World.', description: 'We design and implement secure, scalable, and intelligent solutions that support Industry 4.0 strategies—from edge connectivity to advanced manufacturing systems.' },
    { top: 'Digital + Sustainable by Design', header: 'Drive Efficiency. Deliver Impact', description: 'Support your ESG initiatives and reduce operational waste with energy-efficient technologies, smart data insights, and sustainable industrial solutions.' },
    { top: 'Real-Time Intelligence', header: 'Turn Complexity into Clarity.', description: 'Unify your industrial data, workflows, and teams with real-time insights that drive faster decisions and better execution across operations.' }
  ];
  currentHomeCaption: home = this.homeCaption[0];
  currentIndex: number = 0;
  isVisible = true;
  private readonly destroy$ = new Subject<void>();

  currentInd = 0;
  visibleItems = 3;
  private autoSlideInterval: any;
  private isPaused = false;
  private readonly slideInterval = 3000;
  private readonly pauseDuration = 10000;
 isPlatformBrowser = isPlatformBrowser;
   platformId =inject(PLATFORM_ID)
  constructor() {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.ngParticlesService.init(async (engine: any) => {
        await loadSlim(engine);
      });
      this.homePageCaption();
    }



  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateVisibleItems();
      this.startAutoSlide();
      window.addEventListener('resize', () => this.updateVisibleItems());
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.stopAutoSlide();
      window.removeEventListener('resize', () => this.updateVisibleItems());
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  homePageCaption(): void {
    timer(2000, 8000)
      .pipe(
        concatMap(() =>
          timer(7000).pipe(
            concatMap(() => {
              this.isVisible = false;
              this.cdr.detectChanges();
              return timer(1000);
            }),
            concatMap(() => {
              this.currentIndex = (this.currentIndex + 1) % this.homeCaption.length;
              this.currentHomeCaption = this.homeCaption[this.currentIndex];
              this.isVisible = true;
              this.cdr.detectChanges();
              return timer(0);
            })
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  updateVisibleItems() {
    if (isPlatformBrowser(this.platformId)) {
      const width = window.innerWidth;
      if (width < 768) {
        this.visibleItems = 1;
      } else if (width < 992) {
        this.visibleItems = 2;
      } else if (width < 1200) {
        this.visibleItems = 3;
      } else {
        this.visibleItems = 4;
      }
      this.updateTrackPosition();
    }
  }

  moveLeft() {
    if (this.currentInd > 0) {
      this.currentInd--;
      this.updateTrackPosition();
      this.pauseAutoSlide();
    }
  }

  moveRight() {
    if (this.currentInd < 5 - this.visibleItems) {
      this.currentInd++;
      this.updateTrackPosition();
      this.pauseAutoSlide();
    }
  }

  goToItem(index: number) {
    if (index >= 0 && index <= 5 - this.visibleItems) {
      this.currentInd = index;
      this.updateTrackPosition();
      this.pauseAutoSlide();
    }
  }

  private updateTrackPosition() {
    if (isPlatformBrowser(this.platformId)) {
      const track = this.flowTrack.nativeElement as HTMLElement;
      const itemWidth = 300;
      track.style.transform = `translateX(-${this.currentInd * itemWidth}px)`;
    }
  }

  private startAutoSlide() {
    if (isPlatformBrowser(this.platformId)) {
      this.stopAutoSlide();
      this.autoSlideInterval = setInterval(() => {
        if (!this.isPaused) {
          if (this.currentInd < 5 - this.visibleItems) {
            this.currentInd++;
          } else {
            this.currentInd = 0;
          }
          this.updateTrackPosition();
        }
      }, this.slideInterval);
    }
  }

  private pauseAutoSlide() {
    this.isPaused = true;
    setTimeout(() => {
      this.isPaused = false;
    }, this.pauseDuration);
  }

  private stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  
  talkToExpert(): void {
    this.router.navigate(['/contact']);
  }

  goToSolution(): void {
    this.router.navigate(['/solutions']);
  }



  


}