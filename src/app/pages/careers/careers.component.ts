import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-careers',
  imports: [RouterLink],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.scss'
})
export class CareersComponent {
  private readonly router = inject(Router)

  goToPositionAutomationDtails():void{
   this.router.navigate(['/Automation-job-Details'])
  }

  goToPositionMesEngineerDetail():void{
    this.router.navigate(['/MES-Engineer-job-Details']);
  }
}
