import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Film } from '../../models/film-model';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  @Input() film: Film | undefined = undefined;
  @Output() save = new EventEmitter<Film>();

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.save.emit(this.film);
    }
  }

  onCancel() {
    this.film = undefined;
  }
}
