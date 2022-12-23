import KGraphNeuro from '../data/kGraphNeuro.js';

function getEntityByName(entityName) {

  let result = null;

  for (let entity of KGraphNeuro.entities) {
    if (entity.name === entityName) {
        result = entity;
        break;
    }
  }

  return result;
}

export default getEntityByName;
