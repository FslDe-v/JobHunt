import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = 'https://api.theirstack.com/v1/jobs/search';
  private apiKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhbHNobGFuODhAZ21haWwuY29tIiwicGVybWlzc2lvbnMiOiJ1c2VyIiwiY3JlYXRlZF9hdCI6IjIwMjUtMDItMThUMTM6MTc6MDcuOTkwMDUyKzAwOjAwIn0.6NIF0gKPTMqEJ7vAStyqwGiS82Ezt77AjjG79JNblbY';

  constructor(private http: HttpClient) {}

  searchJobs(requestBody: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(this.apiUrl, requestBody, { headers });
  }
}
