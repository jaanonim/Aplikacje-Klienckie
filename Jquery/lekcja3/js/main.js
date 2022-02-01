$(()=>{

    var list = []
    const size = 50
    const offset_y = 150 
    const offset_x = 10 

    var main = $("#main")
    var p1 = $(".p1")
    var p2 = $(".p2")
    var p1_index = 0
    var p2_index = 0
    var step = true

    function check(x,y){
        for (let i = 0; i < list.length; i++) {
            if(list[i].left === x && list[i].top === y){
                return true
            }
        }
        return false
    }

    function remove(x,y){
        for (let i = 0; i < list.length; i++) {
            if(list[i].left === x && list[i].top === y){
                list.splice(i,1)
                return
            }
        }
    }

    function setup(){

        main.empty()
        list = []

        p1.offset({left:offset_x,top:6*size+offset_y})
        p2.offset({left:offset_x+size,top:6*size+offset_y})
    
        
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
            let element = $("<div>")
            element.addClass("element")
            element.offset({left:x*size+offset_x,top:y*size+offset_y})
    
            element.on("click",function(){
                let now = $(this)

                if(!check(now.offset().left,now.offset().top)){
                    list.push(now.offset())
                    now.addClass("selected")
                }
                else{
                    remove(now.offset().left,now.offset().top)
                    now.removeClass("selected")
                }
            })
    
            main.append(element)}
        }
    }

    setup()
    
    $("#button").on("click",function(){
        console.log(list)

        if(list.length<3){
            alert("Ups")
            return
        }
        let text = $(this).text()
        if ( "Next" === text){
            if(step){
                p1_index++
            }
            else{
                p2_index--
            }
            step = !step
            p1.offset(list[p1_index])
            p2.offset(list[p2_index])
            if(p2_index==0){
                $(this).text("Reset")
            }
        }
        else if ("Reset" === text){
            setup()
            $(this).text("Start game")
        }
        else {
            p1_index = 0
            p2_index = list.length-1
            p1.offset(list[p1_index])
            p2.offset(list[p2_index])
            $(this).text("Next")
        }
    })
})