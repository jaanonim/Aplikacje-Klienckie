class Table {
    constructor() {
        this.form = new Form(this);
        this.records = [];
        this.html = document.getElementById("table");
        this.inEdit = false;
        this.get();
    }

    async get() {
        let res = await fetch("/api.php?action=data")
        let json = await res.json()
        this.records = [];
        this.html.innerHTML = '';
        json.sort((a, b) => a.country - b.country)
        json.forEach(element => {
            this.records.push(new Record(element.ID, element.country, element.nominal, element.nr, element.alloy, element.year, this));
        });
    }

    async add(country, nominal, nr, alloy, year) {
        let res = await fetch(`/api.php?action=add&country=${country}&nominal=${nominal}&nr=${nr}&alloy=${alloy}&year=${year}`)
        let json = await res.json()
        if (json.error !== null) {
            console.error(json.error);
        }
        await this.get();
    }

    async delete(obj) {
        let res = await fetch(`/api.php?action=delete&ID=${obj.id}`)
        let json = await res.json()
        if (json.error !== null) {
            console.error(json.error);
        }
        await this.get();
    }

    async edit(obj) {
        let res = await fetch(`/api.php?action=update&ID=${obj.id}&country=${obj.country}&nominal=${obj.nominal}&nr=${obj.nr}&alloy=${obj.alloy}&year=${obj.year}`)
        let json = await res.json()
        if (json.error !== null) {
            console.error(json.error);
        }
    }

    generate() {
        this.add(1, "a", "122", 1, "2220");
        this.add(1, "a", "122", 1, "2220");
        this.add(1, "a", "122", 1, "2220");
    }
}

class Form {
    constructor(table) {
        this.table = table;
        this.nominalHTML = document.getElementById("nominal");
        this.nrHTML = document.getElementById("nr");
        this.yearHTML = document.getElementById("year");

        this.countriesHTML = Dropdown.generate("countrys", 1, "countrys");
        this.alloysHTML = Dropdown.generate("alloys", 1, "alloys");
        document.getElementById("countrys").appendChild(this.countriesHTML);
        document.getElementById("alloys").appendChild(this.alloysHTML);

        this.btn = document.getElementById("btn");
        this.btn.onclick = this.onClick.bind(this);
    }

    onClick() {
        this.table.add(
            this.countriesHTML.value,
            this.nominalHTML.value,
            this.nrHTML.value,
            this.alloysHTML.value,
            this.yearHTML.value
        );
    }
}

class Dropdown {
    static data = {
        alloys: [],
        countrys: []
    };

    static async getData() {
        let res = await fetch("/api.php?action=alloys")
        Dropdown.data.alloys = await res.json()

        res = await fetch("/api.php?action=countrys")
        Dropdown.data.countrys = await res.json()
    }

    static generate(name, value, c) {
        let dropdown = document.createElement("select");
        dropdown.id = c;
        for (let key in Dropdown.data[name]) {
            let option = document.createElement("option");
            if (value == Dropdown.data[name][key]["ID"]) {
                option.selected = true;
            }
            option.value = Dropdown.data[name][key]["ID"];
            option.innerHTML = Dropdown.data[name][key]["name"];
            dropdown.appendChild(option);
        }
        return dropdown;
    }

    static getValue(name, value) {
        for (let key in Dropdown.data[name]) {
            if (Dropdown.data[name][key]["ID"] == value) {
                return Dropdown.data[name][key]["name"];
            }
        }
    }
}

class Record {
    constructor(id, country, nominal, nr, alloy, year, table) {
        this.id = id
        this.country = country;
        this.nominal = nominal;
        this.nr = nr;
        this.alloy = alloy;
        this.year = year;
        this.table = table;
        this.patrent = table.html;
        this.createHtml();
    }

    render() {
        this.html.innerHTML = `
            <td><img src="gfx/${Dropdown.getValue("countrys",this.country)}.jpg"></td>
            <td>${this.nominal}</td>
            <td>${this.nr}</td>
            <td>${Dropdown.getValue("alloys", this.alloy)}</td>
            <td>${this.year}</td>
        `;
        let ele = document.createElement("td");
        ele.innerHTML = `<img src="gfx/u.gif">`;
        ele.onclick = this.delete.bind(this);
        this.html.appendChild(ele);
        this.html.onclick = this.edit.bind(this);
    }

    createHtml() {
        this.html = document.createElement("tr");
        this.render();
        this.patrent.appendChild(this.html);
    }

    delete(e) {
        e.stopPropagation()
        this.table.delete(this);
        this.patrent.removeChild(this.html);
    }

    edit() {
        if (this.table.inEdit) {
            return;
        }
        this.table.inEdit = true;

        this.html.innerHTML = ``;

        let ele = document.createElement("td");
        ele.appendChild(Dropdown.generate("countrys", this.country, "countrysE"));
        this.html.appendChild(ele);

        ele = document.createElement(`td`);
        ele.innerHTML = `<input id="nominalE" value="${this.nominal}">`
        this.html.appendChild(ele);

        ele = document.createElement(`td`);
        ele.innerHTML = `<input id="nrE" value="${this.nr}">`
        this.html.appendChild(ele);

        ele = document.createElement("td");
        ele.appendChild(Dropdown.generate("alloys", this.alloy, "alloysE"));
        this.html.appendChild(ele);

        ele = document.createElement(`td`);
        ele.innerHTML = `<input id="yearE" type="number" value="${this.year}"></td>`
        this.html.appendChild(ele);

        ele = document.createElement("td");
        ele.innerHTML = `<img src="gfx/faja.png">`;
        ele.onclick = this.saveEdit.bind(this);

        this.html.appendChild(ele);
    }

    saveEdit(e) {
        e.stopPropagation();
        this.table.inEdit = false;

        this.nominalHTML = document.getElementById("nominalE");
        this.nrHTML = document.getElementById("nrE");
        this.yearHTML = document.getElementById("yearE");
        this.countryHTML = document.getElementById("countrysE");
        this.alloyHTML = document.getElementById("alloysE");

        this.country = this.countryHTML.value;
        this.alloy = this.alloyHTML.value;
        this.nominal = this.nominalHTML.value;
        this.nr = this.nrHTML.value;
        this.year = this.yearHTML.value;

        this.table.edit(this);

        this.render();
    }
}

Dropdown.getData().then(() => {
    new Table();
}).catch((e) => {
    console.error(e)
})
