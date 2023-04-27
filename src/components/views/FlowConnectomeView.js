import React, {useEffect, useMemo, useState} from 'react';
import ReactFlow, {Background, Controls, useEdgesState, useNodesState, useReactFlow} from 'reactflow';
import styled from 'styled-components';

import generateConnectomeWheel from '../../flow/generateConnectomeWheel.js'

import Sidebar from '../Sidebar.js';
import ConditionContent from '../custom/NetworkContent.js';
import RotatableNode from '../RotatableNode.js';

import HomeIcon from '../svg/HomeIcon.js'

import {networkData} from '../../data/networkData.js';

const SidebarHeaderContainer = styled.div`
  height: 60px;
  -webkit-user-select: none; /* Disable text selection for Safari */
  -moz-user-select: none; /* Disable text selection for Firefox */
  -ms-user-select: none; /* Disable text selection for Internet Explorer/Edge */
  user-select: none; /* Disable text selection for other browsers */
`

const TutorialLink = styled.a`
  position: absolute;
  top: 19px;
  left: 70px;
  color: #404040;
  font-family: Nunito, sans-serif;
  font-size: 19px;

  :hover {
    color: dodgerblue;
  }
`

function FlowConnectomeView(props) {

    const [networks, setNetworks] = useState([networkData[props.initialIdx || 0]]);
    const [activeNetworks, setActiveNetworks] = useState([]);
    const [sidebarContent, setSidebarContent] = useState(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const [highlightNodeId, setHighlightNodeId] = useState(null);

    const nodeTypes = useMemo(() => ({rotatableNode: RotatableNode}), []);

    const {fitView, zoomOut} = useReactFlow();

    useEffect(() => {

        let network = generateConnectomeWheel(networks.length === 1 ? networks : networkData);
        setNodes(network.nodes);
        setEdges(network.edges);

        setSidebarContent(<ConditionContent
            networks={networks}
            setNetworks={setNetworks}
            activeNetworks={activeNetworks}
            setActiveNetworks={setActiveNetworks}
            content={{}}
        />);

    }, [networks])

    useEffect(() => {

        setSidebarContent(<ConditionContent
            networks={networks}
            setNetworks={setNetworks}
            activeNetworks={activeNetworks}
            setActiveNetworks={setActiveNetworks}
            content={{}}
        />);
    }, [activeNetworks])

    useEffect(() => {

        const unhighlightedNodes = nodes.map(node => {
            return {
                ...node,
                style: {...node.style, color: '#404040'},
                data: {...node.data, label: node.abbreviation, style: {...node.data.style, borderColor: 'lightgray'}}
            };
        });

        const unhighlightedEdges = edges.map(edge => {
            return {...edge, style: {...edge.style, stroke: 'lightgray'}};
        });

        if (nodes.length > 0) {
            setNodes(unhighlightedNodes);
            setEdges(unhighlightedEdges);
        }

        for (let network of networks) {

            if (activeNetworks.includes(network.id)) {

                let nodeIds = [];
                let edgeIds = [];

                if (activeNetworks.length === 2) {
                    let sharedNodes = networks[0].nodes.filter(nodeA => networks[1].nodes.some(nodeB => nodeA.id === nodeB.id))
                    nodeIds = sharedNodes.map(n => n.id)

                    let sharedEdges = networks[0].edges.filter(edgeA => networks[1].edges.some(edgeB => (edgeA.source === edgeB.source && edgeA.target === edgeB.target)))

                    for (let sharedEdge of sharedEdges) {
                        for (let e of unhighlightedEdges) {
                            if (sharedEdge.source === e.source && sharedEdge.target === e.target) {
                                edgeIds.push({source: e.source, target: e.target})
                            }
                        }
                    }
                } else {
                    nodeIds = network.nodes.map(n => n.id)
                    edgeIds = network.edges.map(e => ({source: e.source, target: e.target}))
                }

                const highlightedNodes = unhighlightedNodes.map(node => {
                    if (!nodeIds.includes(node.id)) return {
                        ...node,
                        style: {...node.style, color: '#404040'},
                        data: {
                            ...node.data,
                            label: node.abbreviation,
                            style: {...node.data.style, borderColor: 'lightgray'}
                        }
                    };

                    return {
                        ...node,
                        style: {...node.style, color: 'dodgerblue'},
                        data: {...node.data, label: node.name, style: {...node.data.style, borderColor: 'dodgerblue'}}
                    };
                });

                const highlightedEdges = unhighlightedEdges.map(edge => {
                    if (!edgeIds.some((edgeId) => edgeId.source === edge.source && edgeId.target === edge.target)) return {
                        ...edge,
                        style: {...edge.style, stroke: 'lightgray'}
                    };
                    return {...edge, style: {...edge.style, stroke: 'dodgerblue'}};
                });

                setNodes(highlightedNodes);
                setEdges(highlightedEdges);
            }
        }

    }, [activeNetworks]);

    useEffect(() => {

        let currentNodes = document.querySelectorAll('.react-flow__node');

        for (let node of currentNodes) {

            let child = node.childNodes[0];

            child.onmouseenter = (event) => {
                if (activeNetworks.length > 0) return;
                let nodeId = event.target.parentNode.dataset.id;
                setHighlightNodeId(nodeId);
            };

            child.onmouseleave = () => {
                if (activeNetworks.length > 0) return;
                setHighlightNodeId(null);
            };
        }

        fitView();
        zoomOut();
        zoomOut();
        zoomOut();
        zoomOut();

    }, [nodes]);

    useEffect(() => {

        const unhighlightedNodes = nodes.map(node => {
            return {
                ...node,
                style: {...node.style, color: '#404040'},
                data: {...node.data, label: node.abbreviation, style: {...node.data.style, borderColor: 'lightgray'}}
            };
        });

        const unhighlightedEdges = edges.map(edge => {
            return {...edge, style: {...edge.style, stroke: 'lightgray'}};
        });

        if (!highlightNodeId) {
            if (nodes.length > 0) {
                setNodes(unhighlightedNodes);
                setEdges(unhighlightedEdges);
            }
            return
        }

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
                return {
                    ...node,
                    style: {...node.style, color: 'dodgerblue'},
                    data: {...node.data, label: node.name, style: {...node.data.style, borderColor: 'dodgerblue'}}
                };
            }
            return node;
        });
        setNodes(updatedNodes);

        const updatedEdges = unhighlightedEdges.map(edge => {
            if ((edgeIdsToHighlight.includes(edge.id))) {
                return {...edge, style: {...edge.style, stroke: 'dodgerblue'}};
            }
            return edge;
        });
        setEdges(updatedEdges);

    }, [highlightNodeId])

    const SidebarHeader = () => (
        <SidebarHeaderContainer>
            <a href={process.env.REACT_APP_ROOT_URL}><HomeIcon/></a>
            <TutorialLink href="https://youtube.com" target="_blank">Tutorial</TutorialLink>
        </SidebarHeaderContainer>
    )

    return (
        <div className='reactflow-wrapper'>
            <Sidebar header={<SidebarHeader/>} content={sidebarContent}/>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
            >
                <Controls/>
                <Background/>
            </ReactFlow>
        </div>
    );
}

export default FlowConnectomeView;
