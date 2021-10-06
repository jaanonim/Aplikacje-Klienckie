
$(function () {

    function move(e) {
        let pos = e.clientX
        if (pos <= 500 && pos >= 0) {
            handle.text(pos)
            handle.offset({ left: pos })
        }
    }

    handle = $(".handle")
    a = $("#a")
    b = $("#b")
    move({ clientX: $(window).width() / 2 })

    handle.on("mousedown", function (e) {
        $(window).on("mousemove", move)
    })
    $(window).on("mouseup", function (e) {
        $(window).off("mousemove")
    })

})