function generateSubnetwork(viewData) {

    const defaultNodeWidth = 300;
    const defaultNodeHeight = 41;
    const defaultEdgeWidth = 150;
    const defaultVerticalSpacing = 8;
    const defaultFontColor = '#404040';
    const defaultFontSize = 14;
    const defaultBorderColor = 'lightgray';
    const defaultBorderWidth = 1.5;
    const defaultStrokeColor = 'lightgray';
    const defaultStrokeWidth = 1.5;
    const defaultHeaderHeight = 46;

    let nodes = [];
    let childNodes = [];
    let inputNodes = [];
    let outputNodes = [];
    let edges = [];
    let inputEdges = [];
    let outputEdges = [];

    let currentId = 1;

    let parentNode = {
        id: currentId.toString(),
        name: viewData.name,
        ariaLabel: viewData.name,
        data: {label: viewData.name.length > 40 ? viewData.name.slice(0, 39) + '...' : viewData.name},
        position: { x: 0, y: 0 },
        targetPosition: 'left',
        sourcePosition: 'right',
        className: 'nodrag',
        style: {
            width: viewData.children.length > 0
                ? defaultNodeWidth + 100
                : defaultNodeWidth,
            height: viewData.children.length > 0
                ? (defaultNodeHeight + defaultVerticalSpacing) * viewData.children.length + defaultHeaderHeight + 10
                : defaultNodeHeight,
            color: defaultFontColor,
            fontSize: viewData.children.length > 0
                ? 18
                : defaultFontSize,
            borderColor: defaultBorderColor,
            borderWidth: defaultBorderWidth,
            zIndex: -1000
        },
    };

    if (viewData.children.length > 0) {
        let containerNode = {
            id: '0',
            position: { x: 50, y: defaultHeaderHeight },
            className: 'nodrag',
            style: {
                width: defaultNodeWidth,
                height: viewData.children.length * (defaultNodeHeight + defaultVerticalSpacing) - 15,
                border: 0,
                zIndex: -100
            },
        };

        nodes.push(containerNode)
    }

    nodes.push(parentNode);
    currentId++;

    let inputNamesSet = new Set(viewData.receives_input_from);
    let outputNamesSet = new Set(viewData.sends_output_to);

    let edgeList = [];

    viewData.receives_input_from.forEach(item => {
        edgeList.push({source: item, destination: viewData.name, type: 'input'})
    })

    viewData.sends_output_to.forEach(item => {
        edgeList.push({source: viewData.name, destination: item, type: 'output'})
    })

    for (let child of viewData.children) {

        let childNode = {
            id: currentId.toString(),
            type: 'infoAvailableNode',
            name: child.name,
            data: {
                label: child.name.length > 40 ? child.name.slice(0, 39) + '...' : child.name,
                ariaLabel: child.name,
                infoAvailable: child.children.length > 0
            },
            position: { x: 50, y: (defaultHeaderHeight + (defaultNodeHeight + defaultVerticalSpacing) * (currentId-2)) },
            targetPosition: 'left',
            sourcePosition: 'right',
            parentNode: '1',
            className: 'nodrag',
            style: {
                width: defaultNodeWidth,
                height: defaultNodeHeight,
                color: defaultFontColor,
                fontSize: defaultFontSize,
                borderColor: defaultBorderColor,
                borderWidth: defaultBorderWidth,
            },
        };

        childNodes.push(childNode);
        currentId++;

        child.receives_input_from.forEach(item => {
            inputNamesSet.add(item)
            edgeList.push({source: item, destination: child.name, type: 'input'})
        })
        child.sends_output_to.forEach(item => {
            outputNamesSet.add(item)
            edgeList.push({source: child.name, destination: item, type: 'output'})
        })
    }

    nodes = nodes.concat(childNodes);

    let inputNamesList = Array.from(inputNamesSet);
    let outputNamesList = Array.from(outputNamesSet);

    inputNamesList.sort();
    outputNamesList.sort();

    let currentY = inputNamesList.length % 2 === 0
        ? parentNode.style.height/2 - inputNamesList.length/2*defaultNodeHeight - (inputNamesList.length/2 - 1)*defaultVerticalSpacing - defaultVerticalSpacing/2
        : parentNode.style.height/2 - (inputNamesList.length - 1)/2*(defaultNodeHeight + defaultVerticalSpacing) - defaultNodeHeight/2
    ;

    for (let inputName of inputNamesList) {
        inputNodes.push({
            id: currentId.toString(),
            name: inputName,
            ariaLabel: inputName,
            data: {label: inputName.length > 40 ? inputName.slice(0, 39) + '...' : inputName},
            position: { x: -defaultNodeWidth - defaultEdgeWidth, y: currentY },
            targetPosition: 'right',
            sourcePosition: 'right',
            className: 'nodrag',
            style: {
                width: defaultNodeWidth,
                height: defaultNodeHeight,
                color: defaultFontColor,
                fontSize: defaultFontSize,
                borderColor: defaultBorderColor,
                borderWidth: defaultBorderWidth,
            },
        });
        currentId++;
        currentY += defaultNodeHeight + defaultVerticalSpacing;
    }

    nodes = nodes.concat(inputNodes);

    currentY = outputNamesList.length % 2 === 0
        ? parentNode.style.height/2 - outputNamesList.length/2*defaultNodeHeight - (outputNamesList.length/2 - 1)*defaultVerticalSpacing - defaultVerticalSpacing/2
        : parentNode.style.height/2 - (outputNamesList.length - 1)/2*(defaultNodeHeight + defaultVerticalSpacing) - defaultNodeHeight/2
    ;

    for (let outputName of outputNamesList) {
        outputNodes.push({
            id: currentId.toString(),
            name: outputName,
            ariaLabel: outputName,
            data: {label: outputName.length > 40 ? outputName.slice(0, 39) + '...' : outputName},
            position: { x: parentNode.style.width + defaultEdgeWidth, y: currentY },
            targetPosition: 'left',
            sourcePosition: 'left',
            className: 'nodrag',
            style: {
                width: defaultNodeWidth,
                height: defaultNodeHeight,
                color: defaultFontColor,
                fontSize: defaultFontSize,
                borderColor: defaultBorderColor,
                borderWidth: defaultBorderWidth,
            },
        });
        currentId++;
        currentY += defaultNodeHeight + defaultVerticalSpacing;
    }

    nodes = nodes.concat(outputNodes)

    let edgeId = 1;

    for (let edge of edgeList) {

        let sourceId = null;
        let targetId = null;

        if (edge.type === 'input') {
            for (let node of inputNodes) {
                if (edge.source === node.name) {
                    sourceId = node.id
                }
            }
            for (let node of childNodes) {
                if (edge.destination === node.name) {
                    targetId = node.id
                }
            }
            if (edge.destination === viewData.name) {
                targetId = "1"
            }
        } else {
            for (let node of childNodes) {
                if (edge.source === node.name) {
                    sourceId = node.id
                }
            }
            for (let node of outputNodes) {
                if (edge.destination === node.name) {
                    targetId = node.id
                }
            }
            if (edge.source === viewData.name) {
                sourceId = "1"
            }
        }

        edges.push({
          id: `e-${edgeId.toString()}`,
          source: sourceId,
          target: targetId,
          animated: true,
          description: 'TBD',
          style: {
              stroke: defaultStrokeColor,
              strokeWidth: defaultStrokeWidth
          }
        })

        edgeId++
    }

    return [nodes, edges];
}

export default generateSubnetwork;
