import findAll from '../util/findAll.js';
import getNode from './getNode.js';
import KGraphNeuro from '../data/kGraphNeuro.js';

function generateChildren(parentNodeId) {

  let parentNode = getNode(parentNodeId);
  let childNodes = findAll(KGraphNeuro.hierarchicalRelations, 'parentId', parentNodeId);

  return childNodes;

}

export default generateChildren;
