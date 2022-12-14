import {useCallback, useEffect, useState} from 'react';
import ReactFlow, {addEdge, Background, Controls, useEdgesState, useNodesState, useReactFlow} from 'reactflow';
import getEntity from '../kgraph/getEntity.js';
import getInputEntities from '../kgraph/getInputEntities.js';
import getOutputEntities from '../kgraph/getOutputEntities.js';
import NodeContent from './NodeContent.js';
import generateNetwork from '../flow/generateNetwork.js';
import getNode from '../flow/getNode.js';
import getEdge from '../flow/getEdge.js';
import EdgeContent from './EdgeContent.js';
import Sidebar from './Sidebar.js';
import getEntityByName from '../kgraph/getEntityByName.js';
import extractDigits from '../util/extractDigits.js';

function Flow() {

  const defaultBaseEntityId = 1;
  const defaultZoom = 0.9;
  const defaultXOffset = 0;
  const defaultYOffset = 0;

  const [baseEntity, setBaseEntity] = useState(getEntity(defaultBaseEntityId));
  const [inputEntities, setInputEntities] = useState(getInputEntities(defaultBaseEntityId));
  const [outputEntities, setOutputEntities] = useState(getOutputEntities(defaultBaseEntityId));
  const [sidebarContent, setSidebarContent] = useState(<NodeContent header={baseEntity.name} content={baseEntity.content}/>);

  const [initialNodes, initialEdges] = generateNetwork(baseEntity, inputEntities, outputEntities);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const { setCenter } = useReactFlow();

  useEffect(() => {
    setCenter(defaultXOffset, defaultYOffset, {'zoom': defaultZoom});
  }, [setCenter]);

  useEffect(() => {

    const updateNodes = (event) => {

      let newBaseEntity = getEntityByName(event.target.textContent);
      let newInputEntities = getInputEntities(newBaseEntity.id);
      let newOutputEntities = getOutputEntities(newBaseEntity.id);

      setBaseEntity(newBaseEntity);
      setInputEntities(newInputEntities);
      setOutputEntities(newOutputEntities);

      const [newNodes, newEdges] = generateNetwork(newBaseEntity, newInputEntities, newOutputEntities);

      setNodes(newNodes);
      setEdges(newEdges);

      setSidebarContent(<NodeContent header={newBaseEntity.name} content={newBaseEntity.content}/>);

      setCenter(defaultXOffset, defaultYOffset, {zoom: defaultZoom});

    };

    const examineEdge = (event) => {

      let [sourceNodeId, targetNodeId] = extractDigits(event.target.parentNode.attributes[3].nodeValue);

      let sourceNode = getNode(nodes, sourceNodeId);
      let targetNode = getNode(nodes, targetNodeId);
      let edge = getEdge(edges, sourceNodeId, targetNodeId);

      for (let node of nodes) {
        node.style.borderColor = 'black';
      }

      sourceNode.style.borderColor = 'red';
      targetNode.style.borderColor = 'red';

      setNodes(JSON.parse(JSON.stringify(nodes)));

      setSidebarContent(
        <EdgeContent
          sourceName={sourceNode.name}
          targetName={targetNode.name}
          description={edge.description}
        />
      );

      setCenter(defaultXOffset, 0, {zoom: defaultZoom});

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
    <div className='reactflow-wrapper'>
      <Sidebar content={sidebarContent}/>
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

export default Flow;
