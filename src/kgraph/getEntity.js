import kGraph from './kGraph.js';
import getElement from '../util/getElement.js';

function getEntity(entityId) {
  return getElement(kGraph.entities, entityId);
}

export default getEntity;
