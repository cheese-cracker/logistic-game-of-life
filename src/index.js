import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Grid from './Grid';
import Buttons from './Buttons';
import gitScrape from './GitScrape';
import rules from './rules';
import Values from './values';
// import cheerio from 'cheerio';
// import request from 'request';


function deepClone(arr) {
    return JSON.parse(JSON.stringify(arr));
}

class Main extends React.Component {
    // speed and ratio are inverse!
    speed = 2000;
    ratio = 8;
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
        var newGrid = deepClone(this.state.gridFull);
        newGrid[row][col] = !(newGrid[row][col]);
        this.setState({
            gridFull: newGrid,
            count: this.state.count + 1,
        });
    }

    gitSeeder = () => {
        var newGrid = deepClone(this.state.gridFull);
        // array from scraper
        // var activeArr = [[1,2], [2,3], [2,2], [2,1]];
        // const url = 'https://github.com/cheese-cracker/';
        const url = `https://cors-anywhere.herokuapp.com/github.com/${ this.state.nick }`;
        gitScrape(url, (activeArr) => {
            console.log(activeArr);
            const XOffset = 4;
            const YOffset = 4;
            let i = 0; 
            activeArr.forEach((el) => {
                i++;
                console.log(i);
                console.log(el);
                let a_i = parseInt(el[0]) + XOffset;
                let a_j = parseInt(el[1]) + YOffset;
                console.log(a_i, a_j)
                // Note: Scrapped Grid is inverted so a_j, a_i
                newGrid[a_j][a_i] = true;
                // console.log(el[0], el[1]);
            });
            this.setState({
                gridFull: newGrid,
                count: activeArr.length,
            });
        });
    }

    seeder = () => {
        let num = (this.rows*this.cols)/this.ratio;
        var newGrid = deepClone(this.state.gridFull);
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
        console.log(this.state.r, this.state.K);
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
        const val = ev.target.value;
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
            <div>
                <Values
                    l_r = {this.state.values.r}
                    l_K = {this.state.values.K}
                    changeHandler = {this.submitValues}
                />
            </div>
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
            </div>
        );
    }
}


ReactDOM.render(<Main />, document.getElementById('root'));
