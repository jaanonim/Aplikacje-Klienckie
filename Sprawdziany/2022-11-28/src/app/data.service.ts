import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getMarks(): Promise<any> {
    return new Promise((res) => {
      this.http
        .get('https://mendela.pl/spr/index.php')
        .subscribe((data: any) => {
          const result = [];
          for (let key of Object.keys(data)) {
            result.push({ key: key, value: data[key] });
          }
          res(result);
        });
    });
  }

  getModels(id: number): Promise<any> {
    return new Promise((res) => {
      this.http
        .get(`https://mendela.pl/spr/index.php?marka=${id}`)
        .subscribe((data: any) => {
          const result = [];
          for (let key of Object.keys(data)) {
            result.push({ key: key, value: data[key] });
          }
          res(result);
        });
    });
  }
}
