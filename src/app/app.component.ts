import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Film } from './models/film-model';
import { FilmService } from './services/film.service';
import { PopupComponent } from "./components/popup/popup.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PopupComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  films: Film[] = [];
  SelectedFilm: Film | undefined = undefined;

  constructor(private filmService: FilmService) {}

  ngOnInit() {
    this.filmService.getFilms().subscribe({
      next: (films) => {
        this.films = films;
      },
      error: (error) => { console.error('Error fetching films:', error); }
    });
  }

  newFilm() {

  }

  editFilm(film: Film) {
    this.SelectedFilm = JSON.parse(JSON.stringify(film));
  }


}
