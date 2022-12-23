import {useCallback, useEffect, useState} from 'react';
import {addEdge, useEdgesState, useNodesState, useReactFlow} from 'reactflow';

import NeuralRegionContent from '../custom/NeuralRegionContent';
import NeuralPathwayContent from '../custom/NeuralPathwayContent.js';

import getEntity from '../../kgraph/getEntity.js';
import getEntityByName from '../../kgraph/getEntityByName.js';
import getInputEntities from '../../kgraph/getInputEntities.js';
import getOutputEntities from '../../kgraph/getOutputEntities.js';

import generateNetwork from '../../flow/generateNetwork.js';
import getNode from '../../flow/getNode.js';
import getEdge from '../../flow/getEdge.js';

import extractDigits from '../../util/extractDigits.js';

import '../../styles/sidebar.css';
import SidebarFlow from "../SidebarFlow";

function InputOutputView(props) {

  const defaultBaseEntityId = 1;
  const defaultZoom = 0.9;
  const defaultXOffset = 0;
  const defaultYOffset = 0;

  const [baseEntity, setBaseEntity] = useState(getEntity(defaultBaseEntityId));
  const [inputEntities, setInputEntities] = useState(getInputEntities(defaultBaseEntityId));
  const [outputEntities, setOutputEntities] = useState(getOutputEntities(defaultBaseEntityId));
  const [sidebarContent, setSidebarContent] = useState(<NeuralRegionContent header={baseEntity.name} content={baseEntity.content}/>);

  const [initialNodes, initialEdges] = generateNetwork(baseEntity, inputEntities, outputEntities);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const { setCenter } = useReactFlow();

  const updateNodes = (name) => {

    let newBaseEntity = getEntityByName(name);
    let newInputEntities = getInputEntities(newBaseEntity.id);
    let newOutputEntities = getOutputEntities(newBaseEntity.id);

    setBaseEntity(newBaseEntity);
    setInputEntities(newInputEntities);
    setOutputEntities(newOutputEntities);

    const [newNodes, newEdges] = generateNetwork(newBaseEntity, newInputEntities, newOutputEntities);

    setNodes(newNodes);
    setEdges(newEdges);

    setSidebarContent(<NeuralRegionContent header={newBaseEntity.name} content={newBaseEntity.content}/>);

    setCenter(defaultXOffset, defaultYOffset, {zoom: defaultZoom});

  };

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

      setSidebarContent(<NeuralRegionContent header={newBaseEntity.name} content={newBaseEntity.content}/>);

      setCenter(defaultXOffset, defaultYOffset, {zoom: defaultZoom});

    };

    const examineEdge = (event) => {

      let [sourceNodeId, targetNodeId] = extractDigits(event.target.parentNode.attributes[3].nodeValue);

      let sourceNode = getNode(nodes, sourceNodeId);
      let targetNode = getNode(nodes, targetNodeId);
      let edge = getEdge(edges, sourceNodeId, targetNodeId);

      for (let node of nodes) {
        node.style.borderColor = 'black';
        node.style.borderWidth = '1px';
      }

      sourceNode.style.borderColor = '#4285F4';
      sourceNode.style.borderWidth = '2px';
      targetNode.style.borderColor = '#4285F4';
      targetNode.style.borderWidth = '2px';


      setNodes(JSON.parse(JSON.stringify(nodes)));

      setSidebarContent(
        <NeuralPathwayContent
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

  }, [nodes]);

  return (
    <SidebarFlow
      nodes={nodes}
      edges={edges}
      sidebarContent={sidebarContent}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      viewType={props.viewType}
      setViewTypeCallback={props.setViewTypeCallback}
    />
  );
}

export default InputOutputView;
