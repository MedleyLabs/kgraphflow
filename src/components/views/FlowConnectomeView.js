import React, { useEffect, useMemo, useState } from 'react';
import { useReactFlow, useNodesState, useEdgesState } from 'reactflow';

import FlowWithSidebar from '../FlowWithSidebar.js';
import NetworkContent from '../custom/NetworkContent.js';
import RotatableNode from '../RotatableNode.js';

import generateConnectomeWheel from '../../flow/generateConnectomeWheel.js'

const FlowConnectomeView = ({ view, setView, networks, regions, coordinates }) => {

    console.log('FlowConnectomeView:', view, networks, regions, coordinates)

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [hoveredNodeId, setHoveredNodeId] = useState(null);
    const [sidebarContent, setSidebarContent] = useState(null);

    const nodeTypes = useMemo(() => ({rotatableNode: RotatableNode}), []);

    const {fitView, zoomOut} = useReactFlow();

    useEffect(() => {

        console.log('NETWORKS', networks)

        let mergedNetwork = generateConnectomeWheel(networks);

        setNodes(mergedNetwork.nodes);
        setEdges(mergedNetwork.edges);

        setSidebarContent(<NetworkContent
            view={view}
            setView={setView}
            networks={networks}
            regions={regions}
            coordinates={coordinates}
        />);

        const unhighlightedNodes = mergedNetwork.nodes.map(node => {
            return {
                ...node,
                style: {...node.style, color: '#404040'},
                data: {...node.data, label: node.abbreviation, style: {...node.data.style, borderColor: 'lightgray'}}
            };
        });

        const unhighlightedEdges = mergedNetwork.edges.map(edge => {
            return {
                ...edge,
                style: {...edge.style, stroke: 'lightgray'}
            };
        });

        if (nodes.length > 0) {
            setNodes(unhighlightedNodes);
            setEdges(unhighlightedEdges);
        }

        const activeNetworks = networks.filter(network => network.isActive);

        let sharedNodes = [];
        let sharedEdges = [];

        if (activeNetworks.length > 0) {
            sharedNodes = [...activeNetworks[0].nodes];
            sharedEdges = [...activeNetworks[0].edges];
        } else return;

        for (let i = 1; i < activeNetworks.length; i++) {
            const network = activeNetworks[i];

            sharedNodes = sharedNodes.filter(nodeA => network.nodes.some(nodeB => nodeA.id === nodeB.id));
            sharedEdges = sharedEdges.filter(edgeA => network.edges.some(edgeB => edgeA.source === edgeB.source && edgeA.target === edgeB.target));
        }

        const highlightedNodes = unhighlightedNodes.map(nodeA => {
            if (!sharedNodes.some(nodeB => nodeA.id === nodeB.id)) return {
                ...nodeA,
                style: {...nodeA.style, color: '#404040'},
                data: {
                    ...nodeA.data,
                    label: nodeA.abbreviation,
                    style: {...nodeA.data.style, borderColor: 'lightgray'}
                }
            };

            return {
                ...nodeA,
                style: {...nodeA.style, color: 'dodgerblue'},
                data: {...nodeA.data, label: nodeA.name, style: {...nodeA.data.style, borderColor: 'dodgerblue'}}
            };
        });

        const highlightedEdges = unhighlightedEdges.map(edgeA => {
            if (sharedEdges.some(edgeB => edgeA.source === edgeB.source && edgeA.target === edgeB.target)) return {
                ...edgeA,
                style: {...edgeA.style, stroke: 'dodgerblue'}
            };
            return {...edgeA, style: {...edgeA.style, stroke: 'lightgray'}};
        });

        setNodes(highlightedNodes);
        setEdges(highlightedEdges);

    }, [networks, regions, coordinates]);

    useEffect(() => {

        console.log("NODES")

        let currentNodes = document.querySelectorAll('.react-flow__node');

        for (let node of currentNodes) {

            let child = node.childNodes[0];

            child.onclick = (event) => {
                let nodeName = event.target.parentNode.attributes['aria-label'].nodeValue
                setView('flowExplorerView', {baseEntity: nodeName});
            };

            const activeNetworks = networks.filter(network => network.isActive);

            child.onmouseenter = (event) => {
                if (activeNetworks.length > 0) return;
                let nodeId = event.target.parentNode.dataset.id;
                setHoveredNodeId(nodeId);
            };

            child.onmouseleave = () => {
                if (activeNetworks.length > 0) return;
                setHoveredNodeId(null);
            };
        }

        fitView();
        zoomOut();
        zoomOut();
        zoomOut();
        zoomOut();

    }, [nodes]);

    useEffect(() => {

        console.log('HOVER ID')

        const unhighlightedNodes = nodes.map(node => {
            return {
                ...node,
                style: {...node.style, color: '#404040'},
                data: {...node.data, label: node.abbreviation, style: {...node.data.style, borderColor: 'lightgray'}}
            };
        });

        const unhighlightedEdges = edges.map(edge => {
            return {
                ...edge,
                style: {...edge.style, stroke: 'lightgray'}
            };
        });

        if (!hoveredNodeId) {
            if (nodes.length > 0) {
                setNodes(unhighlightedNodes);
                setEdges(unhighlightedEdges);
            }
            return
        }

        let nodeIdsToHighlight = new Set();
        let edgeIdsToHighlight = new Set();

        nodeIdsToHighlight.add(hoveredNodeId);

        for (let edge of unhighlightedEdges) {
            if (edge.source === hoveredNodeId) {
                nodeIdsToHighlight.add(edge.target);
                edgeIdsToHighlight.add(edge.id);
            }
            if (edge.target === hoveredNodeId) {
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

    }, [hoveredNodeId]);

    return (
        <FlowWithSidebar
            view={view}
            setView={setView}
            sidebarContent={sidebarContent}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            enableBackground={true}
        />
    );
};

export default FlowConnectomeView;
