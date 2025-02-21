import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../auth.sercice';
import { FormsModule, NgForm } from '@angular/forms';
import { doc } from '@angular/fire/firestore';

@Component({
  selector: 'app-saved-jobs',
  imports: [NgIf, FormsModule, CommonModule],
  templateUrl: './saved-jobs.component.html',
  styleUrl: './saved-jobs.component.css',
})
export class SavedJobsComponent implements OnInit {
  authService = inject(AuthService);
  jobs: any[] = [];
  selectedJob: any = null;
  ngOnInit(): void {
    this.authService.readUserJobs().subscribe((doc) => {
      console.log(doc);
      this.jobs = [...doc.jobsId];
    });
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
  goToSourceUrl(url: string): void {
    if (!url) {
      console.warn('No source URL provided');
      return;
    }
    window.open(url, '_blank');
  }

  toggleBookmark(job: any): void {
    job.isBookmarked = !job.isBookmarked;
    this.jobs.pop();
    this.authService.addUserJobs(this.jobs);
  }
}
