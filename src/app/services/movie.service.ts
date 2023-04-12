import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Movie } from "../models/movie";
import { catchError, delay, map, tap } from "rxjs/operators";
import { MyList } from "../models/myList";

@Injectable()
export class MovieService {
  private url = "http://localhost:3000/movies";
  private url_firebase = "https://angular-movie-app-666ff-default-rtdb.europe-west1.firebasedatabase.app/";

  constructor(private http: HttpClient) {
  }

  getMovies(categoryId?: number): Observable<Movie[]> {

    return this.http.get<Movie[]>(this.url_firebase + "movies/.json").pipe(
      map(response => {
        const movies: Movie[] = [];

        for (const key in response) {
          if (categoryId) {
            if (categoryId === response[key].categoryId) {
              movies.push({ ...response[key], id: key });
            }
          } else {
            movies.push({ ...response[key], id: key });
          }
        }
        return movies;
      }),
      tap(data => console.log(data)),
      catchError(this.handleError),
      delay(500),
    );
  }

  getMovieById(movieId: string): Observable<Movie> {
    console.log("film idsi: ", movieId);
    return this.http.get<Movie>(this.url_firebase + "movies/" + movieId + ".json").pipe(
      tap(data => console.log(data)),
      catchError(this.handleError),
      delay(500),
    );
  }

  createMovie(movie: Movie): Observable<Movie> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authhorization': 'Token'

      })
    }
    return this.http.post<Movie>(this.url_firebase + "/movies.json", movie, httpOptions).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  adToMyList(item: MyList): Observable<MyList> {
    return this.http.post<MyList>(this.url_firebase + "/users/" + item.userId + "/favMovieList/" + item.movieId + ".json", {
      dateAdded: new Date().getTime()
    }).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError),
    );
  }

  removeFromMyList(item: MyList): Observable<MyList> {
    return this.http.delete<MyList>(this.url_firebase + "/users/" + item.userId + "/favMovieList/" + item.movieId + ".json")
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError),
      );
  }
  getFavList(userId: string): Observable<string[]> {
    return this.http.get<string[]>(this.url_firebase + "users/" + userId + "/favMovieList.json").pipe(
      map(response => {

        const movies: string[] = [];
        for (const key in response) {
          movies.push(key);
        }
        return movies;


      }),
      tap(data => console.log(data)),
      catchError(this.handleError)

    );
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      //client or network error
      console.log("error: " + error.error.message);
    } else {
      switch (error.status) {
        case 404:
          console.log("not found 404");
          break;
        case 403:
          console.log("access denied 403");
          break;
        case 500:
          console.log("internal server error 500");
          break;
        default:
          console.log("unknown error");
      }
    }
    return throwError('Bir hata oluştu.');
  }

}
