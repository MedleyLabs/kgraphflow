import generateNodes from './generateNodes.js';
import generateEdges from './generateEdges.js';

function generateNetwork(baseEntity, inputEntities, outputEntities) {

  const defaultNodeWidth = 220;
  const defaultBaseNodeWidth = 220;
  const defaultEdgeWidth = 220;

  let baseNode = {
      id: '1',
      entityId: baseEntity.id,
      name: baseEntity.name,
      data: {label: baseEntity.name},
      position: { x: -defaultBaseNodeWidth/2, y: 0 },
      targetPosition: 'left',
      sourcePosition: 'right',
      style: {width: defaultBaseNodeWidth, borderColor: 'black'},
      content: baseEntity.content,
  };

  let sourceNodes = [];
  let targetNodes = [];

  let currentId = 2;
  let currentY = inputEntities.length % 2 === 0
    ? inputEntities.length / 2 * -100 + 50
    : (inputEntities.length - 1) / 2 * -100
  ;

  for (let inputEntity of inputEntities) {
    sourceNodes.push({
      id: currentId.toString(),
      entityId: inputEntity.id,
      name: inputEntity.name,
      data: {label: inputEntity.name},
      position: { x: -defaultBaseNodeWidth/2 - defaultNodeWidth - defaultEdgeWidth, y: currentY },
      targetPosition: 'right',
      sourcePosition: 'right',
      style: {width: defaultNodeWidth, borderColor: 'black'},
      content: inputEntity.content,
    });
    currentId++;
    currentY += 100;
  }

  currentY = outputEntities.length % 2 === 0
    ? outputEntities.length / 2 * -100 + 50
    : (outputEntities.length - 1) / 2 * -100
  ;

  for (let outputEntity of outputEntities) {
    targetNodes.push({
      id: currentId.toString(),
      entityId: outputEntity.id,
      name: outputEntity.name,
      data: {label: outputEntity.name},
      position: { x: defaultBaseNodeWidth/2 + defaultEdgeWidth, y: currentY },
      targetPosition: 'left',
      sourcePosition: 'left',
      style: {width: defaultNodeWidth, borderColor: 'black'},
      content: outputEntity.content,
    });
    currentId++;
    currentY += 100;
  }

    let nodes = generateNodes(baseNode, sourceNodes, targetNodes);
    let edges = generateEdges(baseNode, sourceNodes, targetNodes);

    // nodes.push({
    //   id: '100',
    //   entityId: 23,
    //   name: 'NAcc Core',
    //   data: {label: 'NAcc Core'},
    //   parentNode: '1',
    //   extent: 'parent',
    //   targetPosition: 'left',
    //   sourcePosition: 'right',
    //   position: { x: 90, y: 50 },
    //   style: {width: defaultNodeWidth, borderColor: 'black'},
    //   content: '',
    // })
    //
    // nodes.push({
    //   id: '101',
    //   entityId: 24,
    //   name: 'NAcc Shell',
    //   data: {label: 'NAcc Shell'},
    //   parentNode: '1',
    //   extent: 'parent',
    //   targetPosition: 'left',
    //   sourcePosition: 'right',
    //   position: { x: 90, y: 100 },
    //   style: {width: defaultNodeWidth, borderColor: 'black'},
    //   content: '',
    // })
    //
    // edges.push({
    //   id: `e1-100`,
    //   source: '1',
    //   target: '100',
    //   animated: true,
    //   description: 'TBD',
    // })

    return [nodes, edges];
}

export default generateNetwork;
