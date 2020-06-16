
var STATE_COLORS = ['#FFFFFF', '#000000']

function colormixify(colarr){
    var red = []
    var green = []
    var blue = []
    colarr.forEach((color, i)=>{
        red[i] = color.splice(1,3)
        green[i] = color.splice(3,5)
        blue[i] = color.splice(5,7)
    })
    return (red, green, blue)
}

var RED, GREEN, BLUE = colormixify(STATE_COLORS)


// Color Crossover

function crossover(parstates){
    var color = RED[parstates[0]] + GREEN[parstates[1]] + BLUE[parstates[2]]
    return color
}

Gridder.iter_window((window) =>{
    // Get parstates matrix
    var parstates = []
    var child = window[1][1]
    window.forEach((rw, i)=>{
        rw.forEach((ele, j) => {
            if( i !== 1 && j !== 1){
                parstates.push(ele.state)
            }
        })
    })
    if(parstates.length === 3){
        child.setcolor(crossover(parstates))
    }
    else
})
