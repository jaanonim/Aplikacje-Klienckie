import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
})
export class EntryComponent implements OnInit {
  public zmienne: Array<any> = [];
  constructor(private dataService: DataService) {}
  number: string = '';
  input: any;

  async ngOnInit() {
    this.zmienne = await this.dataService.getZmienne();
  }

  onInput() {
    this.number = '' + Math.round(this.input * 1000) / 1000;
  }
}
