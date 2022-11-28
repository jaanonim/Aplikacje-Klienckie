import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-maki',
  templateUrl: './maki.component.html',
  styleUrls: ['./maki.component.css'],
})
export class MakiComponent implements OnInit {
  marks: Array<any> = [];
  selected: number | null = null;

  @Output() onSelect = new EventEmitter();

  constructor(private data: DataService) {}

  async ngOnInit() {
    this.marks = await this.data.getMarks();
  }

  click({ key, value }: any) {
    this.selected = key;
    this.onSelect.emit({ key, value });
  }
}
