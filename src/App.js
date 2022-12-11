import { useEffect, useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useReactFlow,
  addEdge
} from 'reactflow';

import 'reactflow/dist/style.css';

const kGraph = {

  nodes: [
    {id: 1, name: 'Amygdala'},
    {id: 2, name: 'Olfactory bulb'},
    {id: 3, name: 'Prefrontal cortex'},
    {id: 4, name: 'Lateral parabrachial nucleus'},
    {id: 5, name: 'Hypothalamus'},
    {id: 6, name: 'Nucleus accumbens'},
    {id: 7, name: 'Thalamus'},
    {id: 8, name: 'Insular cortex'},
    {id: 9, name: 'Anterior cingulate cortex'},
    {id: 10, name: 'Hippocampus'},
    {id: 11, name: 'Primary somatosensory cortex'},
    {id: 12, name: 'Secondary somatosensory cortex'},
    {id: 13, name: 'Spinal trigeminal nucleus'},
    {id: 14, name: 'Solitary nucleus'},
    {id: 15, name: 'Spinal cord'},
    {id: 16, name: 'Primary visual cortex'},
    {id: 17, name: 'Primary auditory cortex'},
  ],

  edges: [
    {id: 1, sourceId: 2, destinationId: 1},
    {id: 2, sourceId: 3, destinationId: 1},
    {id: 3, sourceId: 4, destinationId: 1},
    {id: 4, sourceId: 1, destinationId: 3},
    {id: 5, sourceId: 1, destinationId: 4},
    {id: 6, sourceId: 1, destinationId: 5},
    {id: 7, sourceId: 1, destinationId: 6},
    {id: 8, sourceId: 7, destinationId: 3},
    {id: 9, sourceId: 8, destinationId: 3},
    {id: 10, sourceId: 9, destinationId: 3},
    {id: 11, sourceId: 10, destinationId: 3},
    {id: 12, sourceId: 3, destinationId: 7},
    {id: 13, sourceId: 3, destinationId: 8},
    {id: 14, sourceId: 3, destinationId: 9},
    {id: 15, sourceId: 3, destinationId: 10},
    {id: 16, sourceId: 7, destinationId: 11},
    {id: 17, sourceId: 7, destinationId: 12},
    {id: 18, sourceId: 11, destinationId: 7},
    {id: 19, sourceId: 12, destinationId: 7},
    {id: 20, sourceId: 13, destinationId: 7},
    {id: 21, sourceId: 14, destinationId: 7},
    {id: 22, sourceId: 15, destinationId: 7},
    {id: 23, sourceId: 16, destinationId: 7},
    {id: 24, sourceId: 17, destinationId: 7},
    {id: 25, sourceId: 7, destinationId: 16},
    {id: 26, sourceId: 7, destinationId: 17},
  ]
};

function getNode(nodeId) {

  let result = null;

  for (let node of kGraph.nodes) {
    if (node.id === nodeId) {
      result = node;
      break
    }
  }

  return result;
}

function getSourceNodes(nodeId) {

  let sourceNodes = [];

  kGraph.edges.forEach((edge) => {
    if (edge.destinationId === nodeId) {
      kGraph.nodes.forEach((node) => {
        if (node.id === edge.sourceId) {
          sourceNodes.push(node);
        }
      })
    }
  })

  sourceNodes.sort((a, b) => {
    let fa = a.name.toLowerCase(),
        fb = b.name.toLowerCase();

    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
  });

  return sourceNodes
}

function getDestinationNodes(nodeId) {

  let destinationNodes = [];

  kGraph.edges.forEach((edge) => {
    if (edge.sourceId === nodeId) {
      kGraph.nodes.forEach((node) => {
        if (node.id === edge.destinationId) {
          destinationNodes.push(node);
        }
      })
    }
  })

  destinationNodes.sort((a, b) => {
    let fa = a.name.toLowerCase(),
        fb = b.name.toLowerCase();

    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
  });

  return destinationNodes
}

