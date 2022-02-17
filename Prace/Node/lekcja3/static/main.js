window.onload = () => {
    document.getElementById('btn').addEventListener('click', () => {
        let fd = new FormData()

        fd.append("file", document.getElementById("f").files[0])
        const body = fd


        fetch("/upload", {
                method: "post",
                body
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById("status").innerText = data.bExpected + "/" + data.bReceived
            })
            .catch(error => console.log(error))

        let interval = setInterval(function () {


            fetch("/progres", {
                    method: "get"
                })
                .then(response => response.json())
                .then(data => {
                    console.log("data", data);
                    document.getElementById("progress").innerText = data.progress + "%"
                    document.getElementById("progress").style.width = data.progress + "%"

                    if (data.progress == -1) {
                        clearInterval(interval);
                        document.getElementById("progress").innerText = "Done"
                        document.getElementById("progress").style.width = "100%"

                        return;
                    }
                })
                .catch(error => console.log(error))

        }, 200)
    })

}
