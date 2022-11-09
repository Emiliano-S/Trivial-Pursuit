import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GameService implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getRequests(category: string, difficulty: string){
    return this.http.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`);
  }


}
