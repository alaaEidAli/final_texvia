import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/Auth/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet , RouterLink , RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  logOut(){
   const refreshToken = this.authService.getRefreshToken();
   this.authService.logout(refreshToken!).subscribe({
        next: (res) => {
          this.authService.clearTokens();
          this.router.navigate(['/home']);
        },
        error: () => {
          this.authService.clearTokens();
          this.router.navigate(['/home']);
        }
 
  })
  }
}
