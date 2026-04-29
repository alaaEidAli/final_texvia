import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-events',
  imports: [],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
 odooUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.odooUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://texvia.odoo.com/event');
  }
}
