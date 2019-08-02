import React from 'react';
import {ButtonToolbar} from 'react-bootstrap';
import './Buttons.css';

export default class Buttons extends React.Component {

    render(){
        return (
        <div className="center">
                <div className="form-group row">
                    <label htmlFor="inputText" className="col-sm-8 col-form-label yellow">https://github.com/</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputText" value={ this.props.nick } onChange={this.props.nickChange} />
                    </div>
                </div>
                <button className="btn btn-default button-scrape" onClick={this.props.gitSeed}>
                  Scrape User Contributions
                </button>
            <br /><br />
            <ButtonToolbar>
                <button className="btn btn-default button-plus" onClick={this.props.playButton}>
                    Play
                </button>
                <button className="btn btn-default button-plus" onClick={this.props.pauseButton}>
                  Pause
                </button>
                <button className="btn btn-default button-plus" onClick={this.props.clear}>
                  Clear
                </button>
                <button className="btn btn-default button-plus" onClick={this.props.seed}>
                  Seed
                </button>
            </ButtonToolbar>
        </div>
        );
    }
}
