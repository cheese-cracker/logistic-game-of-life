import React from 'react';
import './css/GridView.css';


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

export default class GridView extends React.Component {
    width = this.props.cols * 16;

    render(){
        var rowsArr = [];
        for ( var i = 0; i < this.props.rows; i++){
            for (var j = 0; j < this.props.cols; j++){
                var boxId = "box_" + i + "_" + j;
                var boxClass = `box brow-${i} bcol-${j} cellstate${this.props.gridFull[i][j].state()}`;
                rowsArr.push(
                    <Box
                        boxClass={boxClass}
                        boxId = {boxId}
                        row={i}
                        col={j}
                        selectBox={this.props.selectBox}
                    />
                );
            }
        }

        return (
            <div className="gridder" style={{width: this.width}}>
                {rowsArr}
            </div>
        );
    }
}
