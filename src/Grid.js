import Gene from './Gene'

class Grid {
    constructor (row, col, states=2, default_val=0) {
        this.rows = row
        this.cols = col
        var mat = []
        for(let i = 0; i < row; i++){
            let row = []
            for(let j = 0; j < col; j++){
                row[j] = new Gene(default_val, states)
            }
            mat[i] = row
        }
        this.mat = mat
        this.states = states
        this.matrix = this.mat
    }

    select (row, col) {
        this.mat[row][col].change();
        return this.mat[row][col].state
    }

    simulate_all(threshold, callback){
        this.matrix.forEach((row, i) =>{
            row.forEach((el, j) =>{
                let simulation = Math.random();
                if(simulation > threshold){ callback(el) }
            })
        })
    }

    // Get neighbour window (Identity convolution also?)
    iter_window(callback){
        for(let i = 0; i < this.rows; i++){
            let rowset;
            if(i === 0){
                rowset = this.mat.slice(i, i + 2)
            } else if (i === this.rows-1){
                rowset = this.mat.slice(i - 1, i + 1)
            }else{
                rowset = this.mat.slice(i - 1, i + 2)
            }
            for(let j = 0; j < this.cols; j++){
                let window;
                if(j === 0){
                    window = rowset.map((row) => row.slice(j, j + 2))
                } else if (j === this.cols-1){
                    window = rowset.map((row) => row.slice(j - 1, j + 1))
                }else{
                    window = rowset.map((row) => row.slice(j - 1, j + 2))
                }
                // callback window
                callback(window, this.mat[i][j])
                // callback window, row, col
                // callback window, element
            }
        }
    }

    // Get neighbour count
    iter_neighbour_count(callback){
        this.iter_window((win, mainel)=>{

            // List of the counts of each state
            let numlist = new Array(this.states).fill(0)

            win.forEach((row) =>{
                row.forEach((el)=>{
                    numlist[el.state] += 1
                })
            })

            // Correction to remove main element value
            numlist[mainel.state] -= 1

            // Callback list of hashmap counts of the states (and main element)
            callback(numlist, mainel)
        })
    }

    count(checkstate=1){
        let count = 0
        if(checkstate < this.states && checkstate > 0){
            count = this.count_all()[checkstate]
        }
        return count
    }

    count_all(){
        let countlist = new Array(this.states).fill(0);
        this.mat.forEach((row) => {
            row.forEach((el) => {
                countlist[el.state] += 1;
            })
        })
        return countlist
    }
}
export default Grid
