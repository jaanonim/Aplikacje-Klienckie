$(() => {
    const tab = [
        { type: "komisariat 1 - dzielnica I", c1: "111111", c2: "f5aa00", start: 70 },
        { type: "komisariat 2 - dzielnica II", c1: "333333", c2: "f5bb00", start: 60 },
        { type: "komisariat 3 - dzielnice III i IV", c1: "555555", c2: "f5cc00", start: 50 },
        { type: "komisariat 4 - dzielnice V, VI i VII", c1: "777777", c2: "f5dd00", start: 40 },
        { type: "komisariat 5 - dzielnice VIII, IX, i XIII", c1: "999999", c2: "f5ee00", start: 50 },
        { type: "komisariat 6 - dzielnice X, XI i XII", c1: "777777", c2: "f5dd00", start: 60 },
        { type: "komisariat 7 - dzielnice XV, XVI i XVII", c1: "555555", c2: "f5cc00", start: 70 },
        { type: "komisariat 8 - dzielnice XIV i XVIII", c1: "333333", c2: "f5bb00", start: 80 },
        { type: "komisariat 8 - dzielnice XIV i XVIII", c1: "333333", c2: "f5bb00", start: 20 },
    ]

    function setSlider(h, x, min, max) {
        if (x > max) {
            x = max
        }
        else if (x < min) {
            x = min
        }
        $(h).offset({ left: x })
        let d = parseInt((x - min) / 2)
        let n = 100 - d
        $(h).parent().parent().parent().children().eq(1).text(n)
        $(h).parent().parent().parent().children().eq(3).text(d)
    }

    var tabela = $("table")

    let row = $("<tr>")
    row.append($("<th>").text("komisariat"))
    row.append($("<th>").text("noc"))
    row.append($("<th>").text("dane o przestępczość"))
    row.append($("<th>").text("dzień"))
    tabela.append(row)

    for (let i = 0; i < tab.length; i++) {
        const element = tab[i];
        var day = element["start"]
        var nigth = 100 - day

        const handle = $("<div>").addClass("handle").css("background-color", "#" + element["c2"])
        const slider = $("<div>").addClass("slider").css("background-color", "#" + element["c1"]).append(handle)

        handle.on("mousedown", function () {
            h = this
            $(window).on("mousemove", function (e) {
                let min = slider.offset().left
                let max = min + 200

                let x = e.clientX

                setSlider(h, x, min, max)
                updateV()

            })
        })
        $(window).on("mouseup", function () {
            h = this
            $(window).off("mousemove")
        })

        let row = $("<tr>")
        row.append($("<td>").text(element["type"]))
        row.append($("<td>").text(day))
        row.append($("<td>").append(slider))
        row.append($("<td>").text(nigth))
        tabela.append(row)

        let min = slider.offset().left
        let max = min + 200
        setSlider(handle, day * 2 + min, min, max)
    }

    let temp = $("<td>").attr("colspan", 4).attr("id", "suma")
    temp = $("<tr>").append(temp)
    tabela.append(temp)
    updateV()
    function updateV() {
        let sumaD = 0
        let sumaN = 0
        rows = tabela.children()
        for (let i = 1; i < rows.length - 1; i++) {
            sumaN += parseInt(rows.eq(i).children().eq(1).text())
            sumaD += parseInt(rows.eq(i).children().eq(3).text())
        }

        $("#suma").html("średnia przestępczości w Krakowie<br>dzień - " + parseInt(sumaD / (rows.length - 2)) + "<br>noc - " + parseInt(sumaN / (rows.length - 2)))
    }
})