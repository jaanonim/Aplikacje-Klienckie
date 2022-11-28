import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  marka: string = '';
  idMarki: number | null = null;
  model: string = '';

  selectedMarka({ key, value }: any) {
    this.marka = value;
    this.idMarki = key;
    this.model = '';
  }
  selectedModel({ key, value }: any) {
    this.model = value;
  }
}
