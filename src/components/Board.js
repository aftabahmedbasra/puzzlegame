import React from 'react';


class Board extends React.Component{


    renderBoard = () => {
        return this.props.board.map((row, index) => {
            return <div className="boardRow" key={index}>
                {this.renderRow(row)}
            </div>
        });
    }

    renderRow = (row) => {
        return row.map(value => {
            return <div className="element" 
                key={value}
                onClick={() => console.log(value)} >
                <div key={value}>{value}</div>
            </div>
        });
    }
    render(){

        return <>
            <h1>Board</h1>
            <div className="board">
                {this.props.board ? this.renderBoard() : ''}
            </div>
            
        </>

    }
}

export default Board;