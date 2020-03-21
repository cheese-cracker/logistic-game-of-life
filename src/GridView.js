import React from 'react';
import './css/GridView.css';


class Box extends React.Component {
    selectBox = () => {
        this.props.selectBox(this.props.row, this.props.col)
    }
    render(){
        let i = this.props.row
        let j = this.props.col
        var boxId = "box_" + i + "_" + j
        var boxClass = `boxer brow-${i} bcol-${j} cellstate${this.props.boxGene.state}`
        return(
            <div
                className={boxClass}
                id={boxId}
                onClick={this.selectBox}
            />
        );
    }
}

export default class GridView extends React.Component {
    rows = this.props.celltrix.rows
    cols = this.props.celltrix.cols

    render(){
        let mtrix = this.props.celltrix.mat
        var rowsArr = [];
        for ( var i = 0; i < this.rows; i++){
            for (var j = 0; j < this.cols; j++){
                var cellgene = mtrix[i][j]
                rowsArr.push(
                    <Box
                        boxGene = {cellgene}
                        row={i}
                        col={j}
                        selectBox={this.props.selectBox}
                    />
                );
            }
        }

        return (
            <div className="gridder" style={{width: this.cols*16}}>
                {rowsArr}
            </div>
        );
    }
}
