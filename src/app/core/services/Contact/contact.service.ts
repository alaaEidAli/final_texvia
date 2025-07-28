import { HttpClient} from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private httpClient: HttpClient) { }
     
     private apiUrl  = environment.baseUrl
   
   getContactSubmissions(page: number, pageSize: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/api/Contacts?pageIndex=${page}&pageSize=${pageSize}`
    );
  }

   deleteContactSubmission(id: number): Observable<{ message: string }> {

    return this.httpClient.post<{ message: string }>(`${this.apiUrl}/api/Contacts/DeleteContact/${id}`, null,
    );
  }


   submitContactForm(formData:object): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(`${this.apiUrl}/api/Contacts`, formData);
  }

  
}
