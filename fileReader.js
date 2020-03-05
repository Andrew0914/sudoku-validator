const path = require("path");
const files = require("fs");
const mime = require("mime-types");
const os = require("os");

EOL = os.EOL;

/**
 * Receives the txt file path an return the content as string
 * @param {string} fileBoardPath
 */
const readBoard = fileBoardPath => {
  if (isValidTxtFile(fileBoardPath)) {
    const stringBoard = files.readFileSync(fileBoardPath).toString();
    return stringBoard;
  }
  return "";
};

/**
 * Receives a file path and validate if it is actually txt file
 * @param {string} fileBoardPath
 */
const isValidTxtFile = fileBoardPath => {
  const absolutePath = path.resolve(fileBoardPath);
  const mimeType = mime.lookup(absolutePath);
  if (mimeType !== "text/plain") {
    console.error("File is not a plain text file");
    return false;
  }
  return true;
};

/**
 * Return the rows of file based on break line
 * @param {string} content
 */
const getRows = content => {
  let fileRows = [];
  if (content.includes("\r\n")) {
    fileRows = content.split("\r\n");
  } else if (content.includes("\n")) {
    fileRows = content.split("\n");
  } else if (content.includes("\r")) {
    fileRows = content.split("\r");
  } else if (content.includes(EOL)) {
    fileRows = content.split(EOL);
  }
  return fileRows;
};


/**
 * Verify if borad rows has rows
 * @param {array} boardRows
 */
const fileHasRows = boarRows => boarRows.length > 0;

module.exports = {
    readBoard,
    getRows,
    fileHasRows
} 