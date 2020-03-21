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
                rowset = this.mat.splice(i, i + 1)
            } else if (i === this.rows-1){
                rowset = this.mat.splice(i - 1, i)
            }else{
                rowset = this.mat.splice(i - 1, i + 1)
            }
            for(let j = 0; j < this.cols - 1; j++){
                let window;
                if(i === 0){
                    window = rowset.map((row) => row.splice(i, i + 1))
                } else if (i === this.rows-1){
                    window = rowset.map((row) => row.splice(i - 1, i))
                }else{
                    window = rowset.map((row) => row.splice(i - 1, i + 1))
                }
                // callback window
                callback(window)
                // callback window, row, col
                // callback window, element
            }
        }
    }

    count(checkstate=1){
        let count = 0;
        this.mat.forEach((row) => {
            row.forEach((el) => {
                count += (el.state===checkstate);
            })
        })
        return count
    }
}
export default Grid
