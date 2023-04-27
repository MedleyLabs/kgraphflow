function generateConnectomeWheel(networks) {

    let nodes = [];
    let nodeId = 0;
    let edgeId = 0;

    let defaultNodeWidth = 175;

    let uniqueNodes = [];
    let uniqueEdges = [];

    function areNodesEqual(obj1, obj2) {
        return obj1.id === obj2.id;
    }

    function areEdgesEqual(obj1, obj2) {
        return obj1.source === obj2.source && obj1.target === obj2.target;
    }

    function nodeExistsInArray(obj, arr) {
        return arr.some((arrObj) => areNodesEqual(arrObj, obj));
    }

    function edgeExistsInArray(obj, arr) {
        return arr.some((arrObj) => areEdgesEqual(arrObj, obj));
    }

    for (let network of networks) {
        for (let node of network.nodes) {
            if (!nodeExistsInArray(node, uniqueNodes)) {
                uniqueNodes.push(node);
            }
        }
    }

    uniqueNodes = uniqueNodes.sort((a, b) => a.abbreviation.toLowerCase() > b.abbreviation.toLowerCase());

    let radius = 8 * uniqueNodes.length;

    for (let i = 0; i < uniqueNodes.length; i++) {

        let node = uniqueNodes[i];
        let degrees = 360 * nodeId / uniqueNodes.length - 90 ;
        let radians = Math.PI * degrees / 180;

        let newNode = {
            ...node,
            type: 'rotatableNode',
            className: 'nodrag',
            ariaLabel: node.name,
            position: { x: radius * Math.cos(radians), y: radius * Math.sin(radians) },
            sourcePosition: degrees < 90 ? 'left' : 'right',
            targetPosition: degrees < 90 ? 'left' : 'right',
            style: {
                ...node.style,
                border: 0,
                borderRadius: 0,
                fontSize: uniqueNodes.length < 30 ? 18 : 20,
                width: defaultNodeWidth,
                justifyContent: degrees < 90 ? 'left' : 'right',
                textAlign: degrees < 90 ? 'left' : 'right',
            },
            data: {
                ...node.data,
                id: node.id,
                ariaLabel: node.name,
                label: node.abbreviation,
                sourcePosition: degrees < 90 ? 'left' : 'right',
                targetPosition: degrees < 90 ? 'left' : 'right',
                style: {
                    ...node.data?.style,
                    borderStyle: 'solid',
                    borderColor: 'lightgray',
                    borderWidth: `0 ${degrees < 90 ? 0 : '2px'} 0 ${degrees < 90 ? '2px' : 0}`,
                    justifyContent: degrees < 90 ? 'left' : 'right',
                    textAlign: degrees < 90 ? 'left' : 'right',
                    transform: `translateX(${radius * Math.cos(radians)}px) translateY(${radius * Math.sin(radians)}px) rotate(${degrees >= 90 ? degrees + 180 : degrees}deg)`,
                },
            },
        };

        nodes.push(newNode);
        nodeId += 1;
    }

    for (let network of networks) {
        for (let edge of network.edges) {
            let newEdge = {
                ...edge,
                id: `e${(edgeId).toString()}`,
                animated: true,
                style: {...edge.style, stroke: 'lightgray'}
            }
            edgeId += 1;
            if (!edgeExistsInArray(newEdge, uniqueEdges)) {
                uniqueEdges.push(newEdge);
            }
        }
    }

    return {
        nodes: nodes,
        edges: uniqueEdges,
    };
}

export default generateConnectomeWheel;
