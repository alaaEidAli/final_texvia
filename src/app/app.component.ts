import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./layouts/navbar/navbar.component";
import { FooterComponent } from "./layouts/footer/footer.component";
import { NgxSpinnerComponent } from 'ngx-spinner';
import { filter,  } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent ,  NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TEXVIA';

private readonly router = inject (Router)
showFooter = true; 



ngOnInit(): void {

    // Listen to route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const hiddenRoutes = ['/contact', '/careers', '/events' , '/support'];
      // Hide if the current URL matches any in the list
      this.showFooter = !hiddenRoutes.some(route => event.urlAfterRedirects.includes(route));
    });

}
  


 

}




