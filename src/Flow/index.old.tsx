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

const initialNodes: Node[] = [
  {
    id: '1',
    data: { label: 'Caudal part of the spinal trigeminal nucleus' },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: { label: 'Ventral posteromedial nucleus' },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: { label: 'Lateral parabrachial nucleus' },
    position: { x: 400, y: 100 },
  },
  {
    id: '4',
    data: { label: 'Primary somatosensory cortex' },
    position: { x: -100, y: 200 },
  },
  {
    id: '5',
    data: { label: 'Secondary somatosensory cortex' },
    position: { x: 100, y: 200 },
  },
  {
    id: '6',
    data: { label: 'Posterior insular cortex' },
    position: { x: 300, y: 200 },
  },
  {
    id: '7',
    data: { label: 'Central nucleus of amygdala' },
    position: { x: 500, y: 200 },
  },
  {
    id: '8',
    data: { label: 'Anterior insular cortex' },
    position: { x: 300, y: 300 },
  },
  {
    id: '9',
    data: { label: 'Anterior cingulate cortex' },
    position: { x: 500, y: 300 },
  },
  {
    id: '10',
    data: { label: 'Prefrontal cortex' },
    position: { x: 0, y: 400 },
  },
  {
    id: '11',
    data: { label: 'Periaqueductal gray' },
    position: { x: 0, y: 500 },
  },
  {
    id: '12',
    data: { label: 'Rostroventral medulla' },
    position: { x: 0, y: 600 },
  },
  {
    id: '13',
    data: { label: 'Nucleus of tractus solitarius' },
    position: { x: 100, y: -100 },
  },
  {
    id: '14',
    data: { label: 'Trigeminal ganglion' },
    position: { x: 400, y: -100 },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e2-4', source: '2', target: '4', animated: true },
  { id: 'e2-5', source: '2', target: '5', animated: true },
  { id: 'e2-6', source: '2', target: '6', animated: true },
  { id: 'e4-5', source: '4', target: '5', animated: true },
  { id: 'e5-4', source: '5', target: '4', animated: true },
  { id: 'e3-7', source: '3', target: '7', animated: true },
  { id: 'e6-8', source: '6', target: '8', animated: true },
  { id: 'e6-9', source: '6', target: '9', animated: true },
  { id: 'e7-9', source: '7', target: '9', animated: true },
  { id: 'e8-9', source: '8', target: '9', animated: true },
  { id: 'e4-10', source: '4', target: '10', animated: true },
  { id: 'e6-10', source: '6', target: '10', animated: true },
  { id: 'e8-10', source: '8', target: '10', animated: true },
  { id: 'e9-10', source: '9', target: '10', animated: true },
  { id: 'e10-11', source: '10', target: '11', animated: true },
  { id: 'e11-12', source: '11', target: '12', animated: true },
  { id: 'e12-1', source: '12', target: '1', animated: true },
  { id: 'e13-1', source: '13', target: '1', animated: true },
  { id: 'e9-11', source: '9', target: '11', animated: true },
  { id: 'e14-1', source: '14', target: '1', animated: true },
  { id: 'e14-3', source: '14', target: '3', animated: true },
  { id: 'e7-3', source: '7', target: '3', animated: true },
];

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
