import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-modele',
  templateUrl: './modele.component.html',
  styleUrls: ['./modele.component.css'],
})
export class ModeleComponent implements OnInit {
  models: Array<any> = [];
  selected: number | null = null;

  private _id: number | null = null;
  public get id(): number | null {
    return this._id;
  }
  @Input()
  public set id(value: number | null) {
    this._id = value;
    this.update();
  }
  @Output() onSelect = new EventEmitter();

  constructor(private data: DataService) {}

  async ngOnInit() {}

  async update() {
    if (this.id) this.models = await this.data.getModels(this.id);
  }

  click({ key, value }: any) {
    this.selected = key;
    this.onSelect.emit({ key, value });
  }
}
