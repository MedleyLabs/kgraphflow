import kGraph from '../data/kGraph.js';

function getRelation(sourceEntityId, targetEntityId) {

  let result = null;

  for (let relation of kGraph.relations) {
    if (relation.sourceId === sourceEntityId && relation.targetId === targetEntityId) {
      result = relation;
      break;
    }
  }

  return result;
}

export default getRelation;
