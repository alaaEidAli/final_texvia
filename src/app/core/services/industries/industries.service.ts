import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class IndustriesService {

  constructor(private httpClient : HttpClient) { }
       private apiUrl  = environment.baseUrl
  
   getIndustries() :Observable<any>{
      return this.httpClient.get(`${this.apiUrl}/api/Industries?pageSize=10`)
    }
}
