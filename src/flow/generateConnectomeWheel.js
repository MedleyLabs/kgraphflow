const areNodesEqual = (a, b) => {
    return a.id === b.id;
};

const areEdgesEqual = (a, b) => {
    return a.source === b.source && a.target === b.target;
};

const nodeExistsInArray = (obj, arr) => {
    return arr.some((arrObj) => areNodesEqual(arrObj, obj));
};

const edgeExistsInArray = (obj, arr) => {
    return arr.some((arrObj) => areEdgesEqual(arrObj, obj));
};

const getUniqueNodes = (networks) => {

    let uniqueNodes = [];

    for (let network of networks) {
        for (let node of network.nodes) {
            if (!nodeExistsInArray(node, uniqueNodes)) {
                uniqueNodes.push(node);
            }
        }
    }
    return uniqueNodes;
}

const getUniqueEdges = (networks) => {

    let uniqueEdges = [];
    let currentEdgeId = 0;

    for (let network of networks) {
        for (let edge of network.edges) {
            let newEdge = {
                ...edge,
                id: `e${(currentEdgeId).toString()}`,
                animated: true,
                style: {...edge.style, stroke: 'lightgray'}
            }
            currentEdgeId += 1;
            if (!edgeExistsInArray(newEdge, uniqueEdges)) {
                uniqueEdges.push(newEdge);
            }
        }
    }
    return uniqueEdges;
};

const generateConnectomeWheel = (
    networks,
    defaultNodeWidth = 200,
    defaultRadiusFactor = 8.5,
    sortNodes = true
) => {

    let nodes = [];
    let currentNodeId = 0;

    let uniqueNodes = getUniqueNodes(networks);
    let uniqueEdges = getUniqueEdges(networks);

    if (sortNodes) {
        uniqueNodes = uniqueNodes.sort((a, b) => a.abbreviation.localeCompare(b.abbreviation));
    }

    let radius = defaultRadiusFactor * uniqueNodes.length;

    for (let i = 0; i < uniqueNodes.length; i++) {

        let node = uniqueNodes[i];
        let degrees = 360 * currentNodeId / uniqueNodes.length - 90;
        let radians = Math.PI * degrees / 180;

        let alignDirection = degrees < 90 ? 'left' : 'right';
        let justifyDirection = degrees < 90 ? 'flex-start' : 'flex-end';

        let newNode = {
            ...node,
            type: 'rotatableNode',
            className: 'nodrag',
            ariaLabel: node.name,
            position: {x: radius * Math.cos(radians), y: radius * Math.sin(radians)},
            sourcePosition: alignDirection,
            targetPosition: alignDirection,
            style: {
                ...node.style,
                border: 0,
                borderRadius: 0,
                backgroundColor: 'transparent',
                fontSize: 18,
                width: defaultNodeWidth,
                textAlign: alignDirection,
                justifyContent: justifyDirection,
                WebkitJustifyContent: justifyDirection,
            },
            data: {
                ...node.data,
                id: node.id,
                ariaLabel: node.name,
                label: node.abbreviation,
                sourcePosition: alignDirection,
                targetPosition: alignDirection,
                style: {
                    ...node.data?.style,
                    borderStyle: 'solid',
                    borderColor: 'lightgray',
                    borderWidth: `0 ${degrees < 90 ? 0 : '2px'} 0 ${degrees < 90 ? '2px' : 0}`,
                    backgroundColor: 'transparent',
                    textAlign: alignDirection,
                    justifyContent: justifyDirection,
                    WebkitJustifyContent: justifyDirection,
                    transform: `
                        translateX(${radius * Math.cos(radians)}px) 
                        translateY(${radius * Math.sin(radians)}px) 
                        rotate(${degrees >= 90 ? degrees + 180 : degrees}deg)
                    `,
                },
            },
        };

        nodes.push(newNode);
        currentNodeId += 1;
    }

    return {
        nodes: nodes,
        edges: uniqueEdges,
    };
}

export default generateConnectomeWheel;
