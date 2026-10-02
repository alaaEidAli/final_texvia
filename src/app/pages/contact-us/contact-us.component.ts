import { Component, } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-contact-us',
  imports: [],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent{

   odooUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.odooUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://texvia-holding.odoo.com/contactus');
  }
}
