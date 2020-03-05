const { argument } = require("./command");
const { readBoard, fileHasRows, getRows } = require("./fileReader");
const {
  dimensionsAreCorrect,
  isValidUnformattedBoard,
  isValidSudoku
} = require("./board");

const pathArgument = argument._[0];
const content = readBoard(pathArgument);
if (content) {
  const unformattedBoards = getRows(content);
  if (fileHasRows(unformattedBoards)) {
    unformattedBoards.forEach(row => {
      if (dimensionsAreCorrect(row)) {
        if (isValidUnformattedBoard(row)) {
          console.log("isValidSudoku", isValidSudoku(row));
        } else {
          console.log("isValidUnformattedBoard", false);
        }
      } else {
        console.log("dimensionsAreCorrect", false);
      }
    });
  } else {
    console.log("Cant get rows of sudoku sudoku rows");
  }
} else {
  console.log("Can`t get content file");
}
