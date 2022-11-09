import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  user: any = null;
  questions: any = null;

  constructor(private game: GameService, private auth: AuthService) { }

  ngOnInit(): void {
    this.user = this.auth.getUser();
    console.log(this.user);
    this.game.getRequests(this.user.category, this.user.difficulty).subscribe((data:any) => {

     this.questions =  data.results.map((element: any) => {
        return element = {...element, 'options': [element.correct_answer, ...element.incorrect_answers].sort(() => Math.random() - .5), 'answer': ''};
      });
      console.log(this.questions);
    })
  }

  onSubmit(form: NgForm){
    let score: number = 0;

    this.questions.forEach((question:any, index: number) => {
      question.answer = form.form.value[index];
    });

    this.questions.forEach((question: any) => {
      if(question.answer === question.correct_answer){
        score += 1;
      }
    });

    this.auth.setScore(score, this.questions);
  }

}
