import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly url = 'assets/data.xml';
  public data: Document | null = null;

  constructor(private http: HttpClient) {}

  private getData() {
    return new Promise((res, rej) => {
      this.http.get(this.url, { responseType: 'text' }).subscribe((data) => {
        this.data = new window.DOMParser().parseFromString(data, 'text/xml');
        res(this.data);
      });
    });
  }

  async getZmienne() {
    if (this.data === null) await this.getData();
    if (this.data === null) throw Error();
    const tab = [];
    let node = this.data.evaluate(
      `/czasopisma/zmienne/*`,
      this.data,
      null,
      XPathResult.ANY_TYPE,
      null
    );
    let res = node.iterateNext();
    while (res) {
      const src = res.childNodes[1].childNodes[0]?.nodeValue;
      const name = res.childNodes[3].childNodes[0]?.nodeValue;

      tab.push({ name, src });
      res = node.iterateNext();
    }
    return tab;
  }

  async getLata(name: string) {
    if (this.data === null) await this.getData();
    if (this.data === null) throw Error();

    let node = this.data.evaluate(
      `/czasopisma/lata/${name}`,
      this.data,
      null,
      XPathResult.ANY_TYPE,
      null
    );
    let res = node.iterateNext();
    if (res) {
      return res?.childNodes[0]?.nodeValue?.split(',') as Array<any>;
    } else {
      return [];
    }
  }

  async getInfo(category: string, year: string) {
    if (this.data === null) await this.getData();
    if (this.data === null) throw Error();

    let node;
    const tab = [];
    if (year === 'all') {
      node = this.data.evaluate(
        `/czasopisma/${category}/*[boolean(@brak)=false()]`,
        this.data,
        null,
        XPathResult.ANY_TYPE,
        null
      );
    } else {
      node = this.data.evaluate(
        `/czasopisma/${category}/*[@rok="${year}" and boolean(@brak)=false()]`,
        this.data,
        null,
        XPathResult.ANY_TYPE,
        null
      );
    }

    let res = node.iterateNext();
    while (res) {
      console.log(res);
      const nazwa = res.childNodes[1].childNodes[0]?.nodeValue;
      const numer = res.childNodes[3].childNodes[0]?.nodeValue;
      const wydawca = res.childNodes[5].childNodes[0]?.nodeValue;
      const format = res.childNodes[7].childNodes[0]?.nodeValue;
      const stron = res.childNodes[9].childNodes[0]?.nodeValue;
      const miniaturka = res.childNodes[11].childNodes[0]?.nodeValue;
      const plik = res.childNodes[13].childNodes[0]?.nodeValue;
      const skan = res.childNodes[15].childNodes[0]?.nodeValue;
      const przetworzenie = res.childNodes[17].childNodes[0]?.nodeValue;
      const podeslal = res.childNodes[19].childNodes[0]?.nodeValue;

      tab.push({
        nazwa,
        numer,
        wydawca,
        format,
        stron,
        miniaturka,
        plik,
        skan,
        przetworzenie,
        podeslal,
      });
      res = node.iterateNext();
    }
    return tab;
  }
}
