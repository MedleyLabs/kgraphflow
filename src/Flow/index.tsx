import { useCallback } from 'react';
import ReactFlow, {
  Node,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
} from 'reactflow';

import CustomNode from './CustomNode';

// this is important! You need to import the styles from the lib to make it work
import 'reactflow/dist/style.css';

import './Flow.css';

const nodeTypes = {
  custom: CustomNode,
};

console.log('Trigemino-parabrachio-amygdaloid pathway')

const graph: {[index: string]:any} = {
  'Caudal part of spinal trigeminal nucleus': {
    'inputs': ['Trigeminal ganglion', 'Nucleus of tractus solitarius'],
    'outputs': ['Ventral posteromedial nucleus of thalamus']
  },
  'Lateral parabrachial nucleus': {
    'inputs': ['Nodose ganglion'],
    'outputs': ['Periaqueductal gray', 'Lateral hypothalamus']
  },
  'Central nucleus of amygdala': {
    'inputs': ['Basolateral nucleus of amygdala'],
    'outputs': ['Nucleus accumbens', 'Lateral hypothalamus', 'Anterior cingulate cortex', 'Orbitofrontal cortex', 'Prefrontal cortex']
  }
};

let id: number = 0;
let x: number = 0;
let y: number = 0;

let initialNodes: Node[] = [];
let initialEdges: Edge[] = [];

for (let key in graph) {

  console.log('key:', key);

  let value = graph[key];
  let inputs = value['inputs'];
  let outputs = value['outputs'];

  let currentId: number = id;

  initialNodes.push({
    id: currentId.toString(),
    data: { label: key },
    position: { x: x, y: y },
  });

  id += 1;

  let currentY: number = y + (inputs.length/2 * 100);

  inputs.forEach( (input: string) => {

    console.log('input:', input);

    initialNodes.push({
      id: id.toString(),
      data: { label: input },
      position: { x: -200, y: currentY },
    });

    id += 1;
    currentY -= 100

    initialEdges.push({
      id: `s${id.toString()}-t${currentId.toString()}`,
      source: id.toString(),
      target: currentId.toString(),
      animated: true
    });

  });

  currentY = y;

  outputs.forEach( (output: any) => {

    console.log('output:', output);

    initialEdges.push({
      id: 'e1-2',
      source: '1',
      target: '2',
      animated: true
    });

    id += 1;

  });

  y += 100;

}

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="Flow">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
      />
    </div>
  );
}

export default Flow;
