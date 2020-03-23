export function logistic_growth_rules(celltrix, r, K){
    let oldcount = celltrix.count()
    // console.log('grow', r, K);

    // Logistic Growth 
    let growth = r * (1 - oldcount/K) * oldcount;

    var res = rules(celltrix)
    var selected = res[0]
    var removed = res[1]

    let newcount = celltrix.count()
    console.log(`Actual Growth: ${growth} cells`)
    var boost;
    if(r){
        boost = oldcount + growth - newcount;
    }else{
        // Normal Logistic Growth
        boost = 0; 
    }
    // Testing Values
    // console.log(oldcount, growth, newcount);
    // console.log(boost)

    // Change Ratio = The ratio of cells to be added/deleted; Threshold = 1 - change_ratio
    let change_ratio;
    if (boost > 0){
        change_ratio = boost/selected.length;
        selected.forEach((gene) => {
            gene.simulate(1 - change_ratio, (cell)=>{cell.change()})
        });
    }else if (boost < 0){
        change_ratio = - boost/removed.length;
        removed.forEach((gene) => {
            gene.simulate(1 - change_ratio, (cell)=>{cell.change()})
        });
    }
    newcount = celltrix.count(1)
    console.log(`Current Growth: ${newcount - oldcount} cells`)
    return newcount
};


export function rules(celltrix){
    let selectable = [];
    let removable = [];
    let change_select = []
    celltrix.iter_window((win, mainel) =>{
        // Count No. of alive Neighbours
        let adj = 0
        win.forEach((row) =>{
            row.forEach((el)=>{
                if(el.state === 2){
                    el.change()
                }
                    adj += el.state
            })
        })
        adj -= mainel.state    // Correction to remove main element value

        // console.log(adj)

        // check rules for life and create/destroy
        if(mainel.state){
            if (adj < 2 || adj > 3){
                change_select.push(mainel)
            }else{
                removable.push(mainel)
            }
        }else if(!(mainel.state)){
            if(adj === 3){
                change_select.push(mainel)
            }else if(adj === 2){
                selectable.push(mainel)
            }
        }
        // console.log(mainel)
    })
    // console.log(change_select)
    change_select.forEach((el) =>{
        el.change()
    })
    return [selectable, removable]
}
