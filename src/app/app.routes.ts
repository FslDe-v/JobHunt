import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SavedJobsComponent } from './saved-jobs/saved-jobs.component';
import { SearchComponent } from './search/search.component';
import { AuthComponent } from './auth/auth.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'signup', component: SignUpComponent },
      { path: 'signin', component: SignInComponent },
    ],
  },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'saved-jobs', component: SavedJobsComponent },
];
