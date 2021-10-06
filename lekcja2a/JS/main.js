
$(function () {

    var div = $("#main")
    var select = $("#select")
    $("#c").on("click", function () {
        div.empty()
        for (let i = 0; i < select.val(); i++) {
            let item = $("<div>", { class: "item" })
            item.html(i + "<button class=\"add\">+</button><button class=\"del\">-</button>")
            div.append(item)
        }
        $(".del").on("click", function () {
            $(this).parent().remove()
        }
        )
        $(".add").on("click", function () {
            let b = $(this)
            if (b.text() === "+") {
                b.text(1)
            }
            else {
                b.text(parseInt(b.text()) + 1)
            }

            let item = $("<div>", { class: "child" })
            item.html("<button class=\"del\">-</button>")
            $(this).parent().append(item)
            $(".del").on("click", function () {
                $(this).parent().parent().children(".add").text(parseInt(b.text()) - 1)

                $(this).parent().remove()
            }
            )
        })
    })
    $("#d").on("click", function () {
        div.empty()
    })


})