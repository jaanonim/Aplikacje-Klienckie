var guuid = null;

const getData = async () => {
    let res = await fetch("/get");
    if (res.status !== 200) {
        console.error(res);
    }
    let json = await res.json();

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
        <th>Edit</th>
        <th>Delete</th>
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

        btn = document.createElement("td");
        btn.innerText = "Edit";

        btn.onclick = async () => {
            guuid = uuid;
            document.getElementById("year").value = json[i].year;
            document.getElementById("model").value = json[i].model;
            document.getElementById("popup").style.display = "block";
        };

        ele.appendChild(btn);

        btn = document.createElement("td");
        btn.innerText = "Delete";

        btn.onclick = async () => {
            await fetch(`/delete?uuid=${uuid}`, { method: "delete" });
            getData();
        };

        ele.appendChild(btn);

        document.getElementById("table").appendChild(ele);
    }
};

document.getElementById("update").onclick = async () => {
    let year = document.getElementById("year").value;
    let model = document.getElementById("model").value;
    const data = { year, model };
    await fetch(`/update?uuid=${guuid}`, {
        method: "post",
        body: JSON.stringify(data),
    });
    document.getElementById("popup").style.display = "none";
    getData();
};

document.getElementById("cancel").onclick = () => {
    document.getElementById("popup").style.display = "none";
};

getData();
