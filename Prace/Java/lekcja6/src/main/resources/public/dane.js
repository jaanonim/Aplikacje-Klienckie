var guuid = null;

const getData = async () => {
    let res = await fetch("/get")
    if (res.status !== 200) {
        console.error(res);
    }
    //console.log(await res.text())
    let json = await res.json()
    console.log(json)

    document.getElementById("table").innerHTML = "";
    for (let i = 0; i < json.length; i++) {
        let ele = document.createElement("tr");
        ele.innerHTML = `<td>${i}</td><td>${json[i].model}</td><td>${json[i].year}</td><td>${JSON.stringify(json[i].airbags)}</td><td style="background-color: ${json[i].color}; width: 50px; height: 50px"></td>`;

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
        document.getElementById("table").appendChild(ele);
    }
}
getData();