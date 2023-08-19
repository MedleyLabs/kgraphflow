import React, { useEffect, useState } from 'react';
import styled from "styled-components";

import Button from '../Button.js';
import SidebarSection from '../SidebarSection.js';
import extractDigits from '../../util/extractDigits.js';

import { theories } from '../../data/theoriesData.js';
import ReactFlow, {Background, Controls, useEdgesState, useNodesState, useReactFlow} from "reactflow";
import Sidebar from "../Sidebar";
import Comment from "../Comment";

const ActiveFlows = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
`

const FlowRow = styled.div`
  margin-bottom: 5px;
`

function FlowSelector(props) {

    return (
        <ActiveFlows>
            <FlowRow><div className='content-h2'>Theories</div></FlowRow>
            {props.flows.map((flow) => {
                return <FlowRow>{flow.name.substring(0, 45) + '...'}</FlowRow>;
            })}
        </ActiveFlows>
    );


}

function FlowVisualizerView(props) {

    const [flows, setFlows] = useState([theories[0]]);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [sidebarContent, setSidebarContent] = useState(null);

    useEffect(() => {

        let flowNodes = [];
        let flowEdges = [];

        for (let c of flows) {
            flowNodes.concat(c.nodes)
            flowEdges.concat(c.edges)
        }

        setNodes(flowNodes);
        setEdges(flowEdges);

        // let allNodes = document.querySelectorAll('.react-flow__node');
        //
        // let currentSteps = scene.steps;
        // let currentStep = currentSteps[stepNumber-1];
        //
        // for (let node of allNodes) {
        //     let nodeId = node.attributes[2].value;
        //     if (!stepNumber) {
        //         node.style.borderColor = 'gray';
        //         node.style.borderWidth = '1px';
        //         node.style.opacity = 1;
        //     } else if (currentStep.nodeIds.includes(nodeId)) {
        //         node.style.borderColor = '#4285F4';
        //         node.style.borderWidth = '2px';
        //         node.style.opacity = 1;
        //     } else {
        //         node.style.borderColor = 'gray';
        //         node.style.borderWidth = '1px';
        //         node.style.opacity = 0.5;
        //     }
        // }
        //
        // let allEdges = document.querySelectorAll('.react-flow__edge');
        //
        // for (let edge of allEdges) {
        //     let edgeId = edge.attributes[3].value;
        //     let [sourceNodeId, targetNodeId] = extractDigits(edgeId);
        //     edgeId = `e${sourceNodeId}-${targetNodeId}`
        //     if (!stepNumber) {
        //         edge.style.opacity = 1;
        //     } else if (currentStep.edgeIds.includes(edgeId)) {
        //         edge.style.opacity = 1;
        //     } else {
        //         edge.style.opacity = 0.7;
        //     }
        // }

        setSidebarContent(
            <>
                <div className='content-header'>♻️ Theory Tour</div>
                <FlowSelector flows={flows}/>
                <div className='sidebar-body'>
                    <div className='content-h2'>Claims</div>
                    { flows[0]?.nodes[0].claims.map((item) => (
                        <SidebarSection
                            title={item.title}
                            description={item.description}
                            suppressIcon={true}
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

    }, [flows]);

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

export default FlowVisualizerView;
