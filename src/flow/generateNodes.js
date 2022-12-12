function generateNodes(baseNode, sourceNodes, targetNodes) {

  let nodes = [baseNode];

  for (let sourceNode of sourceNodes) {
    nodes.push(sourceNode);
  }

  for (let targetNode of targetNodes) {
    nodes.push(targetNode);
  }

  return nodes;
}

export default generateNodes;
