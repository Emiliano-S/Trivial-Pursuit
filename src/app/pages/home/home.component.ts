import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  useFormVisible = false;
  categoriesGames: any;
  user: any;
  isLoggedIn: boolean = false;

  constructor(private categories: CategoryService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.categories.getCategory().subscribe((data:any) =>{
      this.categoriesGames = Object.keys(data).map((key) => { return data[key]});
      this.categoriesGames = this.categoriesGames[0];
    });

    if(this.auth.getLoggedIn()){
      this.isLoggedIn = true;
      this.user = this.auth.getUser();
    }
  }

  showUserForm(){
    this.useFormVisible = true;
  }

  logOutUser(){
    this.auth.logOutUser();
  }

  hideUserForm(){
    this.useFormVisible = false;
  }

  onSubmit(form: NgForm){
    const formData = form.value;
    localStorage.setItem('user', JSON.stringify({...formData, 'score': 0, 'questions': []}));
    this.auth.setUser();
    this.auth.setLoggedIn(true);
    this.router.navigate(['game']);
  }
}