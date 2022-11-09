import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  URL_API = 'https://opentdb.com/api_category.php';

  constructor(private http: HttpClient) { }

  getCategory(){
    return this.http.get(this.URL_API);
  }
}
