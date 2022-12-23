import {useCallback, useEffect, useState} from 'react';
import ReactFlow, {addEdge, Background, useEdgesState, useNodesState, useReactFlow} from 'reactflow';

import Sidebar from '../Sidebar.js';
import ExtendedControls from '../ExtendedControls.js';
import GuidedTourContent from '../custom/GuidedTourContent.js';

import extractDigits from '../../util/extractDigits.js';

import '../../styles/sidebar.css';

import {initialNodes, initialEdges, walkthroughSteps} from '../../data/ChronicOrofacialPain.js';
import SidebarFlow from "../SidebarFlow";

function WalkthroughView(props) {

  const defaultZoom = 0.9;
  const defaultXOffset = 300;
  const defaultYOffset = 250;

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [stepNumber, setStepNumber] = useState(0);

  const backCallback = () => {
    let newStepNumber = stepNumber > 0 ? stepNumber - 1 : 0;
    setStepNumber(newStepNumber);
  };

  const nextCallback = () => {
    let newStepNumber = stepNumber < walkthroughSteps.length ? stepNumber + 1 : stepNumber;
    setStepNumber(newStepNumber);
  };

  const finishCallback = () => {
    setStepNumber(0);
  };

  const [sidebarContent, setSidebarContent] = useState(
    <GuidedTourContent
      stepNumber={stepNumber}
      title={'Title'}
      description={'Description'}
      backCallback={backCallback}
      nextCallback={nextCallback}
    />
  );

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const { setCenter } = useReactFlow();

  useEffect(() => {
    setCenter(defaultXOffset, defaultYOffset, {'zoom': defaultZoom});
  }, [setCenter]);

  useEffect(() => {

    let allNodes = document.querySelectorAll('.react-flow__node');

    for (let currentNode of allNodes) {
      let currentNodeId = currentNode.attributes[2].value
      if ( stepNumber === 0 ) {
        currentNode.style.borderColor = 'black';
        currentNode.style.borderWidth = '1px';
        currentNode.style.opacity = 1;
      } else if ( walkthroughSteps[stepNumber-1].nodeIds.includes(currentNodeId) ) {
        currentNode.style.borderColor = '#4285F4';
        currentNode.style.borderWidth = '2px';
        currentNode.style.opacity = 1;
      } else {
        currentNode.style.borderColor = 'black';
        currentNode.style.borderWidth = '1px';
        currentNode.style.opacity = 0.3;
      }
    }

    let allEdges = document.querySelectorAll('.react-flow__edge');

    for (let currentEdge of allEdges) {
      let currentEdgeId = currentEdge.attributes[3].value;
      let [sourceNodeId, targetNodeId] = extractDigits(currentEdgeId);
      currentEdgeId = `e${sourceNodeId}-${targetNodeId}`
      if ( stepNumber === 0 ) {
        currentEdge.style.opacity = 1;
      } else if ( walkthroughSteps[stepNumber-1].edgeIds.includes(currentEdgeId) ) {
        currentEdge.style.opacity = 1;
      } else {
        currentEdge.style.opacity = 0.5;
      }
    }

    const currentStep = stepNumber > 0 ? walkthroughSteps[stepNumber-1] : null

    setSidebarContent(
      <GuidedTourContent
        stepNumber={stepNumber}
        totalSteps={walkthroughSteps.length}
        title={currentStep ? currentStep.title : 'Overview'}
        description={currentStep ? currentStep.description : 'Chronic orofacial pain is thought to originate from a thalamocortical dysrhythmia. <a href="">[1]</a><a href="">[2]</a><a href="">[3]</a>\\n\\nNociceptive neurons of the spinal trigeminal nucleus exhibit infra-slow calcium bursting, likely due to activation of local glial cells. <a href="">[4]</a><a href="">[5]</a>'}
        backCallback={backCallback}
        nextCallback={nextCallback}
        finishCallback={finishCallback}
      />
    )

  }, [stepNumber]);

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

export default WalkthroughView;
