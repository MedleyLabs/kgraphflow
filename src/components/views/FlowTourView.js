import {useEffect, useState} from 'react';

import Button from '../Button.js';
import SidebarSection from '../SidebarSection.js';
import extractDigits from '../../util/extractDigits.js';

import {theories} from '../../data/theoriesData.js';
import ReactFlow, {Background, Controls, useEdgesState, useNodesState} from "reactflow";
import Sidebar from "../Sidebar";
import ChatIcon from '../../assets/chat-icon.svg'

function FlowTourView() {

    const [scene, setScene] = useState(theories[0]);
    const [stepNumber, setStepNumber] = useState(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [sidebarContent, setSidebarContent] = useState(null);
    const [highlightNodeId, setHighlightNodeId] = useState(null);

    // const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

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
                node.style.borderColor = 'lightgray';
                node.style.borderWidth = '1.5px';
                node.style.opacity = 1;
            } else if (currentStep.nodeIds.includes(nodeId)) {
                node.style.borderColor = 'dodgerblue';
                node.style.borderWidth = '1.5px';
                node.style.opacity = 1;
            } else {
                node.style.borderColor = 'lightgray';
                node.style.borderWidth = '1.5px';
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
                edge.firstChild.style.stroke = 'lightgray';
                edge.firstChild.style.strokeWidth = 1.5;
            } else if (currentStep.edgeIds.includes(edgeId)) {
                edge.style.opacity = 1;
                edge.firstChild.style.stroke = 'dodgerblue';
                edge.firstChild.style.strokeWidth = 1.5;
            } else {
                edge.style.opacity = 0.7;
                edge.firstChild.style.stroke = 'lightgray';
                edge.firstChild.style.strokeWidth = 1.5;
            }
        }

        setSidebarContent(
            <>
                <div className='content-header'>♻️ Theory Tour</div>
                <div className='content-body'>{scene.name}</div>
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
                                    finishCallback()
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
                    {currentStep ? <div className='content-h2'>Claims</div> : (
                        <>
                            <div className='content-h2'>Overview</div>
                            <div>Chronic pain is defined as pain which lasts for 3 months or longer, and it can be intermittent or continuous. Physical, psychological, and environmental factors can affect the experience of chronic pain.</div>
                            <br/>
                            <div>Orofacial pain is that which affects the upper neck and front of the head. These regions receive innervation from the cranial nerves rather than the spinal nerves, and this difference changes which neural circuits are affected.</div>
                            <br/>
                            <div>It causes downstream changes in the following dimensions:</div>
                            <ul>
                                <li>Sensory-discriminative</li>
                                <li>Affective-motivational</li>
                                <li>Cognitive-evaluative</li>
                            </ul>
                            <div>The effects on the nervous system are summarized in the flowchart to the right. You can go through an explanation of the different parts and how they relate to each other by clicking on the Start Tour button above.</div>
                        </>
                    )}
                    {currentStep?.claims.map((item) => (
                        <SidebarSection
                            title={item.title}
                            description={item.description}
                            suppressIcon={true}
                            footer={
                                <>
                                    <div style={{paddingTop: 8}}>
                                        <img src={ChatIcon} style={{width: 14, height: 14, paddingRight: 2, position: 'relative', top: 2}} alt="Chat icon"/>
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

    useEffect(() => {

        let currentNodes = document.querySelectorAll('.react-flow__node');

        for (let node of currentNodes) {

            if (node.textContent === "") continue;

            node.onmouseenter = (event) => {
                let nodeId = event.target.dataset.id;
                setHighlightNodeId(nodeId);
            };

            node.onmouseleave = () => {
                setHighlightNodeId(null);
            };
        }

    }, [nodes])

    useEffect(() => {

        const unhighlightedNodes = nodes.map(node => {
            return {...node, style: {...node.style, border: "1.5px solid lightgray"}};
        });

        const unhighlightedEdges = edges.map(edge => {
            return {...edge, style: {...edge.style, stroke: 'lightgray', strokeWidth: 1.5}};
        });

        if (!highlightNodeId) {
            if (unhighlightedNodes.length > 0) {
                setNodes(unhighlightedNodes);
                setEdges(unhighlightedEdges);
            }
            return
        };

        let nodeIdsToHighlight = new Set();
        let edgeIdsToHighlight = new Set();

        nodeIdsToHighlight.add(highlightNodeId)

        for (let edge of unhighlightedEdges) {
            if (edge.source === highlightNodeId) {
                nodeIdsToHighlight.add(edge.target);
                edgeIdsToHighlight.add(edge.id);
            }
            if (edge.target === highlightNodeId) {
                nodeIdsToHighlight.add(edge.source);
                edgeIdsToHighlight.add(edge.id);
            }
        }

        nodeIdsToHighlight = Array.from(nodeIdsToHighlight);
        edgeIdsToHighlight = Array.from(edgeIdsToHighlight);

        const updatedNodes = unhighlightedNodes.map(node => {
            if (nodeIdsToHighlight.includes(node.id)) {
                return {...node, style: {...node.style, border: "1.5px solid dodgerblue"}};
            }
            return node;
        });
        setNodes(updatedNodes);

        const updatedEdges = unhighlightedEdges.map(edge => {
            if ((edgeIdsToHighlight.includes(edge.id))) {
                return {...edge, style: {...edge.style, stroke: 'dodgerblue', strokeWidth: 1.5}};
            }
            return edge;
        });
        setEdges(updatedEdges);

    }, [nodes, highlightNodeId])

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
