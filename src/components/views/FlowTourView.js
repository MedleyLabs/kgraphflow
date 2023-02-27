import {useEffect, useState} from 'react';

import Button from '../Button.js';
import SidebarSection from '../SidebarSection.js';
import extractDigits from '../../util/extractDigits.js';

import {theories} from '../../data/theoriesData.js';
import ReactFlow, {Background, Controls, useEdgesState, useNodesState, useReactFlow} from "reactflow";
import Sidebar from "../Sidebar";
import Comment from "../Comment";
import ChatIcon from '../../assets/chat-icon.svg'

function FlowTourView(props) {

    const [scene, setScene] = useState(theories[0]);
    const [stepNumber, setStepNumber] = useState(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [sidebarContent, setSidebarContent] = useState(null);

    // const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
    const {fitView} = useReactFlow();

    const backCallback = () => {
        if (stepNumber === 1) {
            setStepNumber(null);
        } else {
            setStepNumber(stepNumber - 1);
        }
    };

    const nextCallback = () => {
        if (!stepNumber) {
            setStepNumber(1)
        } else if (stepNumber < scene.steps.length) {
            setStepNumber(stepNumber + 1);
        } else {
            setStepNumber(null);
        }
    };

    const finishCallback = () => {
        setStepNumber(null);
    };

    useEffect(() => {

        setNodes(scene.nodes);
        setEdges(scene.edges);

        let allNodes = document.querySelectorAll('.react-flow__node');

        let currentSteps = scene.steps;
        let currentStep = currentSteps[stepNumber - 1];

        for (let node of allNodes) {
            let nodeId = node.attributes[2].value;
            if (!stepNumber) {
                node.style.borderColor = 'gray';
                node.style.borderWidth = '1px';
                node.style.opacity = 1;
            } else if (currentStep.nodeIds.includes(nodeId)) {
                node.style.borderColor = '#4285F4';
                node.style.borderWidth = '2px';
                node.style.opacity = 1;
            } else {
                node.style.borderColor = 'gray';
                node.style.borderWidth = '1px';
                node.style.opacity = 0.5;
            }
        }

        let allEdges = document.querySelectorAll('.react-flow__edge');

        for (let edge of allEdges) {
            let edgeId = edge.attributes[3].value;
            let [sourceNodeId, targetNodeId] = extractDigits(edgeId);
            edgeId = `e${sourceNodeId}-${targetNodeId}`
            if (!stepNumber) {
                edge.style.opacity = 1;
            } else if (currentStep.edgeIds.includes(edgeId)) {
                edge.style.opacity = 1;
            } else {
                edge.style.opacity = 0.7;
            }
        }

        setSidebarContent(
            <>
                <div className='content-header'>♻️ Theory Tour</div>
                <div className='content-body'>Thalamocortical dysrhythmia model of chronic orofacial pain</div>
                <div className='sidebar-body'>
                    {!stepNumber
                        ? <Button onClick={nextCallback}>Start Tour</Button>
                        : (stepNumber !== currentSteps.length)
                            ? (<>
                                <Button onClick={() => {
                                    backCallback()
                                }} style={{width: 100}}>Back</Button>
                                <Button onClick={() => {
                                    nextCallback()
                                }} style={{width: 100}}>Next</Button>
                                <Button onClick={() => {
                                    nextCallback()
                                }} style={{width: 100}}>End</Button>
                            </>)
                            : (<>
                                <Button onClick={() => {
                                    backCallback()
                                }} style={{width: 100}}>Back</Button>
                                <Button onClick={() => {
                                    finishCallback()
                                }} style={{width: 100}}>End</Button>
                            </>)
                    }
                    {currentStep ? <div className='content-h2'>Claims</div> : null}
                    {currentStep?.claims.map((item) => (
                        <SidebarSection
                            title={item.title}
                            description={item.description}
                            suppressIcon={true}
                            footer={
                                <>
                                    <div style={{paddingTop: 8}}>
                                        <img src={ChatIcon} style={{width: 14, height: 14, paddingRight: 2, position: 'relative', top: 2}}/>
                                        <span>{item.comments.length}</span>
                                    </div>
                                </>
                            }
                        />
                    ))}
                    {/*<div className='content-h2'>Discourse</div>*/}
                    {/*{ currentStep?.comments.map((item) => (*/}
                    {/*    <Comment*/}
                    {/*        text={item.text}*/}
                    {/*        user={item.user}*/}
                    {/*        time={item.time}*/}
                    {/*        upvotes={item.upvotes}*/}
                    {/*        downvotes={item.downvotes}*/}
                    {/*        replies={item.replies}*/}
                    {/*    />*/}
                    {/*))}*/}
                </div>
            </>
        )

    }, [stepNumber]);

    return (
        <div className='reactflow-wrapper'>
            <Sidebar content={sidebarContent}/>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                // onConnect={onConnect}
                fitView
            >
                <Controls/>
                <Background/>
            </ReactFlow>
        </div>
    );

}

export default FlowTourView;
