import {useEffect, useCallback, useState} from 'react';
import ReactFlow, {
  Controls,
  Background,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useReactFlow,
  addEdge,
} from 'reactflow';

import Sidebar from "./Sidebar";

import 'reactflow/dist/style.css';
import './sidebar.css'

const kGraph = {

  nodes: [
    { id: 1,
      name: 'Amygdala',
      locationDescription: 'The amygdala is one of two almond-shaped clusters of nuclei located deep and medially within the temporal lobes.',
      functionDescription: 'The amygdala performs a primary role in the processing of memory, decision making, and emotional responses (including fear, anxiety, and aggression).',
    },
    {
      id: 2,
      name: 'Olfactory bulb',
      locationDescription: '',
      functionDescription: '',
    },
    {
      id: 3,
      name: 'Prefrontal cortex',
      locationDescription: 'The prefrontal cortex is the front part of the frontal lobe of the cerebral cortex.',
      functionDescription: 'The basic activity of the prefrontal cortex is considered to be orchestration of thoughts and actions in accordance with internal goals.',
    },
    {
      id: 4,
      name: 'Lateral parabrachial nucleus',
      locationDescription: '',
      functionDescription: '',
    },
    {
      id: 5,
      name: 'Hypothalamus',
      locationDescription: '',
      functionDescription: '',
    },
    {
      id: 6,
      name: 'Nucleus accumbens',
      locationDescription: '',
      functionDescription: '',
    },
    {
      id: 7,
      name: 'Thalamus',
      locationDescription: 'The thalamus is a paired structure of gray matter located in the forebrain.',
      functionDescription: 'The thalamus has several functions, such as the relaying of sensory signals, including motor signals to the cerebral cortex and the regulation of consciousness, sleep, and alertness.',
    },
    {
      id: 8,
      name: 'Insular cortex',
      locationDescription: '',
      functionDescription: '',
    },
    {
      id: 9,
      name: 'Anterior cingulate cortex',
      locationDescription: '',
      functionDescription: '',
    },
    {
      id: 10,
      name: 'Hippocampus',
      locationDescription: '',
      functionDescription: '',
    },
    {
      id: 11,
      name: 'Primary somatosensory cortex',
      locationDescription: '',
      functionDescription: '',
    },
    {
      id: 12,
      name: 'Secondary somatosensory cortex',
      locationDescription: '',
      functionDescription: '',
    },
    {
      id: 13,
      name: 'Spinal trigeminal nucleus',
      locationDescription: '',
      functionDescription: '',
    },
    {
      id: 14,
      name: 'Solitary nucleus',
      locationDescription: '',
      functionDescription: '',
    },
    {
      id: 15,
      name: 'Spinal cord',
      locationDescription: '',
      functionDescription: '',
    },
    {
      id: 16,
      name: 'Primary visual cortex',
      locationDescription: '',
      functionDescription: '',
    },
    {
      id: 17,
      name: 'Primary auditory cortex',
      locationDescription: '',
      functionDescription: '',
    },
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
  ],

};

function getKGraphNode(nodeId) {

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

function generateNodesDict(baseNode, sourceNodes, destinationNodes) {

  const defaultNodeWidth = 220;

  let nodes = {
    baseNode: {
      id: '1',
      data: {label: baseNode.name},
      position: { x: 0, y: 0 },
      targetPosition: 'left',
      sourcePosition: 'right',
      style: {width: defaultNodeWidth, borderColor: 'black'}
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
      style: {width: defaultNodeWidth, borderColor: 'black'}
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
      style: {width: defaultNodeWidth, borderColor: 'black'}
    })
    currentId++
    currentY += 100;
  }

  return nodes
}

function generateNodes(nodesDict) {

  let nodes = [];

  nodes.push(nodesDict.baseNode)

  for (let sourceNode of nodesDict.sourceNodes) {
    nodes.push(sourceNode)
  }

  for (let destinationNode of nodesDict.destinationNodes) {
    nodes.push(destinationNode)
  }

  return nodes
}

