
$(() => {

    var main = $("#main")
    var rakieta = $("#rakieta")
    var input = $("#rotacja")
    var inter
    var mouse = { x: 0, y: 0 }
    var asteroidy = []
    var index = 0
    var step = 0
    const steps = 100

    function vectorToOffset(vector) {
        return { left: vector.x, top: vector.y }
    }

    function offsetToVector(offset) {
        return { x: offset.left, y: offset.top }
    }

    function vectorToAngle(vector) {
        return Math.atan2(vector.y, vector.x)
    }

    function move(vector) {
        rakieta.offset(vectorToOffset(vector))
    }

    function jumpIndex() {
        move(asteroidy[index])
        increment()
    }

    function increment() {
        index++
        if (index >= asteroidy.length) {
            index = 0
        }
    }

    function getMoveVector() {
        pos = offsetToVector(rakieta.offset())
        return { x: (asteroidy[index].x - pos.x), y: (asteroidy[index].y - pos.y) }
    }

    function getMovePos() {
        pos = offsetToVector(rakieta.offset())
        p = getMoveVector()
        x = (p.x / (steps - step)) + pos.x
        y = (p.y / (steps - step)) + pos.y

        return { x: x, y: y }
    }

    function animateRocket() {
        if (step >= steps) {
            step = 0
            increment()
        }
        if (input.prop('checked')) {
            rakieta.css("transform", "rotate(" + (vectorToAngle(getMoveVector()) + Math.PI * 0.5) + "rad)")
        }
        move(getMovePos())
        step++

        requestAnimationFrame(animateRocket)
    }

    $(window).on("mousemove", function (e) {
        mouse = { x: e.clientX, y: e.clientY }
    })

    main.on("click", function () {
        asteroida = $("<div>");
        asteroida.addClass("asterioda")
        asteroida.offset(vectorToOffset(mouse))
        asteroida.text(asteroidy.length)
        main.append(asteroida)
        asteroidy.push(mouse)
    })

    $("#step").on("click", function () {
        jumpIndex()
    })

    $("#jump").on("click", function () {

        if (inter) {
            clearInterval(inter)
            inter = false
        }
        inter = setInterval(function () {
            jumpIndex()
        }, 500)

    })

    $("#fly").on("click", function () {
        $("#step").off("click")
        $("#jump").off("click")
        $("#fly").off("click")
        clearInterval(inter)
        animateRocket()
    })

})