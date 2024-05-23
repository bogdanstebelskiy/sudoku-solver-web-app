import { Graph, Node } from "../graph";

test("AddNode", () => {
  const graph = new Graph();
  const node = new Node(1, 255);

  graph.addNode(node);
  graph.addNode(new Node(2, 32));
  expect(graph.getAllNodesIds()).toEqual([1]);
});
