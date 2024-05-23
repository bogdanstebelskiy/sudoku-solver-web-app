import { Graph } from "./graph.js";

export class SudokuConnections {
  constructor() {
    this.graph = new Graph();
    this.rows = 9;
    this.cols = 9;
    this.totalBlocks = this.rows * this.cols;
    this.generateGraph();
    this.connectEdges();
    this.allIds = Array.from(this.graph.getAllNodesIds());
  }

  generateGraph() {
    for (let idx = 1; idx <= this.totalBlocks; idx++) {
      this.graph.addNode(idx);
    }
  }

  connectEdges() {
    const matrix = this.getGridMatrix();
    const headConnections = {};

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const head = matrix[row][col];
        const connections = this.whatToConnect(matrix, row, col);
        headConnections[head] = connections;
      }
    }

    this.connectThose(headConnections);
  }

  connectThose(headConnections) {
    for (const head in headConnections) {
      const connections = headConnections[head];
      for (const key in connections) {
        for (const v of connections[key]) {
          this.graph.addEdge(Number(head), v);
        }
      }
    }
  }

  whatToConnect(matrix, row, col) {
    const connections = { rows: [], cols: [], blocks: [] };
    const block = [];

    // ROWS
    for (let c = col + 1; c < 9; c++) {
      connections.rows.push(matrix[row][c]);
    }

    // COLS
    for (let r = row + 1; r < 9; r++) {
      connections.cols.push(matrix[r][col]);
    }

    // BLOCKS
    const rowStart = Math.floor(row / 3) * 3;
    const colStart = Math.floor(col / 3) * 3;
    for (let r = rowStart; r < rowStart + 3; r++) {
      for (let c = colStart; c < colStart + 3; c++) {
        if (r !== row || c !== col) {
          block.push(matrix[r][c]);
        }
      }
    }

    connections.blocks = block;
    return connections;
  }

  getGridMatrix() {
    const matrix = new Array(9).fill().map(() => new Array(9).fill(0));
    let count = 1;
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        matrix[row][col] = count;
        count++;
      }
    }
    return matrix;
  }
}
