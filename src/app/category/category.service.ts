import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Movie } from "../movies/movie";
import { map } from "rxjs/operators";
import { Category } from "./category";

@Injectable()
export class CategoryService {
  url = "http://localhost:3000/categories";
  private url_firebase = "https://angular-movie-app-666ff-default-rtdb.europe-west1.firebasedatabase.app/";

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url_firebase + 'categories.json').pipe(

      map(response => {
        const categories: Category[] = [];
        for (const key in response) {
          categories.push({ ...response[key], id: key });
        }
        return categories;
      }),
    );

  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.url_firebase + 'categories.json', category);
  }
}
