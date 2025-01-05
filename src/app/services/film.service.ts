import { Injectable } from '@angular/core';
import { Film } from '../models/film-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private apiUrl = 'http://localhost:3000/movies';

  constructor(private http: HttpClient) {}

  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(this.apiUrl);
  }

  getFilm(id: string): Observable<Film> {
    return this.http.get<Film>(`${this.apiUrl}/${id}`);
  }

  addFilm(film: Film): Observable<Film> {
    return this.http.post<Film>(this.apiUrl, film);
  }

  updateFilm(film: Film): Observable<Film> {
    return this.http.put<Film>(`${this.apiUrl}/${film.id}`, film);
  }

  deleteFilm(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
