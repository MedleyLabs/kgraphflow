import kGraph from '../data/kGraph.js';
import getElementById from '../util/getElementById.js';

function getEntity(entityId) {
  return getElementById(kGraph.entities, entityId);
}

export default getEntity;