function generateNodes(baseNode, sourceNodes, destinationNodes) {

  let nodes = {
    baseNode: {
      id: '1',
      data: {label: baseNode.name},
      position: { x: 0, y: 0 },
      targetPosition: 'left',
      sourcePosition: 'right',
      width: 1000
    },
    sourceNodes: [],
    destinationNodes: []
  };

  let currentId = 2;
  let currentY = sourceNodes.length % 2 === 0
    ? sourceNodes.length / 2 * -100 + 50
    : (sourceNodes.length - 1) / 2 * -100
  ;

  for (let sourceNode of sourceNodes) {
    nodes.sourceNodes.push({
      id: currentId.toString(),
      data: {label: sourceNode.name},
      position: { x: -400, y: currentY },
      targetPosition: 'right',
      sourcePosition: 'right',
      width: 1000
    })
    currentId++
    currentY += 100;
  }

  currentY = destinationNodes.length % 2 === 0
    ? destinationNodes.length / 2 * -100 + 50
    : (destinationNodes.length - 1) / 2 * -100
  ;

  for (let destinationNode of destinationNodes) {
    nodes.destinationNodes.push({
      id: currentId.toString(),
      data: {label: destinationNode.name},
      position: { x: 400, y: currentY },
      targetPosition: 'left',
      sourcePosition: 'left',
      width: 1000
    })
    currentId++
    currentY += 100;
  }

  return nodes
}

function transformNodes(nodes) {

  let transformedNodes = [];

  transformedNodes.push(nodes.baseNode)

  for (let sourceNode of nodes.sourceNodes) {
    transformedNodes.push(sourceNode)
  }

  for (let destinationNode of nodes.destinationNodes) {
    transformedNodes.push(destinationNode)
  }

  return transformedNodes
}

function generateEdges(transformedNodes) {

  let edges = [];

   for (let sourceNode of transformedNodes.sourceNodes) {
    edges.push({
      id: `e${sourceNode.id}-${baseNode.id}`,
      source: sourceNode.id.toString(),
      target: baseNode.id.toString(),
      animated: true
    })
  }

  for (let destinationNode of transformedNodes.destinationNodes) {
    edges.push({
      id: `e${baseNode.id}-${destinationNode.id}`,
      source: baseNode.id.toString(),
      target: destinationNode.id.toString(),
      animated: true
    })
  }

  return edges

}

let baseNodeId = 1;
let baseNode = getNode(baseNodeId);
let sourceNodes = getSourceNodes(baseNodeId);
let destinationNodes = getDestinationNodes(baseNodeId);

const rawNodes = generateNodes(baseNode, sourceNodes, destinationNodes);
const initialNodes = transformNodes(rawNodes);
const initialEdges = generateEdges(rawNodes);

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const { setCenter } = useReactFlow();

  useEffect(() => {
    setCenter(0, 0, {'zoom': 1});
  }, [setCenter]);

  useEffect(() => {

    const updateNodes = (event) => {

      let nodeName = event.target.textContent;
      let baseNodeId = null;

      for (let node of kGraph.nodes) {
        if (node.name === nodeName) {
          baseNodeId = node.id;
        }
      }

      let baseNode = getNode(baseNodeId);
      let sourceNodes = getSourceNodes(baseNodeId);
      let destinationNodes = getDestinationNodes(baseNodeId);

      const rawNodes = generateNodes(baseNode, sourceNodes, destinationNodes);
      const initialNodes = transformNodes(rawNodes);
      const initialEdges = generateEdges(rawNodes);

      setNodes(initialNodes);
      setEdges(initialEdges);

      setCenter(0, 0, {'zoom': 1});

    };

    const updateEdges = (event) => {

      let nodeIds = event.target.parentNode.attributes[3].nodeValue.match(/\d+/g);
      let sourceId = nodeIds[0];
      let destinationId = nodeIds[1];

    };

    let allNodes = document.querySelectorAll('.react-flow__node');

    for (let i=0; i < allNodes.length; i++) {
      allNodes[i].onclick = updateNodes;
    }

    let allEdges = document.querySelectorAll('.react-flow__edge');

    for (let i=0; i < allEdges.length; i++) {
      allEdges[i].onclick = updateEdges;
    }

  }, [nodes, setNodes, setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  );
}

function FlowWithProvider(props) {
  return (
    <ReactFlowProvider>
      <Flow {...props} />
    </ReactFlowProvider>
  );
}

export default FlowWithProvider;