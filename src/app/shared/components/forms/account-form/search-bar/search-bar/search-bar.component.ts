import { Component, EventEmitter, Output, computed, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { debounceTime, distinctUntilChanged } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-search-bar',
    imports: [
        ReactiveFormsModule,
        RouterLink
    ],
    templateUrl: './search-bar.component.html',
    styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Output() changeQuery = new EventEmitter<string>();

  onInputChange(event: any) {
    const value = event.target.value;
    this.changeQuery.emit(value);
  }


  control = new FormControl('');

  query = toSignal(
    this.control.valueChanges.pipe(debounceTime(500), distinctUntilChanged()),
  );

  newQuery = computed(() => this.query());

  constructor() {
    effect(() => {
      const query = this.newQuery();
      if (query !== null && query !== undefined) {
        this.changeQuery.emit(query);
      }
    });
    
  }
}

