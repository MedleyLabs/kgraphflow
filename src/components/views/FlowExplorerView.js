import {useCallback, useEffect, useMemo, useState} from 'react';
import ReactFlow, {addEdge, Background, Controls, useEdgesState, useNodesState, useReactFlow} from 'reactflow';

import extractDigits from "../../util/extractDigits";
import generateNetwork from '../../flow/generateNetwork.js';
import generateSubnetwork from "../../flow/generateSubnetwork";
import getEdge from "../../flow/getEdge";
import getNode from "../../flow/getNode";

import TextImageNode from "../TextImageNode";

import ExamineModal from "../ExamineModal";
import Sidebar from '../Sidebar.js';
import NeuralRegionContent from '../custom/NeuralRegionContent';
import NeuralPathwayContent from '../custom/NeuralPathwayContent.js';

const findNode = (nodes, nodeId) => {
    if (typeof (nodeId) !== "string") {
        nodeId = nodeId.toString();
    }
    return nodes.find(d => d.id === nodeId);
};

function FlowExplorerView(props) {

    const [baseEntity, setBaseEntity] = useState('Amygdala');
    const [viewData, setViewData] = useState(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [sidebarContent, setSidebarContent] = useState(null);
    const [childrenActive, setChildrenActive] = useState(false);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
    const {fitView} = useReactFlow();

    const nodeTypes = useMemo(() => ({textImage: TextImageNode}), []);

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
            if (!node.connectable && childrenActive && (node.id === nodeId || nodeIdsToHighlight.includes(node.id))) {
                return {...node, style: {...node.style, border: "2px solid dodgerblue"}};
            }
            return node;
        });
        setNodes(updatedNodes);

        const updatedEdges = edges.map(edge => {
            if ((childrenActive && edgeIdsToHighlight.includes(edge.id))) {
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

    const examineNode = (event) => {

        const [initialNodes, initialEdges] = generateSubnetwork(viewData);

        setNodes(initialNodes);
        setEdges(initialEdges);
        setChildrenActive(true);

        setSidebarContent(<NeuralRegionContent
            header={baseEntity}
            content={{
                'arterialSupply': viewData.arterial_supply,
                'children': viewData.children.map(child => child.name),
                'parents': viewData.parents,
            }}
            setBaseEntity={setBaseEntity}
        />);
    }

    const jumpNode = (data) => {

        const [initialNodes, initialEdges] = generateSubnetwork(data);

        setNodes(initialNodes);
        setEdges(initialEdges);
        setChildrenActive(true);

        setSidebarContent(<NeuralRegionContent
            header={data.name}
            content={{
                'arterialSupply': data.arterial_supply,
                'children': data.children.map(child => child.name),
                'parents': data.parents,
            }}
            setBaseEntity={setBaseEntity}
        />);
    }

    const navigateToNode = (event) => {
        let newBaseEntity = event.target.textContent;
        setBaseEntity(newBaseEntity);
        setChildrenActive(false);
    }

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
                sourceName='Prefrontal Cortex'
                targetName='Amygdala'
                description='Evidence from imaging and lesion studies to support the role of the ventromedial prefrontal cortex (vmPFC) as a moderator and inhibitor of the amygdala. <a href="">[1]</a><a href="">[2]</a>'
                // sourceName={sourceNode.name}
                // targetName={targetNode.name}
                // description={edge.description}
            />
        );
    }

    useEffect(() => {

        const updateNodes = async (entityName) => {

            try {
                const response = await fetch('http://localhost:5000/get_data', {
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

                const [initialNodes, initialEdges] = generateNetwork(entityName, data.receives_input_from, data.sends_output_to, data.children);

                setNodes(initialNodes);
                setEdges(initialEdges);
                setSidebarContent(<NeuralRegionContent
                    header={baseEntity}
                    content={{
                        'arterialSupply': data.arterial_supply,
                        'children': data.children.map(child => child.name),
                        'parents': data.parents,
                    }}
                    setBaseEntity={setBaseEntity}
                />);

            } catch (error) {
                console.error('Error:', error);
                throw error;
            }
        }

        updateNodes(baseEntity)

    }, [baseEntity]);

    useEffect(() => {
        let currentNodes = document.querySelectorAll('.react-flow__node');

        const highlightNodes = (event) => {
            unhighlightNodeBorders()
            let nodeId = event.target.dataset.id;
            highlightNodeBorder(nodeId)
        };

        const unhighlightNodes = (event) => {
            let nodeId = event.target.dataset.id;
            unhighlightNodeBorders(nodeId)
        }

        for (let node of currentNodes) {
            if (node.textContent === baseEntity) {
                node.onclick = examineNode;
            } else if (viewData.children.some(child => child.name === node.textContent)) {
                node.onclick = () => {
                    let child = viewData.children.find(child => child.name === node.textContent)
                    setViewData(child);
                    jumpNode(child);
                }
            } else {
                node.onclick = navigateToNode;
            }
            node.onmouseenter = highlightNodes;
            node.onmouseleave = unhighlightNodes;
        }

        fitView();
    }, [nodes])

    useEffect(() => {
        let currentEdges = document.querySelectorAll('.react-flow__edge');

        for (let edge of currentEdges) {
            edge.onclick = examineEdge;
        }
    }, [edges])


    return (
        <div className='reactflow-wrapper'>
            <Sidebar content={sidebarContent}/>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
            >
                <Controls/>
                <Background/>
            </ReactFlow>
        </div>
    );
}

export default FlowExplorerView;
