const sendData = async () => {
    const data = {
        model: document.getElementById("model").value,
        year: document.getElementById("year").value,
        airbags: [
            {
                name: "tl",
                value: !!document.getElementById("tl").checked
            },
            {
                name: "tr",
                value: !!document.getElementById("tr").checked
            },
            {
                name: "bl",
                value: !!document.getElementById("bl").checked
            },
            {
                name: "br",
                value: !!document.getElementById("br").checked
            }
        ],
        color: document.getElementById("color").value,
        hasInvoice: false
    }
    await fetch("/add", { method: "post", body: JSON.stringify(data) })
}

document.getElementById("btn").onclick = () => {
    sendData();
}

var guuid = null;

const getData = async () => {
    let res = await fetch("/get")
    if (res.status !== 200) {
        console.error(res);
    }
    let json = await res.json()

    document.getElementById("table").innerHTML = "";
    for (let i = 0; i < json.length; i++) {
        let ele = document.createElement("tr");
        ele.innerHTML = `<td>${json[i].uuid}</td><td>${json[i].model}</td><td>${json[i].date.year}-${json[i].date.month}-${json[i].date.day}</td><td>${json[i].price}</td><td>${json[i].year}</td><td style="background-color: ${json[i].color}; width: 50px; height: 50px"></td>`;

        const uuid = json[i].uuid

        let btn = document.createElement("td")
        btn.innerText = "Usuń mnie!"
        btn.onclick = async () => {
            let res = await fetch(`/delete?uuid=${uuid}`, { method: "delete" })
            if (res.status !== 200) {
                console.error(res);
                return;
            }
            getData();
        }

        btn = document.createElement("td")
        btn.innerText = "Edit"

        btn.onclick = async () => {
            guuid = uuid;
            document.getElementById("popup").style.display = "block"
        }

        ele.appendChild(btn);

        btn = document.createElement("td")
        btn.innerText = "Delete"

        btn.onclick = async () => {
            await fetch(`/delete?uuid=${uuid}`, { method: "delete" })
            getData();
        }

        ele.appendChild(btn);

        document.getElementById("table").appendChild(ele);
    }
}

document.getElementById("update").onclick = async () => {
    let year = document.getElementById("year").value
    let model = document.getElementById("model").value
    const data = { year, model };
    await fetch(`/update?uuid=${guuid}`, { method: "post", body: JSON.stringify(data) })
    document.getElementById("popup").style.display = "none";
    getData();
}

document.getElementById("gen").onclick = async () => {
    await fetch(`/generate`, { method: "put" });
    getData();
}

getData();

document.getElementById("geninvoice").onclick = async () => {
    const data = {
        year: document.getElementById("yearI").value,
        title: document.getElementById("titleI").value,
        seller: document.getElementById("sellerI").value,
        buyer: document.getElementById("buyerI").value,
    }
    const strs = [];
    for (const [key, value] of Object.entries(data)) {
        strs.push(`${key}=${value}`)
    }

    await fetch(`/invoice/generate?${strs.join('&')}`, { method: "put" })
}