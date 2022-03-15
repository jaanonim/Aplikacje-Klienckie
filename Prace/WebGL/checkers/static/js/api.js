const API_URL = "/api"

async function join(nick) {
    try {
        const res = await fetch(`${API_URL}/join`, {
            method: "post",
            body: { nick }
        })
        const json = await res.json();
        return json
    }
    catch (e) {
        return { message: e, sucess: false }
    }
}

export default { join }