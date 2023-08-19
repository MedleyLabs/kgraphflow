import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { Background, Controls, addEdge, useEdgesState, useNodesState, useReactFlow } from "reactflow";

import Sidebar from '../Sidebar.js';
import AutoComplete from '../Autocomplete.js';

const autocompleteData = [
    'Amygdala',
    'Anterior cingulate cortex',
    'Caudal part of spinal trigeminal nucleus',
    'Lateral parabrachial nucleus',
    'Periaqueductal gray',
    'Prefrontal cortex',
    'Primary somatosensory cortex',
    'Rostral ventromedial medulla',
    'Spinal trigeminal nucleus',
    'Vagal nerve tract',
    'Ventral anterior nucleus',
    'Ventral nucleus of posterior commisure',
    'Ventral paramedian reticular nucleus',
    'Ventral posterolateral nucleus',
    'Ventral posteromedial nucleus',
    'Ventral tegmental area',
];

function FlowBuilderView(props) {

    const defaultNodeWidth = 250;
    const defaultBaseNodeWidth = 150;
    const defaultEdgeWidth = 150;
    const defaultNodeHeight = 50;

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [sidebarContent, setSidebarContent] = useState(null);
    const [xOffset, setXOffset] = useState(0);
    const [yOffset, setYOffset] = useState(0);
    const [zoomLevel, setZoomLevel] = useState(1);

    const [newNodeName, setNewNodeName] = useState('');

    const onConnect = useCallback((params) => setEdges((eds) => addEdge({...params, animated: true}, eds)), [setEdges]);
    const { setCenter } = useReactFlow();

    setCenter(xOffset, yOffset, {'zoom': zoomLevel});

    useEffect(() => {

        setSidebarContent(
            <>
                <div className='content-header'>🔨 Flow Builder </div>
                <div className='content-body'>Chronic Orofacial Pain</div>
                <div className='sidebar-body'>
                    <AutoComplete
                        data={autocompleteData}
                        onEnterCallback={setNewNodeName}
                    />
                </div>
            </>
        )

    }, []);

    useEffect(() => {

        if (newNodeName === '') return;

        let newNode = {
            id: (nodes.length + 1).toString(),
            name: newNodeName,
            data: {label: newNodeName},
            position: {x: -defaultBaseNodeWidth/2, y: -100},
            // position: { x: -defaultBaseNodeWidth/2, y: -100 + 100 * nodes.length },
            // targetPosition: 'left',
            // sourcePosition: 'right',
            style: {width: defaultBaseNodeWidth, borderColor: 'black'},
        };

        setNodes((nds) => nds.concat(newNode))

    }, [newNodeName])

    useEffect(() => {

        const handleCallback = (event) => {
            let position = event.target.dataset.handlepos;

            if (position === 'bottom') {

            } else if (position === 'top') {

            } else {
                console.error('Invalid handle position for builder view!');
            }


        }

        let handles = document.querySelectorAll('.react-flow__handle');

        for (let handle of handles) {
            handle.onclick = handleCallback;
        }

    }, [nodes]);

    return (
        <div className='reactflow-wrapper'>
            <Sidebar content={sidebarContent} />
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
};

export default FlowBuilderView;
