import {useEffect, useMemo, useState} from 'react';
import ReactFlow, {Background, Controls, useEdgesState, useNodesState, useReactFlow} from 'reactflow';
import styled from "styled-components";

import generateSubnetwork from "../../flow/generateSubnetwork";

import InfoAvailableNode from "../InfoAvailableNode";
import Sidebar from '../Sidebar.js';
import NeuralRegionContent from '../custom/NeuralRegionContent';

import TaxonomyWheel from "taxonomy-wheel";
import taxonomy from "../../data/taxonomyData";

import HomeIcon from '../../components/HomeIcon.js'
import ArrowLeft from '../../components/ArrowLeft.js'
import ArrowRight from '../../components/ArrowRight.js'

const SidebarHeader = styled.div`
  -webkit-user-select: none; /* Disable text selection for Safari */
  -moz-user-select: none; /* Disable text selection for Firefox */
  -ms-user-select: none; /* Disable text selection for Internet Explorer/Edge */
  user-select: none; /* Disable text selection for other browsers */
`

const TutorialLink = styled.a`
  position: absolute;
  top: 18.5px;
  left: 141px;
  color: #404040;
  font-family: Nunito, sans-serif;
  font-size: 18px;
  
  :hover {
    color: dodgerblue;
  }
`

function FlowExplorerView(props) {

    const [baseEntity, setBaseEntity] = useState('Amygdala');
    const [viewData, setViewData] = useState(null);
    const [sidebarContent, setSidebarContent] = useState(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const [highlightNodeId, setHighlightNodeId] = useState(null);

    const [history, setHistory] = useState(['Amygdala']);
    const [currentHistoryIdx, setCurrentHistoryIdx] = useState(0);

    const nodeTypes = useMemo(() => ({infoAvailableNode: InfoAvailableNode}), []);

    const {fitView} = useReactFlow();

    const navigateToNode = (event) => {
        let newBaseEntity = event.target.attributes['aria-label'].nodeValue;
        setBaseEntity(newBaseEntity);

        let newIdx = currentHistoryIdx + 1;
        setHistory((history) => [...history.slice(0, newIdx), newBaseEntity]);
        setCurrentHistoryIdx(newIdx);
    }

    const handleBackButton = () => {
        let newIdx = currentHistoryIdx - 1;
        setBaseEntity(history[newIdx]);
        setCurrentHistoryIdx(newIdx);
    }

    const handleForwardButton = () => {
        let newIdx = currentHistoryIdx + 1;
        setBaseEntity(history[newIdx])
        setCurrentHistoryIdx(newIdx)
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
                    header={data.name}
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

        let currentNodes = document.querySelectorAll('.react-flow__node');

        for (let node of currentNodes) {

            if (node.textContent === "") continue;

            node.onclick = navigateToNode;

            node.onmouseenter = (event) => {
                let nodeId = event.target.dataset.id;
                setHighlightNodeId(nodeId);
            };

            node.onmouseleave = () => {
                setHighlightNodeId(null);
            };
        }

        fitView()

    }, [nodes])

    useEffect(() => {

        const unhighlightedNodes = nodes.map(node => {
            if (node.id === "0") return node;
            return {...node, style: {...node.style, border: "1.5px solid lightgray"}};
        });

        const unhighlightedEdges = edges.map(edge => {
            return {...edge, style: {...edge.style, stroke: 'lightgray', strokeWidth: 1.5}};
        });

        if (!highlightNodeId || highlightNodeId === "0") {
            setNodes(unhighlightedNodes);
            setEdges(unhighlightedEdges);
            return
        };

        let nodeIdsToHighlight = new Set();
        let edgeIdsToHighlight = new Set();

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
            if (viewData.children.length > 0 && node.id !== "0" && (node.id === highlightNodeId || nodeIdsToHighlight.includes(node.id))) {
                return {...node, style: {...node.style, border: "1.5px solid dodgerblue"}};
            }
            return node;
        });
        setNodes(updatedNodes);

        const updatedEdges = unhighlightedEdges.map(edge => {
            if ((viewData.children.length > 0 && edgeIdsToHighlight.includes(edge.id))) {
                return {...edge, style: {...edge.style, stroke: 'dodgerblue', strokeWidth: 1.5}};
            }
            return edge;
        });
        setEdges(updatedEdges);

    }, [highlightNodeId])

    const arrowStyles = {
        position: 'absolute',
        top: 20,
        height: 22,
        zIndex: '1000 !important',
    }

    return (
        <div className='reactflow-wrapper'>
            <Sidebar content={sidebarContent}/>
            <SidebarHeader>
                <HomeIcon onClick={() => {}} />
                <ArrowLeft
                    isActive={currentHistoryIdx > 0}
                    onClick={handleBackButton}
                    style={{...arrowStyles, left: 67}}
                />
                <ArrowRight
                    isActive={currentHistoryIdx < history.length - 1}
                    onClick={handleForwardButton}
                    style={{...arrowStyles, left: 102}}
                />
                <TutorialLink href="https://youtube.com" target="_blank">Tutorial</TutorialLink>
            </SidebarHeader>
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
