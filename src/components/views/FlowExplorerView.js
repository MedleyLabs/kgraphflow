import React, {useEffect, useMemo, useState} from 'react';
import {useEdgesState, useNodesState, useReactFlow} from 'reactflow';
import styled from 'styled-components';
import TaxonomyWheel from 'taxonomy-wheel';

import FlowWithSidebar from '../FlowWithSidebar.js';
import generateSubnetwork from '../../flow/generateSubnetwork.js';

import InfoAvailableNode from '../InfoAvailableNode.js';
import NeuralRegionContent from '../custom/NeuralRegionContent.js';

import taxonomy from '../../data/taxonomyData';

import HomeIcon from '../svg/HomeIcon.js';
import ArrowLeftIcon from '../svg/ArrowLeftIcon.js';
import ArrowRightIcon from '../svg/ArrowRightIcon.js';

const SidebarHeaderContainer = styled.div`
  height: 60px;
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

        if (newBaseEntity === 'Anxiety') {
            props.setViewType('flowConnectomeView-0');
            return;
        }
        if (newBaseEntity === 'Chronic orofacial pain') {
            props.setViewType('flowConnectomeView-1');
            return;
        }

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
                const response = await fetch(`${process.env.REACT_APP_FLASK_URL}/fma/get_data`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        entity_name: entityName
                    })
                });

                const data = await response.json();

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
                                <div style={{height: 640}}>
                                    <div>In the human primary motor cortex, key cell types comprise glutamatergic
                                        (excitatory), GABAergic (inhibitory), and non-neuronal (predominantly glial)
                                        cells. The innermost ring in the accompanying diagram depicts these major types,
                                        while the middle and outer rings display the subtypes expressing distinct
                                        proteins.
                                    </div>
                                    <br/><br/>
                                    <div style={{height: 300, display: 'static', marginTop: -14}}>
                                        <TaxonomyWheel data={taxonomy} maxDepth={4} radius={150}
                                                       style={{display: 'none'}}/>
                                    </div>
                                    <div style={{marginTop: 30}}>Source: <a
                                        href="https://knowledge.brain-map.org/celltypes/CCN201912131" target="_blank">BICCN
                                        Human Primary Motor Cortex Mini-Atlas</a></div>
                                </div>
                            </>
                        ),
                    }}
                    navigateToNode={navigateToNode}
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

        for (let node of currentNodes) {

            if (node.textContent === '') continue;

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
            if (node.id === '0') return node;
            return {...node, style: {...node.style, border: '1.5px solid lightgray'}};
        });

        const unhighlightedEdges = edges.map(edge => {
            return {...edge, style: {...edge.style, stroke: 'lightgray', strokeWidth: 1.5}};
        });

        if (!highlightNodeId || highlightNodeId === '0') {
            setNodes(unhighlightedNodes);
            setEdges(unhighlightedEdges);
            return
        }

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
            if (node.id !== '0' && (node.id === highlightNodeId || nodeIdsToHighlight.includes(node.id))) {
                return {...node, style: {...node.style, border: '1.5px solid dodgerblue'}};
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

    }, [highlightNodeId])

    const arrowStyles = {
        position: 'absolute',
        top: 20,
        height: 22,
        zIndex: '1000 !important',
    }

    const SidebarHeader = () => {

        const [hovered, setHovered] = useState(false);

        return (
            <SidebarHeaderContainer>
                <a href={process.env.REACT_APP_ROOT_URL}><HomeIcon/></a>
                <ArrowLeftIcon
                    isActive={currentHistoryIdx > 0}
                    onClick={handleBackButton}
                    style={{...arrowStyles, left: 67}}
                />
                <ArrowRightIcon
                    isActive={currentHistoryIdx < history.length - 1}
                    onClick={handleForwardButton}
                    style={{...arrowStyles, left: 102}}
                />
                <TutorialLink
                    href=""
                    target=""
                    onMouseEnter={() => {
                        setHovered(true);
                    }}
                    onMouseLeave={() => {
                        setHovered(false);
                    }}
                >{hovered ? 'Coming soon!' : 'Tutorial'}
                </TutorialLink>
            </SidebarHeaderContainer>
        )
    }

    return (
        <FlowWithSidebar
            sidebarHeader={<SidebarHeader/>}
            sidebarContent={sidebarContent}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
        />
    );
}

export default FlowExplorerView;
