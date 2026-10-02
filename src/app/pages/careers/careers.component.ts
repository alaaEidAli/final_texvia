import { Component, inject, OnInit, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-careers',
  imports: [],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.scss'
})
export class CareersComponent  implements OnInit {
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);

  private readonly BASE_URL = 'https://texvia-holding.odoo.com/jobs';
  
  iframeUrl = signal<SafeResourceUrl | null>(null);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const jobId = params['job_id'];
      
      

      let finalPath = this.BASE_URL;

      if (jobId) {
        finalPath = `${this.BASE_URL}/${jobId}`;
      }


      this.iframeUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(finalPath));
    });
  }
}
