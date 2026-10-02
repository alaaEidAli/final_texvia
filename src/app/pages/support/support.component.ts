import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-support',
  imports: [],
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss'
})
export class SupportComponent {
odooUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.odooUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://texvia-holding.odoo.com/support');
  }
}
