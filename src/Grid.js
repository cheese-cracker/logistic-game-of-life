import React from 'react';
import './Grid.css';


class Box extends React.Component {
    selectBox = () => {
        this.props.selectBox(this.props.row, this.props.col);
    }
    render(){
        return(
            <div
                className={this.props.boxClass}
                id={this.props.boxId}
                onClick={this.selectBox}
            />
        );
    }
}

export default class Grid extends React.Component {

    render(){
        const width = this.props.cols * 16;
        var rowsArr = [];
        for ( var i = 0; i < this.props.rows; i++){
            for ( var j = 0; j < this.props.rows; j++){
                var boxId = "box_" + i + "_" + j;
                var boxClass = this.props.gridFull[i][j] ? "box on": "box off";
                rowsArr.push(
                    <Box
                        boxClass={boxClass}
                        key={boxId}
                        boxId = {boxId}
                        row={i}
                        col={j}
                        selectBox={this.props.selectBox}
                    />
                );
            }
        }

        return (
            <div className="grid" style={{width: width}}>
                {rowsArr}
            </div>
        );
    }
}
