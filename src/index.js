import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Grid from './Grid';


function deepClone(arr) {
    return JSON.parse(JSON.stringify(arr));
}

class Main extends React.Component {
    speed = 100;
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
            console.log("Seeded", a_i, a_j);
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
                let adjacent = 0;
            }
        }
    }

    componentDidMount() {
        // Change ratio 
        var seedNo = Math.floor((this.rows*this.cols)/4);
        this.seeder(seedNo);
    }

    render() {
        return (
            <div>
                <h1> Logistic Growth based Game of Life </h1>
                <Grid 
                    gridFull ={this.state.gridFull}
                    rows={this.rows}
                    cols={this.cols}
                    selectBox={this.selectBox}
                />
            </div>
        );
    }
}


ReactDOM.render(<Main />, document.getElementById('root'));
