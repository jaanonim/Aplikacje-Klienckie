export default class Popup {
	constructor() {
		Popup.html = document.getElementById("popup");
		Popup.hide();
	}

	static hide() {
		Popup.html.style.display = "none";
	}

	static show(text, time = 3000) {
		clearTimeout(Popup.timeout);
		Popup.html.innerHTML = text;
		Popup.html.style.display = "block";
		Popup.timeout = setTimeout(() => {
			Popup.hide();
		}, time);
	}
}
