
export function wildlife_filter(celltrix){
    /* Contains the 4 Core Rules of the logistic growth game and predator effect*/

    let selectable = []      // List of Cells that could be activated (by the boost)
    let removable = []       // List of Cells that could be deactivated (by the boost)
    let change_cells = []   // List of Cells which will be altered directly by Conway's Rules
    let preyable = []       // List of Cells which can be preyed on

    celltrix.iter_neighbour_count((count_list, mainel) => {


        let num = count_list[1]      // Number of neighbouring cells with the same state as the element
        if(mainel.state > 1){ mainel.change() }   // Add this to visualize previous generation also

        // console.log(`Neigbours: ${num}`)

        // Filter cells based on the Rules of the Game
        if(mainel.state){
            if (num < 2 || num > 3 || count_list[2] > 3){
                change_cells.push(mainel)
            }else if(count_list[2] > 0){
                removable.push(mainel)
            }
        }else if(!(mainel.state)){
            if(num === 3){
                change_cells.push(mainel)
            }else if(num === 2){
                selectable.push(mainel)
            }
        }


    })

    return [selectable, removable, change_cells]
}
