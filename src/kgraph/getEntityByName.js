import kGraph from './kGraph.js';

function getEntityByName(entityName) {

  let result = null;

  for (let entity of kGraph.entities) {
    if (entity.name === entityName) {
        result = entity;
        break;
    }
  }

  return result;
}

export default getEntityByName;
