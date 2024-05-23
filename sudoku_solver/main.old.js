import { Graph } from "./graph.js";
import { SudokuConnections } from "./sudoku_connections.js";

function testGraph() {
  const g = new Graph();
  for (let i = 0; i < 6; i++) {
    g.addNode(i);
  }

  console.log(`Vertices : ${g.getAllNodesIds()}`);

  g.addEdge(0, 1, 5);
  g.addEdge(0, 5, 2);
  g.addEdge(1, 2, 4);
  g.addEdge(2, 3, 9);
  g.addEdge(3, 4, 7);
  g.addEdge(3, 5, 3);
  g.addEdge(4, 0, 1);
  g.addEdge(5, 4, 8);
  g.addEdge(5, 2, 1);

  g.printEdges();

  console.log("DFS : (starting with 0)");
  g.DFS(0);
  console.log("\n");

  console.log("BFS : (starting with 0)");
  g.BFS(0);
  console.log("\n");
}

function testConnections() {
  const sudoku = new SudokuConnections();
  sudoku.connectEdges();
  console.log("All node Ids : ");
  console.log(Array.from(sudoku.graph.getAllNodesIds()));
  console.log();
  for (const idx of sudoku.graph.getAllNodesIds()) {
    console.log(
      idx,
      "Connected to ->",
      Array.from(sudoku.graph.allNodes.get(idx).getConnections())
    );
  }
}

testGraph();
testConnections();
