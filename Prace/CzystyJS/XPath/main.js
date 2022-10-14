const input = document.getElementById("input");
const sugestion = document.getElementById("sugestion");

let xmlText = await (await fetch("/TERC_Urzedowy_2022-09-05.xml")).text();
let xml = new window.DOMParser().parseFromString(xmlText, "text/xml");
const dzielnice = getDielnice();

input.oninput = () => {
    const tab = search(upperFirst(input.value), xml, 11);
    sugestion.innerHTML = "";

    tab.forEach((ele, i) => {
        const element = document.createElement("div");
        element.innerHTML = ele;
        element.classList.add("element");
        element.onclick = (e) => {
            input.value = e.target.innerHTML;
            input.focus();
        };
        sugestion.appendChild(element);
    });
};

function upperFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getDielnice() {
    let node = xml.evaluate(
        `/teryt/catalog/row[./RODZ=8 or ./RODZ=9]`,
        xml,
        null,
        XPathResult.ANY_TYPE,
        null
    );

    let tab = [];
    let res = node.iterateNext();
    while (res) {
        const woj = res.childNodes[1].childNodes[0]?.nodeValue;
        const pow = res.childNodes[3].childNodes[0]?.nodeValue;
        const name = res.childNodes[9].childNodes[0]?.nodeValue;

        tab.push({ woj, pow, name });
        res = node.iterateNext();
    }
    return tab;
}

function getWoj(id) {
    return xml
        .evaluate(
            `/teryt/catalog/row[boolean(./POW/text())=false() and boolean(./RODZ/text())=false() and ./WOJ=${id}]/NAZWA`,
            xml,
            null,
            XPathResult.ANY_TYPE,
            null
        )
        .iterateNext()
        .childNodes[0].nodeValue.toLocaleLowerCase();
}

function getPow(id, woj) {
    return xml
        .evaluate(
            `/teryt/catalog/row[boolean(./GMI/text())=false() and boolean(./RODZ/text())=false() and ./POW=${id} and ./WOJ=${woj}]/NAZWA`,
            xml,
            null,
            XPathResult.ANY_TYPE,
            null
        )
        .iterateNext()
        .childNodes[0].nodeValue.toLocaleLowerCase();
}

function search(search, xml, count) {
    let node = xml.evaluate(
        `/teryt/catalog/row[starts-with(./NAZWA,'${search}') and (./RODZ=1 or ./RODZ=4)]`,
        xml,
        null,
        XPathResult.ANY_TYPE,
        null
    );

    let tab = [];
    let res = node.iterateNext();
    while (res && tab.length < count) {
        const woj = res.childNodes[1].childNodes[0]?.nodeValue;
        const pow = res.childNodes[3].childNodes[0]?.nodeValue;
        const name = res.childNodes[9].childNodes[0]?.nodeValue;
        let added = false;
        dzielnice.forEach((e) => {
            if (e.pow == pow && e.woj == woj) {
                tab.push(`${name} | ${e.name}`);
                added = true;
            }
        });
        if (!added)
            tab.push(
                `${name} | ${upperFirst(getPow(pow, woj))} | ${upperFirst(
                    getWoj(woj)
                )}`
            );
        res = node.iterateNext();
    }
    return tab;
}
