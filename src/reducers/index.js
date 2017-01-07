const _initialState = {
	table: makeArray(3, 3),
	players: ["X", "O"],
	playerTurn: 0,
	playerWon: -1
};

function makeArray(rows, cols) {
	var arr = [];
	for (var i=0; i<rows; i++) {
		var row = new Array(cols);
		arr.push(row);
	}
	return arr;
}

export default function tictactoe(state = _initialState, action = {}) {

	switch (action.type) {
		case "MOVE":
			return playerMove(state, action);
		default:
			return state;
	}
}

function playerMove(state, action) {

	if (typeof(action.rowIndex) === "undefined") {
		return state;
	}

	if (state.playerWon >= 0) {
		return state;
	}

	var whosTurn = state.players[state.playerTurn];

	// Clone state
	var newState = JSON.parse(JSON.stringify(state));

	if (!state.table[action.rowIndex][action.colIndex]) {
		newState.table[action.rowIndex][action.colIndex] = whosTurn;
		newState.playerTurn++;
		if (newState.playerTurn >= newState.players.length) {
			newState.playerTurn = 0;
		}
	}

	var winner = getWinner(newState.table);
	if (winner) {
		newState.playerWon = newState.players.indexOf(winner);
	}

	return newState;
}



function getWinner(table) {
	return getWinnerDirection(table, "vertical") ||
		getWinnerDirection(table, "horizontal") ||
		getWinnerDirection(table, "diagonalleft") ||
		getWinnerDirection(table, "diagonalright");
}

function enumerateValuesHorizontal(table) {
	let values = [];
	for (let i=0; i<table.length; i++) {
		let valueRun = [];
		for (let j=0; j<table[i].length; j++) {
			valueRun.push(table[i][j]);
		}
		values.push(valueRun);
	}
	return values;
}

function enumerateValuesVertical(table) {
	let values = [];
	for (let i=0; i<table[0].length; i++) {
		let valueRun = [];
		for (let j=0; j<table.length; j++) {
			valueRun.push(table[j][i]);
		}
		values.push(valueRun);
	}
	return values;
}

function enumerateValues(table, direction) {
	var values = [];
	var valueRun;
	var maxX, maxY;

	if (direction === "horizontal") {
		values = enumerateValuesHorizontal(table);
	} else if (direction === "vertical") {
		values = enumerateValuesVertical(table);
	} else if (direction === "diagonalleft") {
		maxX = table[0].length;
		maxY = table.length;

		for (var slice = 0; slice < (maxX + maxY) - 1; slice++) {
	        var z = slice < maxX ? 0 : slice - maxX + 1;
	        valueRun = [];
	        for (let j = z; j <= slice - z; j++) {
	            valueRun.push(table[j][slice - j]);
	        }
	        if (valueRun.length >= maxX) {
	        	values.push(valueRun);
	        }
	    }
	} else if (direction === "diagonalright") {
		maxX = table[0].length - 1;
		maxY = table.length - 1;
		var minRunLen = table.length;

		var x = 0;
		var y = maxY;

		while (x<=maxX && x>=0 && y<=maxY && y>=0) {
			var iX = x;
			var iY = y;

			if (y + (minRunLen - 1) <= maxY && x + (minRunLen - 1) <= maxX) {
				valueRun = [];

				while (iX<=maxX && iX>=0 && iY<=maxY && iY>=0) {
					valueRun.push(table[iX][iY]);
					iX++;
					iY++;
				}

        		values.push(valueRun);
			}
			
			if (y === 0) {
				x++;
			} else {
				y--;
			}
		}
	}

	return values || [];
}

function getWinnerDirection(table, direction) {
	var values = enumerateValues(table, direction);

	for (var i=0; i<values.length; i++) {
		var player = null;

		for (var j=0; j<values[i].length; j++) {
			var val = values[i][j];
			if (!val) {
				player = null;
				break;
			}
			if (player === null || player === val) {
				player = val;
			} else if (player !== val) {
				player = null;
				break;
			}
		}

		if (player) {
			return player;
		}
	}

	return null;
}


