window.onload = () => {


    const getData = async () => {
        let res = await fetch("/get")
        if (res.status !== 200) {
            console.error(res);
        }
        let json = await res.json()
        console.log(json)

        document.getElementById("table").innerHTML = "";
        for (let i = 0; i < json.length; i++) {
            let ele = document.createElement("tr");
            ele.innerHTML = `<td>${i}</td><td>${json[i].ube ? "Tak" : "Nie"}</td><td>${json[i].ben ? "Tak" : "Nie"}</td><td>${json[i].usz ? "Tak" : "Nie"}</td><td>${json[i].nap ? "Tak" : "Nie"}</td>`;

            let btn = document.createElement("td")
            btn.innerText = "Usuń mnie!"
            const id = json[i]._id
            btn.onclick = async () => {
                let res = await fetch(`/delete?id=${id}`, { method: "delete" })
                if (res.status !== 200) {
                    console.error(res);
                    return;
                }
                getData();
            }

            ele.appendChild(btn);
            document.getElementById("table").appendChild(ele);
        }

    }

    document.getElementById('send').addEventListener('click', async () => {

        const ube = !!document.getElementById("ube").checked;
        const ben = !!document.getElementById("ben").checked;
        const usz = !!document.getElementById("usz").checked;
        const nap = !!document.getElementById("nap").checked;
        console.log({ ube, ben, usz, nap });

        let res = await fetch("/add", {
            method: "post",
            body: JSON.stringify({ ube, ben, usz, nap }),
        })
        if (res.status !== 200) {
            console.error(res);
            return;
        }
        getData();
    })

    getData();
}
