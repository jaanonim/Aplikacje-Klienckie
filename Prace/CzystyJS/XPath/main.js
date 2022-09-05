const input = document.getElementById("input");
const sugestion = document.getElementById("sugestion");

let xmlText = await (await fetch("/TERC_Urzedowy_2022-09-05.xml")).text();
let xml = new window.DOMParser().parseFromString(xmlText, "text/xml");

input.oninput = () => {
    const tab = search(input.value, xml);
    sugestion.innerHTML = ""; //tab.join("</br>");

    tab.forEach((ele, i) => {
        if (i < 11) {
            const element = document.createElement("div");
            element.innerHTML = ele;
            element.classList.add("element");
            element.onclick = (e) => {
                input.value = e.target.innerHTML;
                input.focus();
            };
            sugestion.appendChild(element);
        }
    });
};

function search(search, xml) {
    let node = xml.evaluate(
        `/teryt/catalog/row[starts-with(./NAZWA,'${search}') and (./RODZ=1 or ./RODZ=4)]/NAZWA`,
        xml,
        null,
        XPathResult.ANY_TYPE,
        null
    );
    let node2 = xml.evaluate(
        `/teryt/catalog/row[/teryt/catalog/row[starts-with(./NAZWA,'${search}') and (./RODZ=1 or ./RODZ=4)]/WOJ = ./WOJ and ./NAZWA_DOD = 'województwo' ]/NAZWA`,
        xml,
        null,
        XPathResult.ANY_TYPE,
        null
    );

    console.log(node);

    let tab = [];
    let i = 0;
    let res = node.iterateNext();
    let res2 = node2.iterateNext();
    while (res) {
        console.log(res);
        tab.push(res.childNodes[0].nodeValue, res2.childNodes[0].nodeValue);
        i++;
        res = node.iterateNext();
        res2 = node2.iterateNext();
    }
    console.log(i);
    return tab;
}
search("K", xml);
