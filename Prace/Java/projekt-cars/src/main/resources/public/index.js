const sendData = async () => {
    const data = {
        model: document.getElementById("model").value,
        year: document.getElementById("year").value,
        airbags: [
            {
                name: "tl",
                value: !!document.getElementById("tl").checked,
            },
            {
                name: "tr",
                value: !!document.getElementById("tr").checked,
            },
            {
                name: "bl",
                value: !!document.getElementById("bl").checked,
            },
            {
                name: "br",
                value: !!document.getElementById("br").checked,
            },
        ],
        color: document.getElementById("color").value,
        hasInvoice: false,
    };
    let res = await fetch("/add", {
        method: "post",
        body: JSON.stringify(data),
    });
    alert(JSON.stringify(await res.json(), null, 2));
};

document.getElementById("btn").onclick = () => {
    sendData();
};
