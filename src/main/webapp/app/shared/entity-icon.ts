import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'jhi-entity-icon',
  imports: [FontAwesomeModule],
  template: '<fa-icon [icon]="icon" />',
})
export class EntityIcon {
  readonly icon = faAsterisk;
}
