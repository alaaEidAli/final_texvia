import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TagManagerService } from '../../core/services/Tag-Manager/tag-manager.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/Auth/auth.service';
import { ContactService } from '../../core/services/Contact/contact.service';
import { CreateIcontactForm} from '../../shared/IcontactForm/icontact-form';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-contact-us',
  imports: [ReactiveFormsModule ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent{
private tagManagerService= inject(TagManagerService);
 private router = inject(Router);
  private fb = inject(FormBuilder) 
 private authService = inject(AuthService)
 private contactService = inject(ContactService)
 private readonly toastrService= inject(ToastrService)
 private pLATFORM_ID= inject(PLATFORM_ID)
  isSubmitting = false;
 


contactForm = this.fb.group({
    name: ['', Validators.required],
    mobile: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    title: ['', Validators.required],
    company: ['', Validators.required],
    region: ['', Validators.required],
    solutionId: ['1', Validators.required], // Default to "Digital Maturity Assessment" (id: 1)
    Industries: ['', Validators.required],
    message: ['', Validators.required]
  });

    onSubmit() {
    if (this.contactForm.valid) {
     
    this.isSubmitting = true;
const formData: CreateIcontactForm = {
        name: this.contactForm.get('name')?.value!,
        mobile: this.contactForm.get('mobile')?.value!,
        email: this.contactForm.get('email')?.value!,
        title: this.contactForm.get('title')?.value!,
        company: this.contactForm.get('company')?.value!,
        region: this.contactForm.get('region')?.value!,
        solutionid: Number(this.contactForm.get('solutionId')?.value!), // Convert to number
        Industries: this.contactForm.get('Industries')?.value!,
        message: this.contactForm.get('message')?.value!
      };

   this.contactService.submitContactForm(formData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
       this.toastrService.success( 'Your message has been sent successfully!');
          this.contactForm.reset({ solutionId: '1' });
        },
        error: (err) => {
          this.isSubmitting = false;
          this.toastrService.error('Failed to send message. Please try again later.');
        }
      });
    } else {
      this.contactForm.markAllAsTouched();
    
   
}
  }

   
}
