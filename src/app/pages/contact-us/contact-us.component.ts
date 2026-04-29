import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TagManagerService } from '../../core/services/Tag-Manager/tag-manager.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-contact-us',
  imports: [ReactiveFormsModule ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent{

   odooUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.odooUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://texvia.odoo.com/contactus');
  }
}
