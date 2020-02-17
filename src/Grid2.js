class Grid {
    constructor (row, col, states=2, val=0) {
        this.rows = row
        this.cols = col
        this.matrix = Array(this.rows).fill().map(() => (this.cols)).fill(val)
        this.states = states
    }

    select (row, col) {
        // this.matrix[row][col] = (this.matrix[row][col] + 1) % this.states
        this.matrix[row][col].change();
        return this.matrix[row][col]
    }

    // Alter each element in which simulate > threshold
    simulate (threshold, callback) {
        this.matrix.forEach((row) => {
            row.forEach((el) => {
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
                rowset = this.matrix.splice(i, i + 1)
            } else if (i === this.rows-1){
                rowset = this.matrix.splice(i - 1, i)
            }else{
                rowset = this.matrix.splice(i - 1, i + 1)
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
                callback(window)
            }
        }
    }

    matrix() {
        return this.matrix
    }

    feed_matrix_at (X_offset, Y_offset, newmat) {
        newmat.forEach((nrow, i) => {
            nrow.forEach((nel, j) => {
                // or change() will also do!
                this.matrix[X_offset + i][Y_offset + j] = nel;
            })
        })
    }

    count(state=1){
        let count = 0;
        this.matrix.forEach((row) => {
            row.forEach((el) => {
                count += (el.state===count);
            })
        })
        return count
    }

    physical_seed(seed_count){}
}
export default Grid
