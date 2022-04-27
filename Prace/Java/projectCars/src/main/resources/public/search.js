const getData = async () => {
    let res = await fetch("/get");
    if (res.status !== 200) {
        console.error(res);
    }
    let json = await res.json();
    console.log(json);

    document.getElementById("table").innerHTML = `
    <tr>
        <th>UUID</th>
        <th>Model</th>
        <th>Image</th>
        <th>Airbags</th>
        <th>Price</th>
        <th>Tax</th>
        <th>Year</th>
        <th>Color</th>
        <th>Date</th>
    </tr>
    `;
    for (let i = 0; i < json.length; i++) {
        let ele = document.createElement("tr");

        ele.innerHTML = `<td>${json[i].uuid}</td><td>${
            json[i].model
        }</td><td><img src="images/${json[i].model}.png"></td><td>${json[
            i
        ].airbags
            .map((airbag) => airbag.name + " " + (airbag.value ? "✓" : "✗"))
            .join("; ")}</td><td>${json[i].price}</td><td>${
            json[i].tax
        }</td><td>${json[i].year}</td><td style="background-color: ${
            json[i].color
        }; width: 50px; height: 50px"></td>${
            json[i].date
                ? `<td>${json[i].date.year}/${json[i].date.month}/${json[i].date.day}</td>`
                : "<td></td>"
        }`;

        document.getElementById("table").appendChild(ele);
    }
};

document.getElementById("gen").onclick = async () => {
    await fetch(`/generate`, { method: "put" });
    getData();
};

getData();

document.getElementById("geninvoiceAll").onclick = async () => {
    const data = {
        seller: document.getElementById("sellerI").value,
        buyer: document.getElementById("buyerI").value,
    };
    const strs = [];
    for (const [key, value] of Object.entries(data)) {
        strs.push(`${key}=${value}`);
    }

    let res = await fetch(`/invoice/all?${strs.join("&")}`, { method: "put" });
    document.getElementById(
        "allD"
    ).innerHTML = `<a href="/invoice?uuid=${await res.text()}">Donwload</a>`;
};

document.getElementById("geninvoiceYear").onclick = async () => {
    const data = {
        year: document.getElementById("yearI").value,
        seller: document.getElementById("sellerI").value,
        buyer: document.getElementById("buyerI").value,
    };
    const strs = [];
    for (const [key, value] of Object.entries(data)) {
        strs.push(`${key}=${value}`);
    }

    let res = await fetch(`/invoice/year?${strs.join("&")}`, { method: "put" });
    document.getElementById(
        "yearD"
    ).innerHTML = `<a href="/invoice?uuid=${await res.text()}">Donwload</a>`;
};

document.getElementById("geninvoicePrice").onclick = async () => {
    const data = {
        priceMin: document.getElementById("priceMinI").value,
        priceMax: document.getElementById("priceMaxI").value,
        seller: document.getElementById("sellerI").value,
        buyer: document.getElementById("buyerI").value,
    };
    const strs = [];
    for (const [key, value] of Object.entries(data)) {
        strs.push(`${key}=${value}`);
    }

    let res = await fetch(`/invoice/price?${strs.join("&")}`, {
        method: "put",
    });
    document.getElementById(
        "priceD"
    ).innerHTML = `<a href="/invoice?uuid=${await res.text()}">Donwload</a>`;
};
