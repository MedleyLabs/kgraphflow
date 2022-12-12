import kGraph from './kGraph.js';
import getEntity from './getEntity.js';
import alphabetize from '../util/alphabetize.js';

function getOutputEntities(entityId, sort = true) {

  let outputEntities = [];

  kGraph.relations.forEach( (relation) => {
    if (relation.sourceId === entityId) {
      let outputEntity = getEntity(relation.targetId);
      outputEntities.push(outputEntity);
    }
  });

  if (sort) {
    outputEntities.sort((a, b) => alphabetize(a, b));
  }

  return outputEntities;
}

export default getOutputEntities;
