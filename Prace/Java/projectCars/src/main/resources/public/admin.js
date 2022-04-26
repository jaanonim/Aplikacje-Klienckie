const getData = async () => {
    let res = await fetch("/get");
    if (res.status !== 200) {
        console.error(res);
    }
    //console.log(await res.text())
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
        <th>Invoice</th>
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

        const uuid = json[i].uuid;

        let btn = document.createElement("td");
        if (json[i].hasInvoice == "false") {
            btn.innerText = "Generate Invoice";

            btn.onclick = async () => {
                await fetch(`/invoice/generate?uuid=${uuid}`, {
                    method: "put",
                });
                getData();
            };

            ele.appendChild(btn);
        } else {
            btn.innerHTML = `<a href="/invoice?uuid=${uuid}">Donwload</a>`;
            ele.appendChild(btn);
        }

        document.getElementById("table").appendChild(ele);
    }
};

document.getElementById("gen").onclick = async () => {
    await fetch(`/generate`, { method: "put" });
    getData();
};

getData();
