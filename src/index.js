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
    time_iter = 3000;
    seed_ratio = 0.125;
    rows = 7+5+5;
    cols = 36+16+5+5;
    state = {
        generation: 0,
        cellatrix: new Grid(this.rows, this.cols),
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
        let changeval = this.state.cellatrix.select(row, col).state()
        this.setState({
            count: this.state.count + (2*changeval - 1),
        });
    }

    gitSeeder = () => {
        let mat = this.state.cellatrix
        // array from scraper
        // var activeArr = [[1,2], [2,3], [2,2], [2,1]];
        // const url = 'https://github.com/cheese-cracker/';
        const url = `https://cors-anywhere.herokuapp.com/github.com/${ this.state.nick }`
        gitScrape(url, (activeArr) => {
            console.log(activeArr)
            const XOffset = 4
            const YOffset = 4
            activeArr.forEach((el) => {
                let a_i = el[0] + XOffset
                let a_j = el[1] + YOffset
                console.log(a_i, a_j)
                // Note: Scrapped Grid is inverted so a_j, a_i
                mat.select(a_i, a_j)
                // console.log(el[0], el[1])
            });
            let num = mat.count(1)
            this.setState({
                cellatrix: mat,
                count: num + this.state.count,
            });
        });
    }

    seeder = () => {
        let thresh =  1 - this.seed_ratio
        if(thresh < 0 || thresh > 1){
            thresh = 1 - 0.125
        }
        this.state.cellatrix.simulate(thresh, (el)=>el.change())
        let cellcount = this.state.cellatrix.count(1)
        this.setState({
            count: cellcount,
        });
    }

    playButton = () => {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.play, this.time_iter);
    }

    play = () => {
        var g = this.state.cellatrix.matrix;
        var prev_count = this.state.cellatrix.count(1)
        var ng = deepClone(g)
        let res = rules(g, ng, this.rows, this.cols, prev_count, this.state.values.r, this.state.values.K)
        this.cellatrix.matrix = res[0]
        // console.log(this.state.r, this.state.K);
        this.setState({
            generation: this.state.generation + 1,
            count: this.state.cellatrix.count(1),
        });
    }

    clear = () => {
        clearInterval(this.intervalId);
        this.setState({
            generation: 0,
            cellatrix: this.state.cellatrix.simulate(0, (el)=>(el.set(0))),
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
                <ConfigValues
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
                    gridFull ={this.state.cellatrix}
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
