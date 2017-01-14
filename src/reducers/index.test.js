import Reducers from "./index";

describe('getNumInARow', () => {
    it('recognizes 3 in a row', () => {
        let values = ["X", "X", "X", "O"];
        let result = Reducers._private.getNumInARow(values, 3);
        expect(result).toEqual("X");
    });

    it('recognizes 3 in a row with leading null', () => {
        let values = [null, "X", "X", "X", "O"];
        let result = Reducers._private.getNumInARow(values, 3);
        expect(result).toEqual("X");
    });

    it('not 3 in a row', () => {
        let values = ["X", "O", "X", "O"];
        let result = Reducers._private.getNumInARow(values, 3);
        expect(result).toEqual(null);
    });

    it('not 3 in a row with nulls', () => {
        let values = ["X", null, "X", "O"];
        let result = Reducers._private.getNumInARow(values, 3);
        expect(result).toEqual(null);
    });
});

describe('getWinner', () => {
    it('recognizes 3 in a row horizontal', () => {
        let values = [
            ["X", "X", "X"],
            ["O", null, "O"],
            ["O", null, null]
        ];
        let result = Reducers._private.getWinner(values, 3);
        expect(result).toEqual("X");
    });

    it('recognizes 3 in a row vertical', () => {
        let values = [
            ["X", "X", "O"],
            ["O", "X", "O"],
            ["O", "X", null]
        ];
        let result = Reducers._private.getWinner(values, 3);
        expect(result).toEqual("X");
    });

    it('recognizes 3 in a row diagonalRight', () => {
        let values = [
            ["X", "O", "O"],
            [null, "X", "O"],
            ["O", null, "X"]
        ];
        let result = Reducers._private.getWinner(values, 3);
        expect(result).toEqual("X");
    });

    it('recognizes 3 in a row diagonalRight', () => {
        let values = [
            ["O", "O", "X"],
            [null, "X", "O"],
            ["X", null, "X"]
        ];
        let result = Reducers._private.getWinner(values, 3);
        expect(result).toEqual("X");
    });
});

