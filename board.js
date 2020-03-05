/**
 * Receive a row item  obtained from the file and  validate if it has correct dimensions for valid board
 * @param {string} unformattedRowBoard
 */
const dimensionsAreCorrect = unformattedRowBoard => {
  const metaBoard = unformattedRowBoard.split(";");
  if (
    metaBoard.length == 2 &&
    (parseInt(metaBoard[0]) === 4 || parseInt(metaBoard[0]) === 9)
  ) {
    const boardNumbers = metaBoard[1].split(",");
    const expectedSize = Math.pow(parseInt(metaBoard[0]), 2);

    return boardNumbers.length === expectedSize;
  }
  return false;
};

/**
 * Receive a row item  obtained from the file and validate if is valid unformatted board
 * @param {string} unformattedRowBoard
 */
const isValidUnformattedBoard = unformattedRowBoard => {
  if (dimensionsAreCorrect(unformattedRowBoard)) {
    const metaBoard = unformattedRowBoard.split(";");
    const numbers = metaBoard[1].split(",");

    for (let n = 0; n < numbers.length; n++) {
      if (isNaN(numbers[n])) return false;
    }
    return true;
  }

  return false;
};

/**
 * Receive a row item  obtained from the file and return its matrix representation of sudoku board
 * @param {string} unformattedRowBoard
 */
const unformattedBoardToMatrix = unformattedRowBoard => {
  const metaBoard = unformattedRowBoard.split(";");
  const numbers = metaBoard[1].split(",");
  let matrixBoard = [];
  const dimension = parseInt(metaBoard[0]);
  for (let i = 0; i < numbers.length; i += dimension) {
    matrixBoard.push(numbers.slice(i, i + dimension).map(n => parseInt(n)));
  }
  return matrixBoard;
};

/**
 * Verify if row contains correct numeration
 * @param {array} row
 */
const isValidSudokuRow = row => {
  for (let i = 1; i <= row.length; i++) {
    if (row.filter(number => number === i).length !== 1) return false;
  }
  return true;
};

/**
 * Validate if matrix sudoku has correct rows
 * @param {array} validMatrix
 */
const areValidSudokuRows = validMatrix => {
  for (let iRow = 0; iRow < validMatrix.length; iRow++) {
    if (!isValidSudokuRow(validMatrix[iRow])) return false;
  }
  return true;
};

/**
 * Validate if matrix sudoku has correct columns
 * @param {array} validMatrix
 */
const areValidSudokuColumns = validMatrix => {
  const rowDimension = validMatrix[0].length;
  let columnAsRow = [];
  for (let i = 0; i < rowDimension; i++) {
    validMatrix.forEach(row => {
      columnAsRow.push(row[i]);
    });
    if (!isValidSudokuRow(columnAsRow)) return false;
    columnAsRow = [];
  }
  return true;
};

/**
 * Receives a column of squares to validate each square
 * @param {array} columnSquare
 * @param {int} dimension
 */
const areValidSudokuSquares = (columnSquare, dimension) => {
  const countSquare = Math.sqrt(dimension);
  const squares = new Array(countSquare);
  for (let s = 0; s < squares.length; s++) {
    squares[s] = new Array();
  }
  let count = 0
  for (let iSquare = 0; iSquare < countSquare; iSquare ++) {
      for(let i = count ; i< count + countSquare ; i++){
        squares[iSquare].push(...columnSquare[i])
      }
      count += countSquare
  }

  for(let isq = 0 ; isq < squares.length; isq++){
    if(!isValidSudokuRow(squares[isq])) return false
  }

  return true
};

/**
 * Receives sudoku matrix and parse into squares columns to validate each square
 * @param {array} validMatrix
 */
const areValidColumsSquares = validMatrix => {
  const dimension = validMatrix[0].length;
  const squareDimension = Math.sqrt(dimension);
  const factor = dimension / squareDimension;
  let columnSquares = [];
  for (let i = 0; i < dimension; i += factor) {
    validMatrix.forEach(row => {
      columnSquares.push(row.slice(i, i + factor));
    });
    if (!areValidSudokuSquares(columnSquares, dimension)) return false;
    columnSquares = new Array();
  }
  return true;
};

/**
 * Apply all validations for sudoku board
 * @param {array} unformattedRowBoard
 */
const isValidSudoku = unformattedRowBoard => {
  const matrixSudoku = unformattedBoardToMatrix(unformattedRowBoard);
  //console.log(matrixSudoku);
  return areValidSudokuRows(matrixSudoku) && areValidSudokuColumns(matrixSudoku) && areValidColumsSquares(matrixSudoku);
};

module.exports = {
  isValidSudoku,
  dimensionsAreCorrect,
  isValidUnformattedBoard
};
