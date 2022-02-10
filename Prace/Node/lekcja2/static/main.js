window.onload = () => {
    const box = document.getElementById('box')
    const r = document.getElementById('r')
    const g = document.getElementById('g')
    const b = document.getElementById('b')
    const a = document.getElementById('a')

    const sendData = () => {
        fetch('/post', {
            method: 'POST',
            body: JSON.stringify({
                r: r.value,
                g: g.value,
                b: b.value,
                a: a.value / 100
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            box.style.backgroundColor = `rgba(${data.r},${data.g},${data.b},${data.a})`
        })
    }
    sendData()

    r.oninput = () => {
        sendData()
    }
    g.oninput = () => {
        sendData()
    }
    b.oninput = () => {
        sendData()
    }
    a.oninput = () => {
        sendData()
    }
}
