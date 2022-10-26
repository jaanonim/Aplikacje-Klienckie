const address = "http://192.168.1.109:3000/api";

export async function getAll() {
    try {
        const res = await fetch(address + "/user/");
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function create(data) {
    try {
        const res = await fetch(address + "/user/", {
            method: "POST",
            body: data,
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
