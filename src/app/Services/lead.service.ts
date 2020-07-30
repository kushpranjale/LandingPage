import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  // URL = 'https://powerful-woodland-30397.herokuapp.com/';
  URL = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}
  addLead(data: {}) {
    return this.http.post(this.URL + 'add_lead', data);
  }
  download(filename: string) {
    return this.http.get(this.URL + 'download/' + filename);
  }
}
