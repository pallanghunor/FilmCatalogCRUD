import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Film } from './models/film-model';
import { FilmService } from './services/film.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  films: Film[] = [];

  constructor(private filmService: FilmService) {}

  ngOnInit() {
    this.filmService.getFilms().subscribe({
      next: (films) => {
        this.films = films;
      },
      error: (error) => { console.error('Error fetching films:', error); }
    });
  }
}
