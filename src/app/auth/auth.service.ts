import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;
  private user: User = {
    username: '',
    difficulty: '',
    category: '',
    categoryName: '',
    score: 0,
    questions: [],
  };

  constructor(private router: Router) {}

  setUser() {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  getUser() {
    return this.user;
  }

  setLoggedIn(value: boolean) {
    this.isLoggedIn = value;
  }

  setScore(score: number, questions: []) {
    this.user.score = score;
    this.user.questions = questions;
    localStorage.setItem('user', JSON.stringify(this.user));
    this.router.navigate(['']);
  }

  getLoggedIn() {
    return this.isLoggedIn;
  }
}
