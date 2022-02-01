
$(function () {

    function move(e) {
        let pos = e.clientX
        a.width(pos - 10)
        b.width($(window).width() - pos - 10)
    }

    handle = $("#handle")
    a = $("#a")
    b = $("#b")
    move({ clientX: $(window).width() / 2 })

    handle.on("mousedown", function (e) {
        $(window).on("mousemove", move)
    })
    handle.on("mouseup", function (e) {
        $(window).off("mousemove")
    })

})