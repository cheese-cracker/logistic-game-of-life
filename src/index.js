import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css';
// import Grid from './Grid';
import Grid from './Grid2'
import Buttons from './Buttons'
import gitScrape from './GitScrape'
import rules from './rules'
import ConfigValues from './form'
// import cheerio from 'cheerio';
// import request from 'request';


function deepClone(arr) {
    return JSON.parse(JSON.stringify(arr));
}

class Main extends React.Component {
    // speed and seed_ratio are inverse!
    speed = 3000;
    seed_ratio = 8;
    rows = 7+5+5;
    cols = 36+16+5+5;
    state = {
        generation: 0,
        gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
        nick:'cheese-cracker',
        count: 0,
        values:{
            r: 0,
            K: this.rows*this.cols/5,
        },
    }

    nickChange = (ev) => {
        const value = ev.target.value;
        this.setState({
            nick: value,
        });
    }

    selectBox = (row, col) => {
        var newGrid = this.state.gridFull;
        newGrid[row][col] = !(newGrid[row][col]);
        this.setState({
            gridFull: newGrid,
            count: this.state.count + (2*newGrid[row][col] - 1),
        });
    }

    gitSeeder = () => {
        var newGrid = this.state.gridFull;
        // array from scraper
        // var activeArr = [[1,2], [2,3], [2,2], [2,1]];
        // const url = 'https://github.com/cheese-cracker/';
        const url = `https://cors-anywhere.herokuapp.com/github.com/${ this.state.nick }`;
        gitScrape(url, (activeArr) => {
            console.log(activeArr);
            const XOffset = 4;
            const YOffset = 4;
            var num = 0;
            activeArr.forEach((el) => {
                console.log(el);
                let a_i = parseInt(el[0]) + XOffset;
                let a_j = parseInt(el[1]) + YOffset;
                console.log(a_i, a_j)
                // Note: Scrapped Grid is inverted so a_j, a_i
                newGrid[a_j][a_i] = !newGrid[a_j][a_i];
                num = num + (2*newGrid[a_j][a_i] - 1);
                // console.log(el[0], el[1]);
            });
            this.setState({
                gridFull: newGrid,
                count: num + this.state.count,
            });
        });
    }

    seeder = () => {
        let num = (this.rows*this.cols)/this.seed_ratio;
        var newGrid = this.state.gridFull;
        for(let n = 0; n < num; n++){
            var a_i = Math.floor(Math.random()*this.rows);
            var a_j = Math.floor(Math.random()*this.cols);
            // Remove prospects for duplicates
            while(newGrid[a_i][a_j]){
                a_i = Math.floor(Math.random()*this.rows);
                a_j = Math.floor(Math.random()*this.cols);
            }
            newGrid[a_i][a_j] = true;
        }
        this.setState({
            gridFull: newGrid,
            count: Math.floor(num),
        });
    }

    playButton = () => {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.play, this.speed);
    }

    play = () => {
        var g = this.state.gridFull;
        var ng = deepClone(g);
        let res = rules(g, ng, this.rows, this.cols, this.state.count, this.state.values.r, this.state.values.K);
        // console.log(this.state.r, this.state.K);
        this.setState({
            gridFull: res[0],
            generation: this.state.generation + 1,
            count: res[1],
        });
    }

    clear = () => {
        clearInterval(this.intervalId);
        this.setState({
            generation: 0,
            gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
            count: 0,
        });
    }

    pauseButton = () => {
        clearInterval(this.intervalId);
    }

    submitValues = (ev) => {
        const name = ev.target.name;
        var val = ev.target.value;
        this.setState({
            values: {
                ...this.state.values,
                [name]: val,
            }
        });
    }

    componentDidMount() {
        // Change ratio 
        this.seeder();
        this.playButton();
    }

    render() {
        return (
            <div>
                <h1> Chinmay's Logistic Growth based Game of Life </h1>
                <br />
                <Values
                    l_r = {this.state.values.r}
                    l_K = {this.state.values.K}
                    changeHandler = {this.submitValues}
                />
                <Buttons
                    playButton={this.playButton}
                    pauseButton={this.pauseButton}
                    clear={this.clear}
                    seed={this.seeder}
                    gitSeed={this.gitSeeder}
                    nickChange={this.nickChange}
                    nick={this.state.nick}
                />
                <Grid 
                    gridFull ={this.state.gridFull}
                    rows={this.rows}
                    cols={this.cols}
                    selectBox={this.selectBox}
                />
                <h3>Generation: {this.state.generation}</h3>
                <h3>Count: {this.state.count}</h3>
                <h2>Checkout this project on <a href="https://github.com/cheese-cracker/logistic-game-of-life">Github</a>!</h2>
            </div>
        );
    }
}


ReactDOM.render(<Main />, document.getElementById('root'));
