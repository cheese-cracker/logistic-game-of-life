import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css';
import Grid from './Grid'
import GridView from './GridView'
import Buttons from './Buttons'
import gitScrape from './gitscrape'
import {logistic_growth_rules} from './rules'
import ConfigValues from './form'
// import cheerio from 'cheerio';
// import request from 'request';


class Main extends React.Component {
    time_iter = 4000;
    seed_ratio = 0.125;
    rows = 7+5+5;
    cols = 36+16+5+5;
    state = {
        generation: 0,
        genetrix: new Grid(this.rows, this.cols, 3),
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
        let changeval = this.state.genetrix.select(row, col)
        this.setState({
            count: this.state.count + (2*changeval - 1),
        });
    }

    gitSeeder = () => {
        let mat = this.state.genetrix
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
                genetrix: mat,
                count: num + this.state.count,
            });
        });
    }

    seeder = () => {
        let thresh =  1 - this.seed_ratio
        if(thresh < 0 || thresh > 1){
            thresh = 1 - 0.125
        }
        // Simulate each element
        this.state.genetrix.simulate_all(thresh, (el) => { el.change() })
        let cellcount = this.state.genetrix.count(1)
        this.setState({
            count: cellcount,
        })
    }

    playButton = () => {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.play, this.time_iter);
    }

    play = () => {
        let newcount = logistic_growth_rules(this.state.genetrix, this.state.values.r, this.state.values.K)
        // console.log(this.state.r, this.state.K);
        this.setState({
            generation: this.state.generation + 1,
            count: newcount,
            genetrix: this.state.genetrix,
        });
    }

    clear = () => {
        clearInterval(this.intervalId);
        this.state.genetrix.simulate_all(0, (el)=>(el.set(0)))
        this.setState({
            generation: 0,
            genetrix: this.state.genetrix,
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
                <GridView
                    celltrix={this.state.genetrix}
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
