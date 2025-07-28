import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-position-job-details',
  imports:[ NgbNavModule , RouterLink , ToastrModule ],
  templateUrl: './position-job-details.component.html',
  styleUrl: './position-job-details.component.scss'
})
export class PositionJobDetailsComponent {
private readonly toastrService = inject(ToastrService)
private readonly platformId = inject(PLATFORM_ID);
  // switch between taps 
activeTab:number =1;
goToApplyTab(){
  this.activeTab =2;
}
//email
email:string ="Careers@Texviatech.com"
copiedEmail: string = ''; 

// to print email
copyEmail() {
  if (isPlatformBrowser(this.platformId)) {
    this.copiedEmail = this.email; 
    navigator.clipboard.writeText(this.email).then(() => {
       this.toastrService.success('copied the email successfully ')
    }).catch(err => {
       this.toastrService.error('copied the email Failed ')
    });
  }
  }

}
