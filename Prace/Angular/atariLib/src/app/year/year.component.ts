import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css'],
})
export class YearComponent implements OnInit {
  yearName: string = '';
  categoryName: string = '';
  infos: Array<any> = [];
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.parent?.paramMap.subscribe(async (param) => {
      this.categoryName = param.get('category') as string;
      this.route.paramMap.subscribe(async (param) => {
        this.yearName = param.get('year') as string;
        this.infos = await this.dataService.getInfo(
          this.categoryName,
          this.yearName
        );
        if (!this.infos.length) {
          this.router.navigate(['']);
        }
      });
    });
  }
}
