function getEdge(edges, sourceNodeId, targetNodeId) {

  let result = null;

  for (let edge of edges) {
    if (edge.source === sourceNodeId && edge.target === targetNodeId) {
      result = edge;
      break;
    }
  }

  return result;
}

export default getEdge;
