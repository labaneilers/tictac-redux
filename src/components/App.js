import React from 'react';
import './App.css';

const renderColumn = (col = "", rowIndex, colIndex, onPlayerMove) => {
    return (<td key={colIndex} onClick={e => onPlayerMove(rowIndex, colIndex)}>{col}</td>);
};

const renderRow = (row, rowIndex, onPlayerMove) => {
    let cols = row.map((col, colIndex) => renderColumn(col, rowIndex, colIndex, onPlayerMove));

    return(<tr key={rowIndex}>{cols}</tr>);
};

const App = ({state, onPlayerMove, onReset}) => {

    let rows = state.table.map((row, i) => renderRow(row, i, onPlayerMove));

    let message = state.playerWon >= 0 ? "Player " + state.players[state.playerWon] + " won" : 
      "Player " + state.players[state.playerTurn] + "'s turn";

    return (
      <div>
        <h1>{message}</h1>
        <table className="tictactoe-table">
          <tbody>
            {rows}
          </tbody>
        </table>
        <button onClick={e => onReset()}>Reset</button>
      </div>
    );
};

export default App;
