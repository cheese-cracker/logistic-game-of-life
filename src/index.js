import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Grid from './Grid';
import Buttons from './Buttons';


function deepClone(arr) {
    return JSON.parse(JSON.stringify(arr));
}

class Main extends React.Component {
    // speed is update time!
    // speed = 50;
    speed = 2000;
    rows = 30;
    cols = 50;
    state = {
        generation: 0,
        gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
    }

    selectBox = (row, col) => {
        var newGrid = deepClone(this.state.gridFull);
        newGrid[row][col] = !(newGrid[row][col]);
        this.setState({
            gridFull: newGrid
        });
    }

    seeder = (num) => {
        var newGrid = deepClone(this.state.gridFull);
        for(let n = 0; n < num; n++){
            var a_i = Math.floor(Math.random()*this.rows);
            var a_j = Math.floor(Math.random()*this.cols);
            newGrid[a_i][a_j] = 1;
        }
        this.setState({
            gridFull: newGrid
        });
    }

    playButton = () => {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.play, this.speed);
    }

    play = () => {
        var g = this.state.gridFull;
        var ng = deepClone(g);
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                var adjacent = 0;

                // adjacent - left and right
                if (i !== 0){
                    adjacent += g[i - 1][j] ? 1 : 0;
                }
                if (i !== this.rows - 1){
                    adjacent += g[i + 1][j]?  1 : 0;
                }

                // adjacent - top and bottom
                if (j !== 0){
                    adjacent += g[i][j - 1] ? 1 : 0;
                }
                if (j !== this.cols - 1){
                    adjacent += g[i][j + 1] ? 1 : 0;
                }

                // diagonals
                if (i !== 0 && j !== 0){
                    adjacent += g[i - 1][j - 1] ? 1 : 0;
                }
                if (i !== 0 && j !== this.cols - 1){
                    adjacent += g[i - 1][j + 1] ? 1 : 0;
                }
                if (i !== this.rows - 1 && j !== 0){
                    adjacent += g[i + 1][j - 1]? 1 : 0;
                }
                if (i !== this.rows - 1 && j !== this.cols - 1){
                    adjacent += g[i + 1][j + 1]? 1 : 0;
                }

                // check rules for life and create/destroy
                if(g[i][j] && (adjacent < 2 || adjacent > 3)){
                    ng[i][j] = 0;
                }
                if(!(g[i][j]) && adjacent === 3){
                    ng[i][j] = 1;
                }
            }
        }
        this.setState({
            gridFull: ng,
            generation: this.state.generation + 1,
        });
    }

    clear = () => {
        clearInterval(this.intervalId);
        this.setState({
            generation: 0,
            gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
        });
    }

    pauseButton = () => {
        clearInterval(this.intervalId);
    }

    componentDidMount() {
        // Change ratio 
        var seedNo = Math.floor((this.rows*this.cols)/5);
        this.seeder(seedNo);
        this.playButton();
    }

    render() {
        return (
            <div>
                <h1> Chinmay's Logistic Growth based Game of Life </h1>
                <Buttons
                    playButton={this.playButton}
                    pauseButton={this.pauseButton}
                    clear={this.clear}
                    seed={this.seeder}
                />
                <Grid 
                    gridFull ={this.state.gridFull}
                    rows={this.rows}
                    cols={this.cols}
                    selectBox={this.selectBox}
                />
                <h3>Generation: {this.state.generation}</h3>
            </div>
        );
    }
}


ReactDOM.render(<Main />, document.getElementById('root'));
