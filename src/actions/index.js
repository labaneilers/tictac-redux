export const playerMove = (rowIndex, colIndex) => {
    return {
        type: 'MOVE',
        rowIndex: rowIndex,
        colIndex: colIndex
    };
};

export const reset = () => {
    return {
        type: 'RESET'
    };
};