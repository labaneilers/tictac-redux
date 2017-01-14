const _initialState = {
    table: makeArray(5, 5),
    players: ["X", "O"],
    playerTurn: 0,
    playerWon: -1,
    numberToWin: 4
};

function makeArray(rows, cols) {
    return Array.from(new Array(rows), () => new Array(cols).fill(null));
}

export default function tictactoe(state = _initialState, action = {}) {
    switch (action.type) {
        case "MOVE":
            return playerMove(state, action);
        case "RESET":
            return _initialState;
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

    let whosTurn = state.players[state.playerTurn];

    // Clone state
    let newState = JSON.parse(JSON.stringify(state));

    if (!state.table[action.rowIndex][action.colIndex]) {
        newState.table[action.rowIndex][action.colIndex] = whosTurn;
        newState.playerTurn++;
        if (newState.playerTurn >= newState.players.length) {
            newState.playerTurn = 0;
        }
    }

    let winner = getWinner(newState.table, state.numberToWin);
    if (winner) {
        newState.playerWon = newState.players.indexOf(winner);
    }

    return newState;
}

function walkHorizontal(table) {
    return table;
}

function* walkVertical(table) {
    for (let i=0; i<table[0].length; i++) {
        let valueRun = [];
        for (let j=0; j<table.length; j++) {
            valueRun.push(table[j][i]);
        }
        yield valueRun;
    }
}

function* walkDiagonalRight(table) {
    let maxX = table[0].length - 1;
    let maxY = table.length - 1;
    let minRunLen = table.length;

    let x = 0;
    let y = maxY;

    while (x<=maxX && x>=0 && y<=maxY && y>=0) {
        let iX = x;
        let iY = y;

        if (y + (minRunLen - 1) <= maxY && x + (minRunLen - 1) <= maxX) {
            let valueRun = [];

            while (iX<=maxX && iX>=0 && iY<=maxY && iY>=0) {
                valueRun.push(table[iX][iY]);
                iX++;
                iY++;
            }

            yield valueRun;
        }
        
        if (y === 0) {
            x++;
        } else {
            y--;
        }
    }
}

function* walkDiagonalLeft(table) {
    let maxX = table[0].length;
    let maxY = table.length;

    for (let slice = 0; slice < (maxX + maxY) - 1; slice++) {
        let z = slice < maxX ? 0 : slice - maxX + 1;
        let valueRun = [];
        for (let j = z; j <= slice - z; j++) {
            valueRun.push(table[j][slice - j]);
        }
        if (valueRun.length >= maxX) {
            yield valueRun;
        }
    }
}

function getWinner(table, numberToWin) {
    for (let walker of [walkHorizontal, walkVertical, walkDiagonalLeft, walkDiagonalRight]) {
        for (let valueRun of walker(table)) {
            var result = getNumInARow(valueRun, numberToWin);
            if (result) {
                return result;
            }
        }
    }

    return null;
}

function getNumInARow(values, numberInARow) {
    let count = 0;
    let lastPlayer = null;

    for (let val of values) {
        if (val) {
            if (val === lastPlayer) {
                count++;
                if (count >= numberInARow) {
                    return lastPlayer;
                }
            } else {
                count = 1;
            }
        }
        lastPlayer = val;
    }

    return null;
}

tictactoe._private = {
    getNumInARow,
    getWinner
};




