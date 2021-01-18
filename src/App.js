import React from 'react';
import './App.css';



class App extends React.Component {
    state = {
        board: [],
        boardAxis: {
            rows: 3,
            cols: 3
        },
        emptyBlock: [],
        clickables: {}
    }

    componentDidMount(){
        this.createRandomBoard();
    }

    createRandomBoard = () => {
        let {rows, cols} = this.state.boardAxis, 
            totalBoxes = (rows * cols) - 1,
            randomIndex = 0, temp;
        let board = [];
        
        //Creating the board with default value 
        for(let i=totalBoxes-1; i>=0; i--){board.push(i)}

        //Add the value for the empty block
        board.push(-1)

        //Shuffling the board elements value
        for(let i=board.length-1; i>=0; i--){
            randomIndex = Math.round(Math.random() * i);
            temp = board[i];
            board[i] = board[randomIndex];
            board[randomIndex] = temp;
        }
        
        //Making the board with Multidimenssional array
        let multiDimensionalBoard = [], start =0;
        for(let i=0; i<rows; i++){
            multiDimensionalBoard.push(board.slice(start, start+cols));
            start = start+cols;
        }

        this.setState({
            board: multiDimensionalBoard
        }, () => {
            this.setEmptyBlock()
            this.setClickables()
        });
    }

    getBoard = () => {
        return this.state.board;
    }

    setEmptyBlock = () => {
        let board = this.getBoard();
        for(let i=0; i<board.length; i++){
            for(let j=0; j<board[i].length; j++){
                if(board[i][j] === -1){
                    this.setState({
                        emptyBlock: [i, j]
                    });
                    break;
                }
            }
        }
    }

    getEmptyBlock = () => {
        return this.state.emptyBlock;
    }

    getLeft = () => {
        let [row, col] = this.getEmptyBlock();
        if(col === 0){
            return -1;
        }

        return [row, col-1];
    }

    getTop = () => {
        let [row, col] = this.getEmptyBlock();
        if(row === 0){
            return -1;
        }

        return [row-1, col];

    }

    getRight = () => {
        let [row, col] = this.getEmptyBlock();
        if(col === this.state.boardAxis.cols - 1){
            return -1;
        }

        return [row, col+1];
    }

    getBottom = () => {
        let [row, col] = this.getEmptyBlock();
        if(row === this.state.boardAxis.rows - 1){
            return -1;
        }

        return [row+1, col];
    }

    getClickables = () => {
        return {
            left: this.getLeft(),
            top: this.getTop(),
            right: this.getRight(),
            bottom: this.getBottom()
        }
    }

    setClickables = () => {
        this.setState({
            clickables: this.getClickables()
        });
    }

    isClickable = (row, colum) => {
        let {left, top, right, bottom} = this.getClickables();

        if((left[0] === row && left[1] === colum)){
            return left;
        }
        if((top[0] === row && top[1] === colum)){
            return top;
        }
        if((right[0] === row && right[1] === colum)){
            return right;
        }
        if((bottom[0] === row && bottom[1] === colum)){
            return bottom;
        }
        return false; 
    }

    moveBoardElement = (clickables) => {
        let emptyBlock = this.getEmptyBlock(),
            board = this.getBoard();
        
        board[emptyBlock[0]][emptyBlock[1]] = board[clickables[0]][clickables[1]];
        board[clickables[0]][clickables[1]] = -1;

        this.setState({
            board: board,
            emptyBlock: clickables
        }, () => {
            this.isCompleted();
        });        
    }

    isCompleted = () => {
        let count = 0,
            board = this.getBoard();
            console.log(board);

            for ( let i=0; i<this.state.boardAxis.cols -1; i++){
            for(let j=0; i<this.state.boardAxis.cols -1; j++){
                console.log(i, j);
                if(board[i][j] !== count) return false;
                count++;
            }
        }

        alert('Congratulations, You have completed this game !')
    }

    renderRow = (row, rowIndex, clickables) => {
        return row.map((value, columIndex)  => {

            let clickables = this.isClickable(rowIndex, columIndex);
            return <div className={(value === -1) ? 'empty' : 'element'} 
                key={value}
                onClick={() => {
                    if(clickables){
                        this.moveBoardElement(clickables);
                    }else{
                        // alert('You cant click here!')
                    }
                }} 
                style={{cursor: (clickables) ? 'pointer' : 'no-drop'}} >
                <div className="center" key={value}>{(value === -1) ? '' : value +1 }</div>
            </div>
        });
    }

    renderBoard = () => {
        return this.getBoard().map((row, index) => {
            return <div className="boardRow" key={index}>
                {this.renderRow(row, index)}
            </div>
        });
    }

    render(){
        
        return <>
            <h1>Puzzle Game</h1>
            <div className="board">
                {this.state.board ? this.renderBoard() : ''}
            </div>
        </>
    }
}


export default App;

