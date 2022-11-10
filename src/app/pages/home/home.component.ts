import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  newGameForm: FormGroup;
  useFormVisible: boolean = false;
  categoriesGames: any;
  user: User;
  isLoggedIn: boolean = false;

  constructor(
    private categories: CategoryService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newGameForm = new FormGroup({
      username: new FormControl(this.auth.getUser().username, Validators.required),
      difficulty: new FormControl(null,Validators.required),
      category: new FormControl(null,Validators.required),
    })

    this.categories.getCategory().subscribe((data: any) => {
      this.categoriesGames = Object.keys(data).map((key) => {
        return data[key];
      });
      this.categoriesGames = this.categoriesGames[0];
    });

    if (this.auth.getLoggedIn()) {
      this.isLoggedIn = true;
      this.user = this.auth.getUser();
    }
  }

  showUserForm() {
    this.useFormVisible = true;
  }

  hideUserForm() {
    this.useFormVisible = false;
  }

  tryAgain() {
    this.router.navigate(['/game']);
  }

  onSubmit() {
    const formData = this.newGameForm.value;
    localStorage.setItem(
      'user',
      JSON.stringify({
        ...formData,
        categoryName: this.categoriesGames.find(
          (category: any) => category.id == formData.category
        ).name,
        score: 0,
        questions: [],
      })
    );
    this.auth.setUser();
    this.auth.setLoggedIn(true);
    this.router.navigate(['game']);
  }
}
