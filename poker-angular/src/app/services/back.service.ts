import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackService {

  private head = new HttpHeaders();
  private base = 'http://localhost:8090';

  constructor(private http: HttpClient) { 
    this.head = this.head.append("Content-Type", "application/json");
  }

  login(data){
    return this.http.post(this.base+'/auth/login', data, {headers: this.head});
  }
}
