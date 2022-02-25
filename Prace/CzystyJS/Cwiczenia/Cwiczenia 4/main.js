class Table {
  constructor() {
    this.form = new Form(this);
    this.records = [];
    this.html = document.getElementById("table");
    this.generate();
    console.log(this.records);
  }

  get() {
    this.records = this.records;
  }

  save() {
    this.records = this.records;
  }

  add(country, nominal, nr, alloy, year) {
    this.records.push(new Record(country, nominal, nr, alloy, year, this.html));
  }

  generate() {
    this.add("Albania", "a", "122", "xd", "2220", this.html);
    this.add("Albania", "a", "122", "xd", "2220", this.html);
    this.add("Albania", "a", "122", "xd", "2220", this.html);
  }
}

class Form {
  constructor(table) {
    this.table = table;
    this.nominalHTML = document.getElementById("nominal");
    this.nrHTML = document.getElementById("nr");
    this.yearHTML = document.getElementById("year");
    this.btn = document.getElementById("btn");
    this.btn.onclick = this.onClick.bind(this);
  }

  onClick() {
    this.table.add(
      "Albania",
      this.nominalHTML.value,
      this.nrHTML.value,
      "ok",
      this.yearHTML.value
    );
  }
}

class Record {
  constructor(country, nominal, nr, alloy, year, patrent) {
    this.country = country;
    this.nominal = nominal;
    this.nr = nr;
    this.alloy = alloy;
    this.year = year;
    this.patrent = patrent;
    this.createHtml();
  }

  createHtml() {
    this.html = document.createElement("tr");
    this.html.innerHTML = `
            <td><img src="gfx/${this.country}.jpg"></td>
            <td>${this.nominal}</td>
            <td>${this.nr}</td>
            <td>${this.alloy}</td>
            <td>${this.year}</td>
        `;
    let ele = document.createElement("td");
    ele.innerHTML = `<img src="gfx/u.gif">`;
    ele.onclick = this.delete.bind(this);
    this.html.appendChild(ele);
    this.patrent.appendChild(this.html);
  }

  delete() {}
}

new Table();
