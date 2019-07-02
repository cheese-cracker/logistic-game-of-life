import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Grid from './Grid';


class Main extends React.Component {
    state = {
        generation: 0,
    }


    render() {
        return (
            <div>
                <h1> Logistic Growth based Game of Life </h1>
                <Grid />
            </div>
        );
    }
}


ReactDOM.render(<Main />, document.getElementById('root'));
