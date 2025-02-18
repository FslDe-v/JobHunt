import { CommonModule, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  NgControl,
  ReactiveFormsModule,
  NgModel,
  FormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [
    JsonPipe,
    NgIf,
    ReactiveFormsModule,
    NgFor,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  // Filter state
  datePosted: string = 'any_time';
  experienceLevel: string = '';
  remoteOption: string = '';
  industry: string = '';
  title: string = '';
  location: string = '';

  // Arrays for dynamic dropdowns
  industries = ['Finance', 'Tech', 'Healthcare', 'Education'];
  titles = ['Software Engineer', 'Data Scientist', 'Product Manager'];

  // Data
  jobs: any = []; // This will hold fetched job data
  selectedJob: any = null;

  setDatePosted(value: string) {
    this.datePosted = value;
  }

  setExperience(value: string) {
    this.experienceLevel = value;
  }

  setRemote(value: string) {
    this.remoteOption = value;
  }

  setIndustry(value: string) {
    this.industry = value;
  }

  setTitle(value: string) {
    this.title = value;
  }

  onSearch() {
    // Build the request body for the API
    const requestBody: any = {};

    // Example usage of date posted
    if (this.datePosted === 'any_time') {
      // Perhaps set posted_at_max_age_days to a large number or omit
      requestBody.posted_at_max_age_days = 9999;
    } else {
      requestBody.posted_at_max_age_days = parseInt(this.datePosted, 10);
    }

    // Experience level
    if (this.experienceLevel) {
      // job_seniority_or expects an array
      requestBody.job_seniority_or = [this.experienceLevel];
    }

    // Remote
    if (this.remoteOption === 'remote') {
      requestBody.remote = true;
    } else if (this.remoteOption === 'onsite') {
      requestBody.remote = false;
    }
    // "hybrid" isn't directly supported by the API, so you might skip or handle differently

    // Industry
    // The API docs mention "industry_id_or" (if you have IDs) or "industry_or" (deprecated).
    // If you have a mapping from "Tech" -> some industry code, do that here.
    // This is just an example, so let's skip the actual mapping:
    // requestBody.industry_id_or = [someIndustryCode];

    // Title
    // The simplest approach is to use job_title_or for an array of titles
    if (this.title) {
      requestBody.job_title_or = [this.title];
    }

    // Location
    // For location, you might use job_country_code_or if the user typed "US",
    // or job_location_pattern_or if they typed a city or state, etc.
    // For example:
    // if (this.location) {
    //   requestBody.job_location_pattern_or = [this.location];
    // }

    // Add any other required filters
    requestBody.limit = 25;
    requestBody.page = 0;
    requestBody.order_by = [
      { field: 'date_posted', desc: true },
      { field: 'discovered_at', desc: true },
    ];

    // Now call your jobs API with the requestBody
    console.log('Searching with:', requestBody);
    // Example: this.jobsService.searchJobs(requestBody).subscribe(...)
    // For now, we’ll just mock it:
    this.jobs = [
      {
        title: 'Senior Developer',
        company_name: 'Example Corp',
        description: 'Lorem ipsum...',
      },
      {
        title: 'Junior Developer',
        company_name: 'Another Inc',
        description: 'Dolor sit amet...',
      },
    ] as any[];
  }

  selectJob(job: any) {
    this.selectedJob = job;
  }

  selectedOption: string | null = null;

  onSelect(option: string): void {
    this.selectedOption = option;
  }
  selectedDateOption: string | null = null;

  onSelectDate(option: string): void {
    this.selectedDateOption = option;
  }
}
