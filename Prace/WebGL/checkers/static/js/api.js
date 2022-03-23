const API_URL = "/api"

async function join(nick) {
    try {
        const res = await fetch(`${API_URL}/join`, {
            method: "post",
            body: JSON.stringify({ nick }),
            headers: {
                "Content-Type": "application/json",
            }
        })
        const json = await res.json();
        return json
    }
    catch (e) {
        return { message: e, sucess: false }
    }
}


async function getPlayers() {
    try {
        const res = await fetch(`${API_URL}/players`)
        const json = await res.json();
        return json
    }
    catch (e) {
        return { message: e, sucess: false }
    }
}

export { join, getPlayers }