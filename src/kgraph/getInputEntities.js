import KGraphNeuro from '../data/kGraphNeuro.js';
import getEntity from './getEntity.js';
import alphabetize from '../util/alphabetize.js';

function getInputEntities(entityId, sort = true) {

  let inputEntities = [];

  KGraphNeuro.relations.forEach( (relation) => {
    if (relation.targetId === entityId) {
      let inputEntity = getEntity(relation.sourceId);
      inputEntities.push(inputEntity);
    }
  })

  if (sort) {
    inputEntities.sort( (a, b) => alphabetize(a, b));
  }

  return inputEntities;
}

export default getInputEntities;
