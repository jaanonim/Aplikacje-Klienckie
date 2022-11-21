import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DataService } from '../data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categoryName: string = '';
  lata: Array<any> = [];
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(async (param) => {
      this.categoryName = param.get('category') as string;
      this.lata = await this.dataService.getLata(this.categoryName);
      if (!this.lata.length) {
        this.router.navigate(['']);
      }
      this.lata.push('all');
    });
  }
}
