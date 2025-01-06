import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Film } from '../../models/film-model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  imports: [CommonModule, FormsModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  @Input() film: Film | undefined = undefined;
  @Output() save = new EventEmitter<Film>();
  @Output() cancel = new EventEmitter<void>();

  onSave(form: NgForm) {
    if (form.valid) {
      this.save.emit(this.film);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
