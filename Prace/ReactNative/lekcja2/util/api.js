//const address = "http://192.168.1.109:3000/api";
//const address = "http://192.168.1.105:3000/api";
import { address } from "../settings.json";

export async function getAll() {
    try {
        const res = await fetch(address + "/user/");
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function create(d) {
    try {
        const res = await fetch(address + "/user/", {
            method: "POST",
            body: JSON.stringify(d),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function del(id) {
    try {
        const res = await fetch(address + "/user/" + id + "/", {
            method: "DELETE",
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
