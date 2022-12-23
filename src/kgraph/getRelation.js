import KGraphNeuro from '../data/kGraphNeuro.js';

function getRelation(sourceEntityId, targetEntityId) {

  let result = null;

  for (let relation of KGraphNeuro.relations) {
    if (relation.sourceId === sourceEntityId && relation.targetId === targetEntityId) {
      result = relation;
      break;
    }
  }

  return result;
}

export default getRelation;
