import { SudokuConnections } from "./sudoku_connections.js"


export default class SudokuBoard {
  constructor(board) {
    this.board = board;
    this.sudokuGraph = new SudokuConnections();
    this.mappedGrid = this.getMappedMatrix(); // Maps all the ids to the position in the matrix
  }

  getMappedMatrix() {
    const matrix = new Array(9).fill(0).map(() => new Array(9).fill(0));
    let count = 1;
    for (let rows = 0; rows < 9; rows++) {
      for (let cols = 0; cols < 9; cols++) {
        matrix[rows][cols] = count;
        count += 1;
      }
    }
    return matrix;
  }

  getBoard() {
    return this.board;
  }

  printBoard() {
    console.log("    1 2 3     4 5 6     7 8 9");
    for (let i = 0; i < this.board.length; i++) {
      if (i % 3 === 0) {
        console.log("  - - - - - - - - - - - - - - ");
      }
      for (let j = 0; j < this.board[i].length; j++) {
        if (j % 3 === 0) {
          process.stdout.write(" |  ");
        }
        if (j === 8) {
          console.log(this.board[i][j], " | ", i + 1);
        } else {
          process.stdout.write(`${this.board[i][j]} `);
        }
      }
    }
    console.log("  - - - - - - - - - - - - - - ");
  }

  isBlank() {
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        if (this.board[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return null;
  }

  isValid(num, pos) {
    // ROW
    for (let col = 0; col < this.board[0].length; col++) {
      if (this.board[pos[0]][col] === num && pos[1] !== col) {
        return false;
      }
    }

    // COL
    for (let row = 0; row < this.board.length; row++) {
      if (this.board[row][pos[1]] === num && pos[0] !== row) {
        return false;
      }
    }

    // BLOCK
    const x = Math.floor(pos[1] / 3);
    const y = Math.floor(pos[0] / 3);

    for (let row = y * 3; row < y * 3 + 3; row++) {
      for (let col = x * 3; col < x * 3 + 3; col++) {
        if (this.board[row][col] === num && (row !== pos[0] || col !== pos[1])) {
          return false;
        }
      }
    }

    return true;
  }

  isValidSudoku() {
    // Check rows
    for (let row = 0; row < 9; row++) {
      const rowSet = new Set();
      for (let col = 0; col < 9; col++) {
        const num = this.board[row][col];
        if (num !== 0 && rowSet.has(num)) {
          return false; // Duplicate number found in row
        }
        rowSet.add(num);
      }
    }

    // Check columns
    for (let col = 0; col < 9; col++) {
      const colSet = new Set();
      for (let row = 0; row < 9; row++) {
        const num = this.board[row][col];
        if (num !== 0 && colSet.has(num)) {
          return false; // Duplicate number found in column
        }
        colSet.add(num);
      }
    }

    // Check subgrids
    for (let startRow = 0; startRow < 9; startRow += 3) {
      for (let startCol = 0; startCol < 9; startCol += 3) {
        const subgridSet = new Set();
        for (let row = startRow; row < startRow + 3; row++) {
          for (let col = startCol; col < startCol + 3; col++) {
            const num = this.board[row][col];
            if (num !== 0 && subgridSet.has(num)) {
              return false; // Duplicate number found in subgrid
            }
            subgridSet.add(num);
          }
        }
      }
    }

    return true; // Sudoku puzzle is valid
  }

  solveItNaive() {
    const findBlank = this.isBlank();

    if (findBlank === null) {
      return true;
    } else {
      const [row, col] = findBlank;
      for (let i = 1; i <= 9; i++) {
        if (this.isValid(i, [row, col])) {
          this.board[row][col] = i;
          if (this.solveItNaive()) {
            return true;
          }
          this.board[row][col] = 0;
        }
      }
      return false;
    }
  }

  graphColoringInitializeColor() {
    const color = new Array(this.sudokuGraph.graph.totalV + 1).fill(0);
    const given = []; // list of all the ids whose value is already given. Thus cannot be changed
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        if (this.board[row][col] !== 0) {
          //first get the idx of the position
          const idx = this.mappedGrid[row][col];
          //update the color
          color[idx] = this.board[row][col]; // this is the main imp part
          given.push(idx);
        }
      }
    }
    return [color, given];
  }

  solveGraphColoring(m = 9) {
    const [color, given] = this.graphColoringInitializeColor();
    if (!this.graphColorUtility(m, color, 1, given)) {
      return false;
    }
    let count = 1;
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        this.board[row][col] = color[count];
        count += 1;
      }
    }
    return color;
  }

  graphColorUtility(m, color, v, given) {
    if (v === this.sudokuGraph.graph.totalV + 1) {
      return true;
    }
    for (let c = 1; c <= m; c++) {
      if (this.isSafe2Color(v, color, c, given)) {
        color[v] = c;
        if (this.graphColorUtility(m, color, v + 1, given)) {
          return true;
        }
      }
      if (!given.includes(v)) {
        color[v] = 0;
      }
    }
  }

  isSafe2Color(v, color, c, given) {
    if (given.includes(v) && color[v] === c) {
      return true;
    } else if (given.includes(v)) {
      return false;
    }

    for (let i = 1; i <= this.sudokuGraph.graph.totalV; i++) {
      if (color[i] === c && this.sudokuGraph.graph.isNeighbour(v, i)) {
        return false;
      }
    }
    return true;
  }
}
