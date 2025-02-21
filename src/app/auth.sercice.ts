import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { UserInterface } from './user.interface';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  docData,
  setDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth); // To track user state not logged in -> null
  currentUser = signal<UserInterface | null | undefined>(undefined); // undefined because it takes time to fetch user
  fireStore = inject(Firestore);
  userCollection = collection(this.fireStore, 'User');
  userJobs = signal<any[]>([]);

  addUserJobs(jobIds: string[]): Promise<void> {
    const currentUser = this.currentUser();
    if (!currentUser || !currentUser.uid) {
      return Promise.reject('No user logged in');
    }

    const userDocRef = doc(this.fireStore, 'User', currentUser.uid);

    return setDoc(userDocRef, {
      userName: currentUser.userName,
      uid: currentUser.uid,
      jobsId: jobIds,
    })
      .then(() => console.log('User record overwritten successfully'))
      .catch((error) => {
        console.error('Error overwriting user record:', error);
        throw error;
      });
  }
  readUserJobs(): Observable<any> {
    const currentUser = this.currentUser();
    if (!currentUser || !currentUser.uid) {
      throw new Error('No user logged in.');
    }
    const userDocRef = doc(this.fireStore, 'User', currentUser.uid);
    return docData(userDocRef);
  }

  signUp(email: string, userName: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    )
      .then((response) => {
        updateProfile(response.user, { displayName: userName }).then(() =>
          response.user.reload()
        );
      })
      .then(() => {});

    return from(promise);
  }

  signIn(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {});
    return from(promise);
  }
  isLoggedIn(): boolean {
    if (this.currentUser()) return true;
    return false;
  }
}
