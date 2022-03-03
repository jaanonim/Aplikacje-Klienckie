window.onload = () => {
    document.getElementById('btn').addEventListener('click', () => {

        const files = document.getElementById("f").files
        for (let i = 0; i < files.length; i++) {
            let fd = new FormData()

            fd.append("file", files[i])
            fd.append("dir", document.getElementById("dir").value)
            const body = fd
            document.getElementById("status").innerText = 0;

            fetch("/upload", {
                method: "post",
                body
            })
                .then(response => response.json())
                .then(data => {
                    document.getElementById("status").innerText = parseInt(document.getElementById("status").innerText) + 1
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
        }
    })

}
