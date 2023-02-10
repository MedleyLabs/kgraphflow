import {useEffect, useState} from 'react';

import Button from '../Button.js';
import SidebarSection from '../SidebarSection.js';
import extractDigits from '../../util/extractDigits.js';

import {scenes} from '../../data/ChronicOrofacialPain.js';
import ReactFlow, {Background, Controls, useEdgesState, useNodesState, useReactFlow} from "reactflow";
import Sidebar from "../Sidebar";

function FlowVisualizerView(props) {

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [sidebarContent, setSidebarContent] = useState(null);
  const [xOffset, setXOffset] = useState(0);
  const [yOffset, setYOffset] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  // const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  const { setCenter } = useReactFlow();

  setCenter(xOffset, yOffset, {'zoom': zoomLevel});

  const [tourIsActive, setTourIsActive] = useState(false);
  const [sceneNumber, setSceneNumber] = useState(0);
  const [stepNumber, setStepNumber] = useState(0);

  const backCallback = () => {

    if (sceneNumber === 0 && stepNumber === 0) {
      setTourIsActive(false);
    } else {
      let newStepNumber = stepNumber > 0 ? stepNumber - 1 : 0;
      setStepNumber(newStepNumber);
    }
  };

  const nextCallback = () => {

    let currentScene = scenes[sceneNumber];
    let currentSteps = currentScene.steps;

    if ( stepNumber < currentSteps.length - 1 ) {
      setStepNumber(stepNumber + 1);
    } else {
      if (sceneNumber < scenes.length - 1) {
        setSceneNumber(sceneNumber + 1);
        setStepNumber(0);
      }
    }
  };

  const finishCallback = () => {
    setTourIsActive(false);
    setSceneNumber(0);
    setStepNumber(0);
  };

  useEffect(() => {

    setNodes(scenes[0].nodes);
    setEdges(scenes[0].edges);
    setZoomLevel(0.9);
    setXOffset(300);
    setYOffset(250);

    let allNodes = document.querySelectorAll('.react-flow__node');

    let currentScene = scenes[sceneNumber];
    let currentSteps = currentScene.steps;
    let currentStep = currentSteps[stepNumber];

    for (let node of allNodes) {
      let nodeId = node.attributes[2].value;
      if ( !tourIsActive ) {
        node.style.borderColor = 'black';
        node.style.borderWidth = '1px';
        node.style.opacity = 1;
      } else if ( currentStep.nodeIds.includes(nodeId) ) {
        node.style.borderColor = '#4285F4';
        node.style.borderWidth = '2px';
        node.style.opacity = 1;
      } else {
        node.style.borderColor = 'black';
        node.style.borderWidth = '1px';
        node.style.opacity = 0.3;
      }
    }

    let allEdges = document.querySelectorAll('.react-flow__edge');

    for (let edge of allEdges) {
      let edgeId = edge.attributes[3].value;
      let [sourceNodeId, targetNodeId] = extractDigits(edgeId);
      edgeId = `e${sourceNodeId}-${targetNodeId}`
      if ( !tourIsActive ) {
        edge.style.opacity = 1;
      } else if ( currentStep.edgeIds.includes(edgeId) ) {
        edge.style.opacity = 1;
      } else {
        edge.style.opacity = 0.5;
      }
    }

    setSidebarContent(
        <>
          <div className='content-header'>♻️ Guided Tour</div>
          <div className='content-body'>Chronic Orofacial Pain</div>
          <div className='content-body' style={{fontStyle: 'italic'}}>Disclaimer: This tour only shows currently known, major neural regions and connections implicated in chronic orofacial pain and does not show all relevant brain regions and connections.</div>
          <div className='sidebar-body'>
            {!tourIsActive
                ? <Button onClick={() => { setTourIsActive(true); }}>Start Tour</Button>
                : (sceneNumber === scenes.length - 1 && stepNumber !== currentSteps.length - 1)
                    ? (<>
                      <Button onClick={() => { backCallback() }} style={{width: 100}}>Back</Button>
                      <Button onClick={() => { nextCallback() }} style={{width: 100}}>Next</Button>
                    </>)
                    : (<>
                      <Button onClick={() => { backCallback() }} style={{width: 100}}>Back</Button>
                      <Button onClick={() => { finishCallback() }} style={{width: 100}}>Finish</Button>
                    </>)
            }
            <SidebarSection
                title={tourIsActive ? currentStep.title : 'Overview'}
                description={tourIsActive ? currentStep.description : 'Chronic orofacial pain is thought to originate from a thalamocortical dysrhythmia. <a href="">[1]</a><a href="">[2]</a><a href="">[3]</a>\\n\\nNociceptive neurons of the spinal trigeminal nucleus exhibit infra-slow calcium bursting, likely due to activation of local glial cells. <a href="">[4]</a><a href="">[5]</a>'}
            />
          </div>
        </>
    )

  }, [tourIsActive, sceneNumber, stepNumber]);

  return (
      <div className='reactflow-wrapper'>
        <Sidebar content={sidebarContent} />
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            // onConnect={onConnect}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
  );

}

export default FlowVisualizerView;
