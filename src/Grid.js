import Gene from './Gene'

class Grid {
    constructor (row, col, states=2, default_val=0) {
        this.rows = row
        this.cols = col
        // Size has to be atleast 3x3
        if(this.rows < 3 || this.cols < 3){this.rows = 10; this.cols = 10}
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

    // Get neighbour window (3x3 Identity Convolution)
    iter_window(callback){
        let rowset = []
        for(let k = 0; k <= 1; k++){ rowset.push(this.mat[k]) }

        for(let i = 1; i <= this.rows; i++){
            rowset.push(this.mat[(i + 1) % this.rows]);

            let window = rowset.map((row) => row.slice(0, 2))

            for(let j = 1; j <= this.cols; j++){
                // Add the 3 elements of the new col
                for(let k = 0; k < 3; k++){ window[k].push(rowset[k][(j + 1) % this.cols]) }

                callback(window)           // Callback = 3 x 3 window

                // Remove the 3 elements of the old col
                for(let k = 0; k < 3; k++){ window[k].shift() }
            }
            rowset.shift()
        }
    }

    // Get neighbour count
    iter_neighbour_count(callback){
        this.iter_window((win)=>{
            // List of the counts of each state
            let numlist = new Array(this.states).fill(0)
            console.log(win)
                // throw new Error("Something went badly wrong!");
            win.forEach((row, i) =>{
                console.log(row)
                row.forEach((el, k)=>{
                    numlist[el.state] += 1
                })
            })

            let mainel = win[1][1]
            // Correction to remove main element value
            numlist[mainel.state] -= 1

            // Callback frequency array of counts of the states
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
