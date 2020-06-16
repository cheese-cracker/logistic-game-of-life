// Rule Filter: Activate/Deactivate Cells based on Game Rules

export function life_rules_filter(celltrix){
    /* Contains the 4 Core Rules of the logistic growth game */

    let selectable = []      // List of Cells that could be activated (by the boost)
    let removable = []       // List of Cells that could be deactivated (by the boost)
    let change_cells = []   // List of Cells which will be altered directly by Conway's Rules

    celltrix.iter_neighbour_count((count_list, mainel) => {


        let num = count_list[1]      // Number of neighbouring cells with the same state as the element

        if(mainel.state > 1){ mainel.change() }   // Add this to visualize previous generation also

        // console.log(`Neigbours: ${num}`)

        // Filter cells based on the Rules of the Game
        if(mainel.state){
            if (num < 2 || num > 3){
                change_cells.push(mainel)
            }else {
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

// Simulate the Classified Cells

export function simulator(celltrix, growth_function, variablearr){
    let oldcount = celltrix.count()
    // console.log('grow', r, K);

    // Logistic Growth
    let growth = growth_function(celltrix, variablearr);
    let disable = !variablearr.r;

    let [selected, removed, change_cells] = life_rules_filter(celltrix)

    // Change the cells directly affected by Conway's Rules
    change_cells.forEach((el) =>{ el.change() })

    // Simulate the rest of the cells based on the Growth Equation

    let newcount = celltrix.count(1)
    console.log(`Actual Growth: ${growth} cells`)
    var boost = oldcount + growth - newcount
    // Check disable
    if(disable){ boost = 0}

    // Testing Values
    // console.log(oldcount, growth, newcount);
    // console.log(boost)

    // Change Ratio = The ratio of cells to be added/deleted; Threshold = 1 - change_ratio
    let change_ratio
    if (boost > 0){
        change_ratio = boost/selected.length
        selected.forEach((gene) => {
            gene.simulate(1 - change_ratio, (cell)=>{cell.change()})
        })
    }else if (boost < 0){
        change_ratio = - boost/removed.length
        removed.forEach((gene) => {
            gene.simulate(1 - change_ratio, (cell)=>{cell.change()})
        })
    }

    newcount = celltrix.count(1)

    console.log(`Current Growth: ${newcount - oldcount} cells`)

    return newcount
};

/* Growth Equations
 * These can be plugged into boosted growth rules*/

export function logistic_growth(celltrix, vars){
    let rate  = vars['r']
    let capacity = vars['K']
    let population = celltrix.count(1)  // Same as oldcount
    let growth = rate * ( 1 - population/capacity) * population
    return growth
}

export function zombie_logistic_growth(celltrix, vars){
    let rate  = vars['r']
    let capacity = vars['K']
    let population = celltrix.count(1)  // Same as oldcount
    let zombie_pop = celltrix.count(2) // Cells which die in the previous generation
    let zombie_strength = vars['z']
    let growth = rate * ( 1 - population/capacity) * capacity - zombie_strength*zombie_pop
    return growth
}
