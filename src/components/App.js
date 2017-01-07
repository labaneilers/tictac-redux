import React from 'react';
import './App.css';

const renderColumn = (table, rowIndex, colIndex, onPlayerMove) => {
  return (<td 
    key={colIndex}
    onClick={e => onPlayerMove(rowIndex, colIndex)}>
    {table[rowIndex][colIndex] || ""}
  </td>);
}

const renderRow = (table, rowIndex, onPlayerMove) => {
  let cols = [];
  for (let colIndex=0; colIndex<table[rowIndex].length; colIndex++) {
    cols.push(renderColumn(table, rowIndex, colIndex, onPlayerMove));
  }

  return(<tr key={rowIndex}>{cols}</tr>);
}

const App = ({state, onPlayerMove}) => {

    var rows = [];
    for (var i=0; i<state.table.length; i++) {
      rows.push(renderRow(state.table, i, onPlayerMove));
    }

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
      </div>
    );
}

export default App;
