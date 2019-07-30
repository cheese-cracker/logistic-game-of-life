import React from 'react';
import './values.css';
// import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';

export default class Values extends React.Component {

    render() {
        return(
            <div className="Form">
            <form>
              <div align="center">
                <label htmlFor="inputText" className="col-sm-8 col-form-label yellow">r = </label>
                <input className="short" type="text" name="r" value={this.props.l_r} onChange={this.props.changeHandler} />
                <label htmlFor="inputText" className="col-sm-8 col-form-label yellow">K = </label>
                <input className="short" type="text" name="K" value={this.props.l_K} onChange={this.props.changeHandler} />
              </div>
            </form>
            </div>
        );
    }
}
