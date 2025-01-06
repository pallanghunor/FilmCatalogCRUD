import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Film } from './models/film-model';
import { FilmService } from './services/film.service';
import { PopupComponent } from './components/popup/popup.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [PopupComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  films: Film[] = [];
  private _selectedFilm: Film | undefined = undefined;

  get selectedFilm(): Film | undefined {
    return this._selectedFilm;
  }

  set selectedFilm(film: Film | undefined) {
    this._selectedFilm = film;
    this.toggleBodyScroll();
  }

  constructor(private filmService: FilmService) {}

  ngOnInit() {
    this.filmService.getFilms().subscribe({
      next: (films) => {
        this.films = films;
      },
      error: (error) => {
        console.error('Error fetching films:', error);
      },
    });
  }

  private toggleBodyScroll() {
    if (this._selectedFilm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  newFilm() {
    this.selectedFilm = {
      id: undefined,
      title: '',
      director: '',
      year: 0,
      rating: 0,
      genre: '',
    };
  }

  editFilm(film: Film) {
    this.selectedFilm = JSON.parse(JSON.stringify(film));
  }

  deleteFilm(filmID: string) {
    this.filmService.deleteFilm(filmID).subscribe({
      next: () => {
        this.films = this.films.filter((f) => f.id !== filmID);
      },
      error: (error) => {
        console.error('Error deleting film:', error);
      },
    });
  }

  saveFilm(film: Film) {
    if (film.id) {
      this.filmService.updateFilm(film).subscribe({
        next: (updatedFilm) => {
          const index = this.films.findIndex((f) => f.id === updatedFilm.id);
          this.films[index] = updatedFilm;
        },
        error: (error) => {
          console.error('Error updating film:', error);
        },
      });
    } else {
      this.filmService.addFilm(film).subscribe({
        next: (newFilm) => {
          this.films.push(newFilm);
        },
        error: (error) => {
          console.error('Error creating film:', error);
        },
      });
    }
    this.selectedFilm = undefined;
  }

  onCancel() {
    this.selectedFilm = undefined;
  }
}
