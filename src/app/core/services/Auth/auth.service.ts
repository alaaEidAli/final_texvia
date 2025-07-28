import { HttpClient} from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environment/environment';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { AuthResponse, User } from '../../../shared/Interfaces/user/user';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient : HttpClient) { }
  private apiUrl  = environment.baseUrl
  private  pLATFORM_ID = inject(PLATFORM_ID)
 
  // register form
  Register(user:{ email: string; password: string; name: string; role?: "user" | "admin" }):Observable<AuthResponse>{
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/api/auth/register` ,
     user
    )
  }


  // login 
  Login(credentials: { email: string; password: string }) :Observable<AuthResponse> {
    return  this.httpClient.post<AuthResponse>(`${this.apiUrl}/api/auth/login` ,
      credentials
    )
  }

  // logout 
  logout(refreshToken: string): Observable<{ message: string }> {
    
    return this.httpClient.post<{ message: string }>(`${this.apiUrl}/api/auth/logout`, { refreshToken });
  }

  forgotPassword(email: string): Observable<any> {
 return this.httpClient.post(`${this.apiUrl}/api/auth/forgot-password`, { email });
  }

  resetPassword(email:string ,token: string, newPassword: string): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(`${this.apiUrl}/api/auth/reset-password`, { email ,token, newPassword });
  }
// refreash token 
refreshToken(refreshToken: string): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/api/auth/refresh`, { refreshToken });
  }

  //get all users 
  getAllusers(): Observable<User[]> {
  return this.httpClient.get<User[]>(`${this.apiUrl}/api/auth/all-users`)
}



  // save all tokens  => refresh token do not send user data so i do not remove user from local storage
    saveTokens(authResponse: AuthResponse): void {
     if (isPlatformBrowser(this.pLATFORM_ID)) {
      localStorage.setItem('accessToken', authResponse.accessToken);
      localStorage.setItem('refreshToken', authResponse.refreshToken);
      if (authResponse.user) {
        localStorage.setItem('user', JSON.stringify(authResponse.user));
      } 
    }
  }


   getAccessToken(): string | null {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      return localStorage.getItem('accessToken');
    }
    return null;
  }

  getRefreshToken(): string | null {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      return localStorage.getItem('refreshToken');
    }
    return null;
  }

  getUser(): User | null {
    if(isPlatformBrowser(this.pLATFORM_ID)) {
      const user = localStorage.getItem('user');
      if (user) {
        return JSON.parse(user);
      }
      
    }
    return null;
  }

   clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  isAdmin(){
    if(isPlatformBrowser(this.pLATFORM_ID)){
    const user = this.getUser();
    return user?.role === 'admin';
  }
  return false
}


  // Try to refresh token
  tryRefreshToken(): Observable<boolean> {
    if (!isPlatformBrowser(this.pLATFORM_ID)) {
      return of(false);
    }
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.clearTokens();
      return of(false);
    }
    return this.refreshToken(refreshToken).pipe(
      map(authResponse => {
        this.saveTokens(authResponse);
        return true;
      }),
      catchError(error => {
        this.clearTokens();
        return of(false);
      })
    );
  }

}
