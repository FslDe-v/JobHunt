import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';

// Optional: Place interfaces in a separate file like job-opportunity.model.ts
// For demo purposes, we'll keep them inline here.
interface AdzunaApiResponse {
  count: number;
  mean: number;
  results: JobOpportunity[];
}

interface JobOpportunity {
  id: string;
  adref: string;
  title?: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  created?: string; // e.g. "2025-01-10T11:07:08Z"
  redirect_url?: string;
  contract_time?: string; // e.g. 'full_time', 'part_time', or omitted
  salary_min?: number;
  salary_max?: number;
  salary_is_predicted?: string;
  location?: AdzunaLocation;
  category?: AdzunaCategory;
  company?: AdzunaCompany;
}

interface AdzunaLocation {
  display_name?: string; // e.g. "Sheffield, South Yorkshire"
  area?: string[]; // e.g. ["UK","Yorkshire And The Humber","South Yorkshire","Sheffield"]
}

interface AdzunaCategory {
  label?: string; // e.g. "Part time Jobs"
  tag?: string; // e.g. "part-time-jobs"
}

interface AdzunaCompany {
  display_name?: string; // e.g. "Tiney"
}

@Component({
  selector: 'app-test-api',
  imports: [NgFor, NgIf, TitleCasePipe],
  templateUrl: './test-api.component.html',
  styleUrls: ['./test-api.component.css'],
})
export class TestAPIComponent implements OnInit {
  // Store the response from Adzuna in this property
  jobsResponse: AdzunaApiResponse | null = null;
  errorMessage: string = '';

  // Example credentials; in production, use environment variables
  private appId = '7411a75c';
  private appKey = 'cb93ff874e7cd87b8ed65b99671150ad';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
  }
  countryCode = 'au'; // or 'gb', 'au', 'nl', 'fr', etc.
  pageNumber = 2;
  fetchData() {
    const url = `https://api.adzuna.com/v1/api/jobs/${this.countryCode}/search/${this.pageNumber}?app_id=${this.appId}&app_key=${this.appKey}`;

    this.http.get<AdzunaApiResponse>(url).subscribe({
      next: (response) => {
        this.jobsResponse = response;
        console.log('Adzuna Response:', response);
      },
      error: (error) => {
        this.errorMessage = 'Error fetching data from Adzuna: ' + error.message;
        console.error('Error:', error);
      },
    });
  }
}
