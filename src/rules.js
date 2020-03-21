// Simple Crossover
function logistic_growth_rules(celltrix, r, K){
    let prev_count = celltrix.count()
    // let r = 0.2;
    // let K = rows*cols/5;
    // console.log('grow', r, K);

    // Logistic Growth 
    let growth;
    growth = r * (1 - prev_count/K) * prev_count;

    let selected, removed = rules(celltrix)

    let newcount = celltrix.count()
    console.log('count_old', newcount);
    let boost;
    if(r){
        boost = prev_count + growth - newcount;
    }else{
        // Normal Logistic Growth
        boost = 0; 
    }

    let thresh = 0;
    if (boost > 0){
        thresh = boost/selected.length;
        selected.forEach((gene) => {
            gene.simulate(thresh, (cell)=>{cell.change()})
        });
    }else if (boost < 0){
        thresh = - boost/removed.length;
        removed.forEach((gene) => {
            gene.simulate(thresh, (cell)=>{cell.change()})
        });
    }
    // console.log(selected.length, removed.length);
    return celltrix
};


function rules(celltrix){
    let select = [];
    let remove = [];
    celltrix.iter_window((win) =>{
        // Get Neighbour States
        let adj = 0
        let mainel = win[1][1]
        win.forEach((row,i) =>{
            row.forEach((el, j)=>{
                if(i !== 1 && j !== 1){
                    adj += el.state
                }
            })
        })

        // check rules for life and create/destroy
        if(mainel.state){
            if (adj < 2 || adj > 3){
                mainel.state = 0
            }else{
                remove.push(mainel)
            }
        }else if(!(mainel.state)){
            if(adj === 3){
                mainel.state = 1
            }else if(adj === 2){
                select.push(mainel)
            }
        }
    })
    return (select, remove)
}
