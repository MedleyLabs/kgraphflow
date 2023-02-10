import generateNodes from './generateNodes.js';
import generateEdges from './generateEdges.js';
import generateNetwork from "./generateNetwork";
import NeuralRegionContent from "../components/custom/NeuralRegionContent";


function generateSubnetwork(viewData) {

    const defaultNodeWidth = 300;
    const defaultBaseNodeWidth = 250;
    const defaultEdgeWidth = 150;
    const defaultNodeHeight = 50;

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
        // type: 'group',
        name: viewData.name,
        data: {label: viewData.name},
        position: { x: 0, y: 0 },
        connectable: true,
        style: {
            width: defaultNodeWidth + 100,
            height: (defaultNodeHeight + 5) * viewData.children.length + 60,
            borderColor: 'gray',
            fontSize: 18,
            zIndex: -1000
        },
    };

    nodes.push(parentNode);
    currentId++;

    let inputNamesSet = new Set(viewData.receives_input_from);
    let outputNamesSet = new Set(viewData.sends_output_to);

    let edgeList = [];

    for (let child of viewData.children) {

        let childNode = {
            id: currentId.toString(),
            type: 'textImage',
            name: child.name,
            data: {label: child.name, infoAvailable: child.children.length > 0},
            position: { x: 50, y: (60 + (defaultNodeHeight + 5) * (currentId-2)) },
            targetPosition: 'left',
            sourcePosition: 'right',
            parentNode: '1',
            style: {width: defaultNodeWidth, borderColor: 'black'},
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
        ? inputNamesList.length / 2 * -defaultNodeHeight + parentNode.style.height/2
        : (inputNamesList.length - 1) / 2 * -defaultNodeHeight - defaultNodeHeight/2 + parentNode.style.height/2
    ;

    for (let inputName of inputNamesList) {
        inputNodes.push({
            id: currentId.toString(),
            name: inputName,
            data: {label: inputName},
            position: { x: -defaultNodeWidth - defaultEdgeWidth, y: currentY },
            targetPosition: 'right',
            sourcePosition: 'right',
            style: {width: defaultNodeWidth, borderColor: 'black'},
            // content: inputEntity.content,
        });
        currentId++;
        currentY += defaultNodeHeight;
    }

    nodes = nodes.concat(inputNodes);

    currentY = outputNamesList.length % 2 === 0
        ? outputNamesList.length / 2 * -defaultNodeHeight + parentNode.style.height/2
        : (outputNamesList.length - 1) / 2 * -defaultNodeHeight - defaultNodeHeight/2 + parentNode.style.height/2
    ;

    for (let outputName of outputNamesList) {
        outputNodes.push({
            id: currentId.toString(),
            name: outputName,
            data: {label: outputName},
            position: { x: parentNode.style.width + defaultEdgeWidth, y: currentY },
            targetPosition: 'left',
            sourcePosition: 'left',
            style: {width: defaultNodeWidth, borderColor: 'black'},
            // content: outputEntity.content,
        });
        currentId++;
        currentY += defaultNodeHeight;
    }

    nodes = nodes.concat(outputNodes)

    let edgeId = 1;

    // for (let input in viewData.receives_input_from) {
    //
    //     let sourceId = null;
    //
    //     for (let node of inputNodes) {
    //         if (input === node.name) {
    //             sourceId = node.id
    //         }
    //     }
    //
    //     edges.push({
    //         id: `e-${edgeId.toString()}`,
    //         source: sourceId,
    //         target: parentNode.id,
    //         animated: true,
    //         description: 'TBD',
    //     })
    //
    //     edgeId++
    // }
    //
    // for (let output in viewData.sends_output_to) {
    //
    //     let targetId = null;
    //
    //     for (let node of inputNodes) {
    //         if (output === node.name) {
    //             targetId = node.id
    //         }
    //     }
    //
    //     edges.push({
    //         id: `e-${edgeId.toString()}`,
    //         source: parentNode.id,
    //         target: targetId,
    //         animated: true,
    //         description: 'TBD',
    //     })
    //
    //     edgeId++
    // }

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
        }

        if (sourceId && targetId) {
        } else {

        }

        edges.push({
          id: `e-${edgeId.toString()}`,
          source: sourceId,
          target: targetId,
          animated: true,
          description: 'TBD',
        })

        edgeId++
    }

    return [nodes, edges];
}

export default generateSubnetwork;


// let baseNode = {
//     id: '1',
//     name: baseEntity,
//     data: {label: baseEntity},
//     position: { x: -defaultBaseNodeWidth/2, y: 0 },
//     targetPosition: 'left',
//     sourcePosition: 'right',
//     style: {width: defaultBaseNodeWidth, borderColor: 'black'},
// };
//
// let sourceNodes = [];
// let targetNodes = [];
//
// let currentId = 2;
// let currentY = inputEntities.length % 2 === 0
//     ? inputEntities.length / 2 * -defaultNodeHeight + defaultNodeHeight/2
//     : (inputEntities.length - 1) / 2 * -defaultNodeHeight
// ;
//
// for (let inputEntity of inputEntities) {
//     sourceNodes.push({
//         id: currentId.toString(),
//         // entityId: inputEntity.id,
//         name: inputEntity,
//         data: {label: inputEntity},
//         position: { x: -defaultBaseNodeWidth/2 - defaultNodeWidth - defaultEdgeWidth, y: currentY },
//         targetPosition: 'right',
//         sourcePosition: 'right',
//         style: {width: defaultNodeWidth, borderColor: 'black'},
//         // content: inputEntity.content,
//     });
//     currentId++;
//     currentY += defaultNodeHeight;
// }
//
// currentY = outputEntities.length % 2 === 0
//     ? outputEntities.length / 2 * -defaultNodeHeight + defaultNodeHeight/2
//     : (outputEntities.length - 1) / 2 * -defaultNodeHeight
// ;
//
// for (let outputEntity of outputEntities) {
//     targetNodes.push({
//         id: currentId.toString(),
//         // entityId: outputEntity.id,
//         name: outputEntity,
//         data: {label: outputEntity},
//         position: { x: defaultBaseNodeWidth/2 + defaultEdgeWidth, y: currentY },
//         targetPosition: 'left',
//         sourcePosition: 'left',
//         style: {width: defaultNodeWidth, borderColor: 'black'},
//         // content: outputEntity.content,
//     });
//     currentId++;
//     currentY += 50;
// }
//
// let nodes = generateNodes(baseNode, sourceNodes, targetNodes);
// let edges = generateEdges(baseNode, sourceNodes, targetNodes);
//
// // nodes.push({
// //   id: '100',
// //   entityId: 23,
// //   name: 'NAcc Core',
// //   data: {label: 'NAcc Core'},
// //   parentNode: '1',
// //   extent: 'parent',
// //   targetPosition: 'left',
// //   sourcePosition: 'right',
// //   position: { x: 90, y: 50 },
// //   style: {width: defaultNodeWidth, borderColor: 'black'},
// //   content: '',
// // })
// //
// // nodes.push({
// //   id: '101',
// //   entityId: 24,
// //   name: 'NAcc Shell',
// //   data: {label: 'NAcc Shell'},
// //   parentNode: '1',
// //   extent: 'parent',
// //   targetPosition: 'left',
// //   sourcePosition: 'right',
// //   position: { x: 90, y: 100 },
// //   style: {width: defaultNodeWidth, borderColor: 'black'},
// //   content: '',
// // })
// //
// // edges.push({
// //   id: `e1-100`,
// //   source: '1',
// //   target: '100',
// //   animated: true,
// //   description: 'TBD',
// // })