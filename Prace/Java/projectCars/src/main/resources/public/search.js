/*document.getElementById("gen").onclick = async () => {
    await fetch(`/generate`, { method: "put" });
    getData();
};*/

document.getElementById("geninvoice").onclick = async () => {
    const data = {
        year: document.getElementById("yearI").value,
        title: document.getElementById("titleI").value,
        seller: document.getElementById("sellerI").value,
        buyer: document.getElementById("buyerI").value,
    };
    const strs = [];
    for (const [key, value] of Object.entries(data)) {
        strs.push(`${key}=${value}`);
    }

    await fetch(`/invoice?${strs.join("&")}`, { method: "put" });
};
