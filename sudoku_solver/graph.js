export class Node {
  constructor(idx, data = 0) {
    this.id = idx;
    this.data = data;
    this.connectedTo = new Map();
  }

  addNeighbour(neighbour, weight = 0) {
    if (!this.connectedTo.has(neighbour.id)) {
      this.connectedTo.set(neighbour.id, weight);
    }
  }

  setData(data) {
    this.data = data;
  }

  getConnections() {
    return Array.from(this.connectedTo.keys());
  }

  getID() {
    return this.id;
  }

  getData() {
    return this.data;
  }

  toString() {
    return (
      this.data +
      " Connected to: " +
      Array.from(this.connectedTo.values())
        .map((x) => x.data)
        .join(", ")
    );
  }
}

export class Graph {
  constructor() {
    this.totalV = 0; // total vertices in the graph
    this.allNodes = new Map(); // key-value pairs: idx - Node Object
  }

  addNode(idx) {
    // adds the node
    if (!this.allNodes.has(idx)) {
      this.totalV++;
      const node = new Node(idx);
      this.allNodes.set(idx, node);
      return node;
    }
    return null;
  }

  addNodeData(idx, data) {
    // set node data according to idx
    if (this.allNodes.has(idx)) {
      const node = this.allNodes.get(idx);
      node.setData(data);
    } else {
      console.log("No ID to add the data.");
    }
  }

  addEdge(src, dst, wt = 0) {
    // Adds edge between 2 nodes (Undirected graph)
    // To make it a directed graph, comment the second line
    const srcNode = this.allNodes.get(src);
    const dstNode = this.allNodes.get(dst);
    if (srcNode && dstNode) {
      srcNode.addNeighbour(dstNode, wt);
      dstNode.addNeighbour(srcNode, wt);
    }
  }

  isNeighbour(u, v) {
    // check if neighbour exists or not
    if (u >= 1 && u <= 81 && v >= 1 && v <= 81 && u !== v) {
      const uNode = this.allNodes.get(u);
      if (uNode && uNode.getConnections().includes(v)) {
        return true;
      }
    }
    return false;
  }

  printEdges() {
    // print all edges
    for (let [idx, node] of this.allNodes) {
      for (let con of node.getConnections()) {
        console.log(`${node.getID()} --> ${this.allNodes.get(con).getID()}`);
      }
    }
  }

  getNode(idx) {
    if (this.allNodes.has(idx)) {
      return this.allNodes.get(idx);
    }
    return null;
  }

  getAllNodesIds() {
    return this.allNodes.keys();
  }

  DFS(start) {
    // start is an id of the start node
    const visited = new Array(Graph.totalV).fill(false);

    if (this.allNodes.has(start)) {
      this.__DFSUtility(start, visited);
    } else {
      console.log("Start Node not found");
    }
  }

  __DFSUtility(node_id, visited) {
    visited = this.__setVisitedTrue(visited, node_id);
    // Print
    console.log(this.allNodes.get(node_id).getID());

    // Recursive Stack
    for (let i of this.allNodes.get(node_id).getConnections()) {
      if (!visited[i]) {
        this.__DFSUtility(i, visited);
      }
    }
  }

  BFS(start) {
    // start is an id of the start node
    const visited = new Array(Graph.totalV).fill(false);
    const queue = [];

    if (this.allNodes.has(start)) {
      this.__BFSUtility(start, visited);
    } else {
      console.log("Start Node not found");
    }
  }

  __BFSUtility(node_id, visited) {
    const queue = [];
    visited = this.__setVisitedTrue(visited, node_id);

    queue.push(node_id);

    while (queue.length !== 0) {
      const x = queue.shift();
      // Print
      console.log(this.allNodes.get(x).getID());

      for (let i of this.allNodes.get(x).getConnections()) {
        const idx = i;
        if (!visited[idx]) {
          queue.push(idx);
          visited = this.__setVisitedTrue(visited, idx);
        }
      }
    }
  }

  __setVisitedTrue(visited, node_id) {
    // Utility function for BFS and DFS
    // Through this function we will set visited[id] = true
    visited[node_id] = true;
    return visited;
  }
}
