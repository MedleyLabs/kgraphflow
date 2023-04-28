import React, {useEffect, useMemo, useState} from 'react';
import {useReactFlow, useNodesState, useEdgesState} from 'reactflow';

import FlowWithSidebar from '../FlowWithSidebar.js';
import SidebarHeader from '../SidebarHeader.js';
import RotatableNode from '../RotatableNode.js';
import ConditionContent from '../custom/NetworkContent.js';

import generateConnectomeWheel from '../../flow/generateConnectomeWheel.js'

import {networkData} from '../../data/networkData.js';

function FlowConnectomeView(props) {

    const networks = props.networkIndices.map(idx => networkData[idx]);
    const [activeNetworks, setActiveNetworks] = useState([]);
    const [sidebarContent, setSidebarContent] = useState(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const [highlightNodeId, setHighlightNodeId] = useState(null);

    const nodeTypes = useMemo(() => ({rotatableNode: RotatableNode}), []);

    const {fitView, zoomOut} = useReactFlow();

    useEffect(() => {

        let mergedNetwork = generateConnectomeWheel(networks);
        setNodes(mergedNetwork.nodes);
        setEdges(mergedNetwork.edges);

        setSidebarContent(<ConditionContent
            setView={props.setView}
            networks={networks}
            activeNetworks={activeNetworks}
            setActiveNetworks={setActiveNetworks}
        />);

    }, [props.networkIndices])

    useEffect(() => {

        setSidebarContent(<ConditionContent
            setView={props.setView}
            networks={networks}
            activeNetworks={activeNetworks}
            setActiveNetworks={setActiveNetworks}
        />);

    }, [activeNetworks])

    useEffect(() => {

        if (activeNetworks.length === 1 && activeNetworks[0] === 'reset') {
            setActiveNetworks([]);
            return;
        }

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

    const sidebarHeader = <SidebarHeader
        isBackActive={props.isBackActive}
        goBack={props.goBack}
        isForwardActive={props.isForwardActive}
        goForward={props.goForward}
    />

    return (
        <FlowWithSidebar
            sidebarHeader={sidebarHeader}
            sidebarContent={sidebarContent}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
        />
    );
}

export default FlowConnectomeView;