function generateEdges(nodesDict) {

  let edges = [];

   for (let sourceNode of nodesDict.sourceNodes) {
    edges.push({
      id: `e${sourceNode.id}-${nodesDict.baseNode.id}`,
      source: sourceNode.id.toString(),
      target: nodesDict.baseNode.id.toString(),
      animated: true
    })
  }

  for (let destinationNode of nodesDict.destinationNodes) {
    edges.push({
      id: `e${nodesDict.baseNode.id}-${destinationNode.id}`,
      source: nodesDict.baseNode.id.toString(),
      target: destinationNode.id.toString(),
      animated: true
    })
  }

  return edges

}

function Flow() {

  const defaultBaseNodeId = 1;
  const defaultZoom = 0.9;
  const defaultXOffset = 100;

  const [baseNode, setBaseNode] = useState(getKGraphNode(defaultBaseNodeId));
  const [sourceNodes, setSourceNodes] = useState(getSourceNodes(defaultBaseNodeId));
  const [destinationNodes, setDestinationNodes] = useState(getDestinationNodes(defaultBaseNodeId));

  const nodesDict = generateNodesDict(baseNode, sourceNodes, destinationNodes);
  const initialNodes = generateNodes(nodesDict);
  const initialEdges = generateEdges(nodesDict);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const { setCenter } = useReactFlow();

  useEffect(() => {
    setCenter(defaultXOffset, 0, {'zoom': defaultZoom});
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

      let baseNode = getKGraphNode(baseNodeId);
      let sourceNodes = getSourceNodes(baseNodeId);
      let destinationNodes = getDestinationNodes(baseNodeId);

      const nodesDict = generateNodesDict(baseNode, sourceNodes, destinationNodes);
      const initialNodes = generateNodes(nodesDict);
      const initialEdges = generateEdges(nodesDict);

      setBaseNode(baseNode);
      setNodes(initialNodes);
      setSourceNodes(sourceNodes);
      setDestinationNodes(destinationNodes);
      setEdges(initialEdges);

      setCenter(defaultXOffset, 0, {zoom: defaultZoom})

    };

    const examineEdge = (event) => {

      let nodeIds = event.target.parentNode.attributes[3].nodeValue.match(/\d+/g);
      let sourceId = nodeIds[0];
      let destinationId = nodeIds[1];

      for (let node of nodes) {
        node.style.borderColor = 'black';
      }

      let nodesCopy = JSON.parse(JSON.stringify(nodes));

      for (let node of nodesCopy) {
        if (node.id === sourceId) {
          node.style.borderColor = 'red';
          break
        }
      }

      for (let node of nodesCopy) {
        if (node.id === destinationId) {
          node.style.borderColor = 'red';
          node.name = 'AOHJAIOSA'
          break
        }
      }

      console.log('nodes', nodesCopy)

      setNodes(nodesCopy);

      setCenter(defaultXOffset, 0, {zoom: defaultZoom})

    };

    let allNodes = document.querySelectorAll('.react-flow__node');

    for (let i=0; i < allNodes.length; i++) {
      allNodes[i].onclick = updateNodes;
    }

    let allEdges = document.querySelectorAll('.react-flow__edge');

    for (let i=0; i < allEdges.length; i++) {
      allEdges[i].onclick = examineEdge;
    }

  }, [nodes, setNodes, setEdges]);

  return (
    <div className="reactflow-wrapper">
      <Sidebar
        header={baseNode.name}
        locationDescription={baseNode.locationDescription}
        functionDescription={baseNode.functionDescription}
      />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

function FlowWithProvider(props) {
  return (
    <div className="dndflow">
      <ReactFlowProvider>
          <Flow {...props} />
      </ReactFlowProvider>
    </div>
  );
}

export default FlowWithProvider;