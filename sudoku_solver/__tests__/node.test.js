import { Node } from "../graph";

test("AddNeighbour", () => {
  const node1 = new Node(1);
  const node2 = new Node(2);
  node1.addNeighbour(node2);
  expect(node1.connectedTo.has(2)).toBeTruthy();
});

test("SetData", () => {
  const node = new Node(1);
  node.setData(255);
  expect(node.data).toBe(255);
});

test("GetConnections", () => {
  const node1 = new Node(1);
  const node2 = new Node(2);
  node1.addNeighbour(node2);
  expect(node1.getConnections()).toEqual([2]);
});

test("GetID", () => {
  const node = new Node(1);
  expect(node.getID()).toBe(1);
});

test("GetData", () => {
  const node = new Node(1, 255);
  expect(node.getData()).toBe(255);
});

