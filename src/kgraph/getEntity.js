import KGraphNeuro from '../data/kGraphNeuro.js';
import getElementById from '../util/getElementById.js';

function getEntity(entityId) {
  return getElementById(KGraphNeuro.entities, entityId);
}

export default getEntity;
