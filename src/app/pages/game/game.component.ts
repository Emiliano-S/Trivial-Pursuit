import { NgForm } from '@angular/forms';
import {
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { GameService } from 'src/app/service/game.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit, OnChanges, DoCheck {
  user: User = {
    username: '',
    difficulty: '',
    category: '',
    categoryName: '',
    score: 0,
    questions: [],
  };
  questions: any;
  isLoading: Boolean = true;

  constructor(private game: GameService, private auth: AuthService) {}

  ngOnInit(): void {
    this.user = this.auth.getUser();

    this.game
      .getRequests(this.user.category, this.user.difficulty)
      .subscribe((data: any) => {
        this.questions = data.results.map((element: any) => {
          element.question = element.question
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'")
            .replace(/&shy;/g, '-');
          return (element = {
            ...element,
            options: [
              element.correct_answer,
              ...element.incorrect_answers,
            ].sort(() => Math.random() - 0.5),
            answer: '',
          });
        });
      });
  }

  ngDoCheck(): void {
    if (this.questions.length > 0) {
      this.isLoading = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {}

  onSubmit(form: NgForm) {
    let score: number = 0;

    this.questions.forEach((question: any, index: number) => {
      question.answer = form.form.value[index];
    });

    this.questions.forEach((question: any) => {
      if (question.answer === question.correct_answer) {
        score += 1;
      }
    });

    this.auth.setScore(score, this.questions);
  }
}
