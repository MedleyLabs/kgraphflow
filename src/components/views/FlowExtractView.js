import React, { useEffect, useMemo, useState } from 'react';
import ReactFlow, {useEdgesState, useNodesState, useReactFlow, Background, fitView} from 'reactflow';
import styled from 'styled-components';

import FlowWithSidebar from '../FlowWithSidebar.js';
import SidebarHeader from '../SidebarHeader.js';
import RotatableNode from '../RotatableNode.js';
import ConditionContent from '../custom/NetworkContent.js';
import generateConnectomeWheel from "../../flow/generateConnectomeWheel";


const Textarea = styled.textarea`
  height: 200px;
  width: 800px;
  margin: auto;
  margin-top: 200px;
`

const Button = styled.button`
  display: block;
  height: 50px;
  width: 100px;
  margin: auto;
  margin-top: 20px;
  color: white;
  background-color: dodgerblue;
  border: 1px solid #333;
  border-radius: 10px;
  font-size: 18px;
`

function FlowExtractView(props) {

    'Primary afferent neurons synapse onto second-order neurons in the spinal trigeminal nucleus caudalis (SpVC). These neurons, in turn, project to the ventral posteromedial nucleus (VPM) and the lateral parabrachial nucleus (LPBN). The VPM then projects to the primary somatosensory cortex (S1) for sensory-discriminative processing and to the posterior insula (PI) for affective-motivational processing. The LPBN also projects to PI, as well as to the periaqueductal gray (PAG) to regulate descending pain modulation. The prefrontal cortex (PFC) also sends projections to the PAG, and the PFC has bidirectional connections with the anterior insula (AI) and anterior cingulate cortex (ACC). The AI forms bidirectional connections with PI Finally, the PAG sends output to the nucleus raphe magnus (NRM), which in turn sends output to SpVC. By doing so, higher-level cognitive areas can amplify or attenuate the pain response.'

    const [userInput, setUserInput] = useState(null);
    const [viewData, setViewData] = useState(null);

    const [networks, setNetworks] = useState([]);
    const [activeNetworks, setActiveNetworks] = useState([]);
    const [sidebarContent, setSidebarContent] = useState(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const [flag, setFlag] = useState(false);

    const [highlightNodeId, setHighlightNodeId] = useState(null);

    const nodeTypes = useMemo(() => ({rotatableNode: RotatableNode}), []);

    const {fitView, zoomOut} = useReactFlow();

    const fetchData = async (userText) => {

        // let cache = {
        //     "edges": [
        //         {
        //             "animated": true,
        //             "id": "e1-2",
        //             "source": "1",
        //             "target": "2"
        //         },
        //         {
        //             "animated": true,
        //             "id": "e1-3",
        //             "source": "1",
        //             "target": "3"
        //         },
        //         {
        //             "animated": true,
        //             "id": "e2-4",
        //             "source": "2",
        //             "target": "4"
        //         },
        //         {
        //             "animated": true,
        //             "id": "e2-5",
        //             "source": "2",
        //             "target": "5"
        //         },
        //         {
        //             "animated": true,
        //             "id": "e3-5",
        //             "source": "3",
        //             "target": "5"
        //         },
        //         {
        //             "animated": true,
        //             "id": "e3-9",
        //             "source": "3",
        //             "target": "9"
        //         },
        //         {
        //             "animated": true,
        //             "id": "e6-9",
        //             "source": "6",
        //             "target": "9"
        //         },
        //         {
        //             "animated": true,
        //             "id": "e6-7",
        //             "source": "6",
        //             "target": "7"
        //         },
        //         {
        //             "animated": true,
        //             "id": "e6-8",
        //             "source": "6",
        //             "target": "8"
        //         },
        //         {
        //             "animated": true,
        //             "id": "e7-5",
        //             "source": "7",
        //             "target": "5"
        //         },
        //         {
        //             "animated": true,
        //             "id": "e5-7",
        //             "source": "5",
        //             "target": "7"
        //         },
        //         {
        //             "animated": true,
        //             "id": "e8-6",
        //             "source": "8",
        //             "target": "6"
        //         },
        //         {
        //             "animated": true,
        //             "id": "e9-10",
        //             "source": "9",
        //             "target": "10"
        //         },
        //         {
        //             "animated": true,
        //             "id": "e10-1",
        //             "source": "10",
        //             "target": "1"
        //         }
        //     ],
        //     "nodes": [
        //         {
        //             "abbreviation": "SpVC",
        //             "data": {
        //                 "label": "Spinal Trigeminal Nucleus Caudalis"
        //             },
        //             "id": "1",
        //             "name": "Spinal Trigeminal Nucleus Caudalis",
        //             "position": {
        //                 "x": 700,
        //                 "y": 100
        //             },
        //             "sourcePosition": "right",
        //             "targetPosition": "left"
        //         },
        //         {
        //             "abbreviation": "VPM",
        //             "data": {
        //                 "label": "Ventral Posteromedial Nucleus"
        //             },
        //             "id": "2",
        //             "name": "Ventral Posteromedial Nucleus",
        //             "position": {
        //                 "x": 700,
        //                 "y": 200
        //             },
        //             "sourcePosition": "right",
        //             "targetPosition": "left"
        //         },
        //         {
        //             "abbreviation": "LPBN",
        //             "data": {
        //                 "label": "Lateral Parabrachial Nucleus"
        //             },
        //             "id": "3",
        //             "name": "Lateral Parabrachial Nucleus",
        //             "position": {
        //                 "x": 700,
        //                 "y": 300
        //             },
        //             "sourcePosition": "right",
        //             "targetPosition": "left"
        //         },
        //         {
        //             "abbreviation": "S1",
        //             "data": {
        //                 "label": "Primary Somatosensory Cortex"
        //             },
        //             "id": "4",
        //             "name": "Primary Somatosensory Cortex",
        //             "position": {
        //                 "x": 700,
        //                 "y": 400
        //             },
        //             "sourcePosition": "right",
        //             "targetPosition": "left"
        //         },
        //         {
        //             "abbreviation": "PI",
        //             "data": {
        //                 "label": "Posterior Insula"
        //             },
        //             "id": "5",
        //             "name": "Posterior Insula",
        //             "position": {
        //                 "x": 700,
        //                 "y": 500
        //             },
        //             "sourcePosition": "right",
        //             "targetPosition": "left"
        //         },
        //         {
        //             "abbreviation": "PFC",
        //             "data": {
        //                 "label": "Prefrontal Cortex"
        //             },
        //             "id": "6",
        //             "name": "Prefrontal Cortex",
        //             "position": {
        //                 "x": 700,
        //                 "y": 600
        //             },
        //             "sourcePosition": "right",
        //             "targetPosition": "left"
        //         },
        //         {
        //             "abbreviation": "AI",
        //             "data": {
        //                 "label": "Anterior Insula"
        //             },
        //             "id": "7",
        //             "name": "Anterior Insula",
        //             "position": {
        //                 "x": 700,
        //                 "y": 700
        //             },
        //             "sourcePosition": "right",
        //             "targetPosition": "left"
        //         },
        //         {
        //             "abbreviation": "ACC",
        //             "data": {
        //                 "label": "Anterior Cingulate Cortex"
        //             },
        //             "id": "8",
        //             "name": "Anterior Cingulate Cortex",
        //             "position": {
        //                 "x": 700,
        //                 "y": 800
        //             },
        //             "sourcePosition": "right",
        //             "targetPosition": "left"
        //         },
        //         {
        //             "abbreviation": "PAG",
        //             "data": {
        //                 "label": "Periaqueductal Gray"
        //             },
        //             "id": "9",
        //             "name": "Periaqueductal Gray",
        //             "position": {
        //                 "x": 700,
        //                 "y": 900
        //             },
        //             "sourcePosition": "right",
        //             "targetPosition": "left"
        //         },
        //         {
        //             "abbreviation": "NRM",
        //             "data": {
        //                 "label": "Nucleus Raphe Magnus"
        //             },
        //             "id": "10",
        //             "name": "Nucleus Raphe Magnus",
        //             "position": {
        //                 "x": 700,
        //                 "y": 1000
        //             },
        //             "sourcePosition": "right",
        //             "targetPosition": "left"
        //         }
        //     ]
        // };
        // console.log('CACHE', cache);
        //
        // let wheel = generateConnectomeWheel([cache]);
        // setViewData(wheel);
        // setNetworks([wheel])

        try {
            const response = await fetch('http://localhost:5000/language_models/pdf2kg', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: userText,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log('RESPONSE', data)
            const wheel = generateConnectomeWheel([data])
            setViewData(wheel);
            setNetworks([wheel])
        } catch (error) {
            console.error(error);
        }
    };

    const TextInput = () => {
        const [inputValue, setInputValue] = useState('');

        const handleChange = (event) => {
            setInputValue(event.target.value);
        };

        const handleSubmit = (event) => {
            event.preventDefault();
            setUserInput(inputValue);
            fetchData(inputValue);
            setInputValue('');
        };

        return (
            <form onSubmit={handleSubmit}>
                <Textarea
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Please enter text containing brain regions and connections..."
                />
                <Button type="submit">Submit</Button>
            </form>
        );
    };

    useEffect(() => {
        if (networks.length === 0) return;
        setNodes(networks[0].nodes);
        setEdges(networks[0].edges);
    }, [networks])

    useEffect(() => {

        let currentNodes = document.querySelectorAll('.react-flow__node');

        for (let node of currentNodes) {

            let child = node.childNodes[0];

            child.onclick = (event) => {
                props.setView('flowExplorerView', {baseEntity: event.target.parentNode.attributes['aria-label'].nodeValue});
            };

            child.onmouseenter = (event) => {
                // if (activeNetworks.length > 0) return;
                console.log('EVENT', event.target.parentNode)
                let nodeId = event.target.parentNode.dataset.id;
                setHighlightNodeId(nodeId);
            };

            child.onmouseleave = () => {
                // if (activeNetworks.length > 0) return;
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

        console.log('YO', highlightNodeId)

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

        setViewData({
            'nodes': updatedNodes,
            'edges': updatedEdges
        })

    }, [highlightNodeId])

    return (
        <div style={{textAlign: 'center'}}>
            <header className="App-header">
                {viewData
                    ? (
                        <div style={{width: '100vw', height: '100vh'}}>
                            <ReactFlow
                                nodes={viewData.nodes}
                                edges={viewData.edges}
                                nodeTypes={nodeTypes}
                                fitView
                            >
                            </ReactFlow>
                        </div>
                    )
                    : userInput ? <div style={{marginTop: 200}}>Loading...</div> : <TextInput/>
                }
            </header>
        </div>
    );

    // useEffect(() => {
    //
    //     let mergedNetwork = generateConnectomeWheel(networks);
    //
    //     setNodes(mergedNetwork.nodes);
    //     setEdges(mergedNetwork.edges);
    //
    //     setSidebarContent(<ConditionContent
    //         setView={props.setView}
    //         networks={networks}
    //         activeNetworks={activeNetworks}
    //         setActiveNetworks={setActiveNetworks}
    //     />);
    //
    // }, [props.networkIndices])
    //
    // useEffect(() => {
    //
    //     setSidebarContent(<ConditionContent
    //         setView={props.setView}
    //         networks={networks}
    //         activeNetworks={activeNetworks}
    //         setActiveNetworks={setActiveNetworks}
    //     />);
    //
    // }, [activeNetworks])
    //
    // useEffect(() => {
    //
    //     if (activeNetworks.length === 1 && activeNetworks[0] === 'reset') {
    //         setActiveNetworks([]);
    //         return;
    //     }
    //
    //     const unhighlightedNodes = nodes.map(node => {
    //         return {
    //             ...node,
    //             style: {...node.style, color: '#404040'},
    //             data: {...node.data, label: node.abbreviation, style: {...node.data.style, borderColor: 'lightgray'}}
    //         };
    //     });
    //
    //     const unhighlightedEdges = edges.map(edge => {
    //         return {...edge, style: {...edge.style, stroke: 'lightgray'}};
    //     });
    //
    //     if (nodes.length > 0) {
    //         setNodes(unhighlightedNodes);
    //         setEdges(unhighlightedEdges);
    //     }
    //
    //     for (let network of networks) {
    //
    //         if (activeNetworks.includes(network.id)) {
    //
    //             let nodeIds = [];
    //             let edgeIds = [];
    //
    //             if (activeNetworks.length === 2) {
    //                 let sharedNodes = networks[0].nodes.filter(nodeA => networks[1].nodes.some(nodeB => nodeA.id === nodeB.id))
    //                 nodeIds = sharedNodes.map(n => n.id)
    //
    //                 let sharedEdges = networks[0].edges.filter(edgeA => networks[1].edges.some(edgeB => (edgeA.source === edgeB.source && edgeA.target === edgeB.target)))
    //
    //                 for (let sharedEdge of sharedEdges) {
    //                     for (let e of unhighlightedEdges) {
    //                         if (sharedEdge.source === e.source && sharedEdge.target === e.target) {
    //                             edgeIds.push({source: e.source, target: e.target})
    //                         }
    //                     }
    //                 }
    //             } else {
    //                 nodeIds = network.nodes.map(n => n.id)
    //                 edgeIds = network.edges.map(e => ({source: e.source, target: e.target}))
    //             }
    //
    //             const highlightedNodes = unhighlightedNodes.map(node => {
    //                 if (!nodeIds.includes(node.id)) return {
    //                     ...node,
    //                     style: {...node.style, color: '#404040'},
    //                     data: {
    //                         ...node.data,
    //                         label: node.abbreviation,
    //                         style: {...node.data.style, borderColor: 'lightgray'}
    //                     }
    //                 };
    //
    //                 return {
    //                     ...node,
    //                     style: {...node.style, color: 'dodgerblue'},
    //                     data: {...node.data, label: node.name, style: {...node.data.style, borderColor: 'dodgerblue'}}
    //                 };
    //             });
    //
    //             const highlightedEdges = unhighlightedEdges.map(edge => {
    //                 if (!edgeIds.some((edgeId) => edgeId.source === edge.source && edgeId.target === edge.target)) return {
    //                     ...edge,
    //                     style: {...edge.style, stroke: 'lightgray'}
    //                 };
    //                 return {...edge, style: {...edge.style, stroke: 'dodgerblue'}};
    //             });
    //
    //             setNodes(highlightedNodes);
    //             setEdges(highlightedEdges);
    //         }
    //     }
    //
    // }, [activeNetworks]);
    //
    //
    // const sidebarHeader = <SidebarHeader
    //     isBackActive={props.isBackActive}
    //     goBack={props.goBack}
    //     isForwardActive={props.isForwardActive}
    //     goForward={props.goForward}
    // />
    //
    // return (
    //     <FlowWithSidebar
    //         sidebarHeader={sidebarHeader}
    //         sidebarContent={sidebarContent}
    //         nodes={nodes}
    //         edges={edges}
    //         onNodesChange={onNodesChange}
    //         onEdgesChange={onEdgesChange}
    //         nodeTypes={nodeTypes}
    //     />
    // );
}

export default FlowExtractView;
