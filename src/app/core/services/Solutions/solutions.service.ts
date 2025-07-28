import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SolutionsService {

  constructor(private httpClient: HttpClient) { }
       private apiUrl  = environment.baseUrl

  getSolutions() :Observable<any>{
    return this.httpClient.get(`${this.apiUrl}/api/Solutions?pageSize=10`)
  }
}
