
import { Component, Input, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-vertical-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vertical-progress-bar.component.html',
  styleUrls: ['./vertical-progress-bar.component.scss']
})
export class VerticalProgressBarComponent implements OnInit, AfterViewInit {

@Input() progress: number = 0;
  @ViewChild('container', { static: true }) container!: ElementRef;

  sliderHeight: number = 0;
  sliderTop: number = 0;
  sectionPositions: number[] = [];
  filledSections: boolean[] = [];
  private lastScrollPosition: number = 0;
  currentSectionColor: string = '#007bff';
  private sectionColors: string[] = [
    '#6A05A6', // maincolor
    '#45B7D1', // Blue
    '#96CEB4', // Green
    '#D4A5A5', // Pink
    '#9B59B6', // Purple
    '#2ECC71', // Emerald
    '#2C3E50'  // Dark Slate Gray
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateSlider();
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const sections = document.querySelectorAll('.homepage-section');
      if (sections.length === 0) {
        console.warn('No elements with class "homepage-section" found.');
        return;
      }

      const container = this.container.nativeElement;
      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top + window.scrollY;
      const containerHeight = containerRect.height;

      this.sectionPositions = Array.from(sections).map((section) => {
        const header = (section as HTMLElement).querySelector('.section-header') as HTMLElement;
        if (!header) {
          console.warn('No section-header found in section:', section);
          return 0;
        }
        const headerRect = header.getBoundingClientRect();
        const headerTop = headerRect.top + window.scrollY;
        const relativeTop = headerTop - containerTop;
        return (relativeTop / containerHeight) * 100;
      });

      this.filledSections = new Array(sections.length).fill(false);
      this.updateSlider();

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const header = entry.target as HTMLElement;
              const section = header.closest('.homepage-section') as HTMLElement;
              const sectionIndex = parseInt(section.dataset['sectionIndex'] || '0', 10);
              const totalSections = sections.length;
              this.progress = ((sectionIndex + 0.5) / totalSections) * 100;
              this.updateSlider();
            }
          });
        },
        { threshold: 0.5, rootMargin: '0px' }
      );

      sections.forEach((section, index) => {
        const header = (section as HTMLElement).querySelector('.section-header');
        if (header) {
          observer.observe(header);
        } else {
          console.warn(`No header found for section ${index}, observing section instead.`);
          observer.observe(section);
        }
        (section as HTMLElement).dataset['sectionIndex'] = index.toString();
      });
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const scrollPosition = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      this.progress = Math.min(100, (scrollPosition / maxScroll) * 100);
      this.lastScrollPosition = scrollPosition;
      const currentSectionIndex = this.sectionPositions.findIndex((position, index) => {
        const nextPosition = this.sectionPositions[index + 1] || 100;
        return this.progress >= position && this.progress < nextPosition;
      });
      this.currentSectionColor = this.getSectionColor(currentSectionIndex !== -1 ? currentSectionIndex : 0);
      console.debug(`Scroll: Progress = ${this.progress}%, Slider color = ${this.currentSectionColor}`);
      this.updateSlider();
    }
  }

  private updateSlider() {
    if (isPlatformBrowser(this.platformId)) {
      const containerHeight = this.container.nativeElement.offsetHeight;
      this.sliderHeight = (this.progress / 100) * containerHeight;
      this.filledSections = this.sectionPositions.map(position => this.progress >= position);
    }
  }

  getSectionColor(index: number): string {
    return this.sectionColors[index % this.sectionColors.length];
  }
}