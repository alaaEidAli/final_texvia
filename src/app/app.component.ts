import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./layouts/navbar/navbar.component";
import { FooterComponent } from "./layouts/footer/footer.component";
import { NgxSpinnerComponent } from 'ngx-spinner';
import { AuthService } from './core/services/Auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent ,  NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TEXVIA';

  private readonly authService = inject(AuthService)
private readonly router = inject (Router)

ngOnInit(): void {
this.isLoggedIn()

}
   isLoggedIn(){
  const user = this.authService.getUser();
  if (user) {
    if (this.authService.isAdmin()) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
}
