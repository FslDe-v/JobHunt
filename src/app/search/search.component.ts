import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  NgControl,
  ReactiveFormsModule,
  NgModel,
  FormsModule,
} from '@angular/forms';
import { BodyRequest } from '../body-request.interface';
import { SearchService } from './search.service';
import { AuthService } from '../auth.sercice';
import { validateEventsArray } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-search',
  imports: [NgIf, ReactiveFormsModule, NgFor, FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  private searchService = inject(SearchService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    console.log('Accessed before it gets initiated in the App component');
    console.log(this.authService.currentUser());
  }

  selectedJob: any = null;
  bodyRequest: BodyRequest = {};

  selectJob(job: any) {
    this.selectedJob = job;
  }

  selectedOption: string | null = null;

  onSelect(option: string): void {
    this.selectedOption = option;
    this.bodyRequest.job_seniority_or = [option.toLowerCase()];
    console.log(this.bodyRequest);
  }

  selectedDateOption: string | null = null;
  dateOptions: string[] = [
    'Any time',
    'Past month',
    'Past week',
    'Past 24 hours',
  ];

  onSelectDate(option: string): void {
    this.selectedDateOption = option;
    if (option === 'Any time') {
      this.bodyRequest.posted_at_max_age_days = 1000;
    } else if (option === 'Past month') {
      this.bodyRequest.posted_at_max_age_days = 30;
    } else if (option === 'Past week') {
      this.bodyRequest.posted_at_max_age_days = 7;
    } else if (option === 'Past 24 hours') {
      this.bodyRequest.posted_at_max_age_days = 1;
    }
    console.log(this.bodyRequest);
  }
  selectedRemoteOption: string | null = null;

  onSelectRemote(option: string): void {
    if (this.selectedRemoteOption === option) {
      this.selectedRemoteOption = null;
      this.bodyRequest.remote = false;
    } else {
      this.selectedRemoteOption = option;
      this.bodyRequest.remote = true;
    }
    console.log(this.bodyRequest);
  }
  easyApply: string | null = null;

  onSelectEasyApply(option: string): void {
    if (this.easyApply === option) {
      this.easyApply = null;
      this.bodyRequest.easy_apply = false;
    } else {
      this.easyApply = option;
      this.bodyRequest.easy_apply = true;
    }
    console.log(this.bodyRequest);
  }

  selectedLocation: string | null = null;
  countries: string[] = [
    'Saudi Arabia',
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
  ];
  countryCodes: Record<string, string> = {
    'Saudi Arabia': 'SA',
    'United States': 'US',
    Canada: 'CA',
    'United Kingdom': 'UK',
    Australia: 'AU',
    Germany: 'DE',
    France: 'FR',
  };

  onSelectLocation(country: string): void {
    this.selectedLocation = country;
    this.bodyRequest.job_country_code_or = [this.countryCodes[country]];
    console.log(this.bodyRequest);
  }

  selectedIndustry: string | null = null;
  industries = [
    'information technology & services',
    'computer software',
    'civil engineering',
    'marketing & advertising',
    'computer & network security',
    'real estate',
    'hospital & health care',
    'health, wellness & fitness',
    'law practice',
    'mechanical or industrial engineering',
    'biotechnology',
    'accounting',
  ];

  OnSelectedIndustry(industry: string) {
    this.selectedIndustry = industry;
    this.bodyRequest.industry_or = [industry];
    console.log(this.bodyRequest);
  }
  goToSourceUrl(url: string): void {
    if (!url) {
      console.warn('No source URL provided');
      return;
    }
    window.open(url, '_blank');
  }

  OnReset() {
    this.selectedOption = null;
    this.selectedDateOption = null;
    this.selectedLocation = null;
    this.selectedRemoteOption = null;
    this.easyApply = null;
    this.selectedIndustry = null;
    this.bodyRequest = {};
    console.log(this.bodyRequest);
  }

  setSelectedJob(job: any) {
    this.selectedJob = job;
  }
  getJobDescription(): string {
    const parts = this.selectedJob.description.split('.');

    if (parts.length <= 5) {
      return this.selectedJob.description;
    }

    return parts.slice(0, 5).join('.').trim();
  }

  jobsList: any[] = [];
  jobs: any[] = [];
  savedJobs: any[] = [];

  toggleBookmark(job: any): void {
    if (!job.isBookmarked) {
      this.savedJobs.push(job);
      console.log('Jobs Ids: ' + getJobsId(this.savedJobs));
      this.authService.addUserJobs(this.savedJobs);
    } else {
      this.savedJobs.pop();
      this.authService.addUserJobs(this.savedJobs);
    }
    console.log(this.savedJobs);
    job.isBookmarked = !job.isBookmarked;
  }
  onSearch() {
    // Defult Options ;)
    if (!this.bodyRequest.posted_at_max_age_days)
      this.bodyRequest.posted_at_max_age_days = 1000;
    this.bodyRequest.limit = 3;
    this.bodyRequest.page = 1;
    this.bodyRequest.order_by = [
      { field: 'date_posted', desc: true },
      { field: 'discovered_at', desc: true },
    ];

    console.log('Request body:', this.bodyRequest);

    this.searchService.searchJobs(this.bodyRequest).subscribe({
      next: (response) => {
        this.jobsList = [response.results || response];
        this.jobs = this.jobsList[0]?.data ?? [];
        console.log('JobsList fetched:', this.jobsList);
        console.log('Jobs: ' + this.jobs);
        this.authService.userJobs.set(this.jobsList);
      },
      error: (error) => {
        console.error('Error fetching jobs:', error);
      },
    });
  }
}

function getJobsId(jobsList: any[]) {
  if (jobsList.length === 0) {
    return [];
  }

  return jobsList[0]?.data?.map((job: any) => job.id.toString()) ?? [];
}
