import {useEffect, useMemo, useState} from 'react';
import ReactFlow, {Background, Controls, useEdgesState, useNodesState, useReactFlow} from 'reactflow';

import generateSubnetwork from "../../flow/generateSubnetwork";

import InfoAvailableNode from "../InfoAvailableNode";
import Sidebar from '../Sidebar.js';
import NeuralRegionContent from '../custom/NeuralRegionContent';

import TaxonomyWheel from "taxonomy-wheel";
import taxonomy from "../../data/taxonomyData";

function FlowExplorerView(props) {

    const [baseEntity, setBaseEntity] = useState('Amygdala');
    const [viewData, setViewData] = useState(null);
    const [sidebarContent, setSidebarContent] = useState(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const nodeTypes = useMemo(() => ({infoAvailableNode: InfoAvailableNode}), []);

    const {fitView} = useReactFlow();

    const highlightNodeBorder = (nodeId) => {
        nodeId = String(nodeId)

        let nodeIdsToHighlight = new Set();
        let edgeIdsToHighlight = new Set();

        for (let edge of edges) {
            if (edge.source === nodeId) {
                nodeIdsToHighlight.add(edge.target);
                edgeIdsToHighlight.add(edge.id);
            }
            if (edge.target === nodeId) {
                nodeIdsToHighlight.add(edge.source);
                edgeIdsToHighlight.add(edge.id);
            }
        }

        nodeIdsToHighlight = Array.from(nodeIdsToHighlight);
        edgeIdsToHighlight = Array.from(edgeIdsToHighlight);

        const updatedNodes = nodes.map(node => {
            if (viewData.children.length > 0 && (node.id === nodeId || nodeIdsToHighlight.includes(node.id))) {
                return {...node, style: {...node.style, border: "2px solid dodgerblue"}};
            }
            return node;
        });
        setNodes(updatedNodes);

        const updatedEdges = edges.map(edge => {
            if ((viewData.children.length > 0 && edgeIdsToHighlight.includes(edge.id))) {
                return {...edge, style: {...edge.style, stroke: 'dodgerblue', strokeWidth: 2}};
            }
            return edge;
        });
        setEdges(updatedEdges);
    };

    const unhighlightNodeBorders = () => {
        const updatedNodes = nodes.map(node => {
            return {...node, style: {...node.style, border: "1px solid gray"}};
        });
        setNodes(updatedNodes);

        const updatedEdges = edges.map(edge => {
            return {...edge, style: {...edge.style, stroke: '#b1b1b7', strokeWidth: 1}};
        });
        setEdges(updatedEdges);
    };

    const navigateToNode = (event) => {
        let newBaseEntity = event.target.textContent;
        setBaseEntity(newBaseEntity);
    }

    useEffect(() => {

        const updateNodes = async (entityName) => {

            try {
                const response = await fetch('http://localhost:5000/fma/get_data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        entity_name: entityName
                    })
                });

                const data = await response.json();

                setViewData(data);

                const [initialNodes, initialEdges] = generateSubnetwork(data);

                setNodes(initialNodes);
                setEdges(initialEdges);
                setSidebarContent(<NeuralRegionContent
                    header={baseEntity}
                    content={{
                        'arterialSupply': data.arterial_supply,
                        'children': data.children.map(child => child.name),
                        'parents': data.parents,
                        'cellTypes': (
                            <>
                                Source: <a href="https://knowledge.brain-map.org/celltypes/CCN201912131" target="_blank">BICCN Human Primary Motor Cortex Mini-Atlas</a>
                                <br/><br/>
                                <TaxonomyWheel data={taxonomy} maxDepth={4} radius={150}/>
                            </>
                        ),
                    }}
                    setBaseEntity={setBaseEntity}
                />);

                // fitView()

            } catch (error) {
                console.error('Error:', error);
                throw error;
            }
        }

        updateNodes(baseEntity)

    }, [baseEntity]);

    useEffect(() => {

        console.log('BASE ENTITY', baseEntity)

        let currentNodes = document.querySelectorAll('.react-flow__node');
        console.log("CURRENT NDOES", currentNodes)

        const highlightNodes = (event) => {
            unhighlightNodeBorders()
            let nodeId = event.target.dataset.id;
            highlightNodeBorder(nodeId)
        };

        const unhighlightNodes = (event) => {
            unhighlightNodeBorders()
        }

        for (let node of currentNodes) {
            console.log('TEXT CONTENT', node.textContent)
            if (node.textContent === baseEntity) {
                node.onclick = null;
                node.onmouseenter = null;
                node.onmouseleave = null;
            } else if (viewData.children.some(child => child.name === node.textContent)) {
                node.onclick = navigateToNode;
                node.onmouseenter = highlightNodes;
                node.onmouseleave = unhighlightNodes;
            } else {
                node.onclick = navigateToNode;
                node.onmouseenter = highlightNodes;
                node.onmouseleave = unhighlightNodes;
            }
        }

        fitView()

    }, [nodes])

    return (
        <div className='reactflow-wrapper'>
            <Sidebar content={sidebarContent}/>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                panOnDrag={false}
                zoomOnScroll={false}
                zoomOnPinch={false}
                zoomOnDoubleClick={false}
            >
                {/*<Controls/>*/}
                <Background/>
            </ReactFlow>
        </div>
    );
}

export default FlowExplorerView;
