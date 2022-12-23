const initialNodes = [
    {
      id: '1',
      data: { label: 'Caudal Part of the Spinal Trigeminal Nucleus' },
      position: { x: 250, y: 0 },
      style: {},
    },
    {
      id: '2',
      data: { label: 'Ventral Posteromedial Nucleus' },
      position: { x: 100, y: 100 },
      style: {},
    },
    {
      id: '3',
      data: { label: 'Lateral Parabrachial Nucleus' },
      position: { x: 400, y: 100 },
      style: {},
    },
    {
      id: '4',
      data: { label: 'Primary Somatosensory Cortex' },
      position: { x: -100, y: 200 },
      style: {},
    },
    {
      id: '5',
      data: { label: 'Secondary Somatosensory Cortex' },
      position: { x: 100, y: 200 },
      style: {},
    },
    {
      id: '6',
      data: { label: 'Posterior Insular Cortex' },
      position: { x: 300, y: 200 },
      style: {},
    },
    {
      id: '7',
      data: { label: 'Central Nucleus of Amygdala' },
      position: { x: 500, y: 200 },
      style: {},
    },
    {
      id: '8',
      data: { label: 'Anterior Insular Cortex' },
      position: { x: 300, y: 300 },
      style: {},
    },
    {
      id: '9',
      data: { label: 'Anterior Cingulate Cortex' },
      position: { x: 500, y: 300 },
      style: {},
    },
    {
      id: '10',
      data: { label: 'Prefrontal Cortex' },
      position: { x: 0, y: 400 },
      style: {},},
    {
      id: '11',
      data: { label: 'Periaqueductal Gray' },
      position: { x: 0, y: 500 },
      style: {},
    },
    {
      id: '12',
      data: { label: 'Rostroventral Medulla' },
      position: { x: 0, y: 600 },
      style: {},
    },
    {
      id: '13',
      data: { label: 'Solitary Nucleus' },
      position: { x: 100, y: -100 },
      style: {},
    },
    {
      id: '14',
      data: { label: 'Trigeminal Ganglion' },
      position: { x: 400, y: -100 },
      style: {},
    },
    {
      id: '15',
      data: { label: 'Thalamic reticular nucleus' },
      position: { x: -50, y: 0 },
      style: {},
    },
];

const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', animated: true, style: {stroke: 'lightgray'}, },
    { id: 'e1-3', source: '1', target: '3', animated: true, style: {stroke: 'lightgray'}, },
    { id: 'e2-4', source: '2', target: '4', animated: true, style: {stroke: 'lightgray'}, },
    { id: 'e2-5', source: '2', target: '5', animated: true, style: {stroke: 'lightgray'}, },
    { id: 'e2-6', source: '2', target: '6', animated: true, style: {stroke: 'lightgray'}, },
    { id: 'e4-5', source: '4', target: '5', animated: true, style: {stroke: 'lightgray'}, },
    { id: 'e5-4', source: '5', target: '4', animated: true, style: {stroke: 'lightgray'}, },
    { id: 'e3-7', source: '3', target: '7', animated: true, style: {stroke: 'lightgray'}, },
    { id: 'e6-8', source: '6', target: '8', animated: true, style: {stroke: 'lightgray'}, },
    { id: 'e6-9', source: '6', target: '9', animated: true, style: {stroke: 'lightgray'}, },
    { id: 'e7-9', source: '7', target: '9', animated: true, style: {stroke: 'lightgray'}, },
    { id: 'e8-9', source: '8', target: '9', animated: true, style: {stroke: 'lightgray'}, },
    { id: 'e4-10', source: '4', target: '10', animated: true, style: {stroke: 'lightgray'}, },
    { id: 'e6-10', source: '6', target: '10', animated: true, style: {stroke: 'lightgray'}, },
    { id: 'e8-10', source: '8', target: '10', animated: true, style: {stroke: 'lightgray'}, },
    { id: 'e9-10', source: '9', target: '10', animated: true, style: {stroke: 'lightgray'}, },
    { id: 'e10-11', source: '10', target: '11', animated: true, style: {stroke: 'lightgray'}, },
    { id: 'e11-12', source: '11', target: '12', animated: true, style: {stroke: 'lightgray'}, },
    { id: 'e12-1', source: '12', target: '1', animated: true, style: {stroke: 'lightgray'}, },
    { id: 'e13-1', source: '13', target: '1', animated: true, style: {stroke: 'lightgray'}, },
    { id: 'e9-11', source: '9', target: '11', animated: true, style: {stroke: 'lightgray'}, },
    { id: 'e14-1', source: '14', target: '1', animated: true, style: {stroke: 'lightgray'}, },
    { id: 'e7-3', source: '7', target: '3', animated: true, style: {stroke: 'lightgray'}, },
    { id: 'e15-2', source: '15', target: '2', animated: true, style: {stroke: 'lightgray'}, },
    { id: 'e2-15', source: '2', target: '15', animated: true, style: {stroke: 'lightgray'}, },
];

const walkthroughSteps = [
    {
        stepId: 1,
        nodeIds: ['1', '14'],
        edgeIds: ['e14-1'],
        title: 'Central Sensitization',
        description: 'The caudal part of the spinal trigeminal nucleus receives nociceptive afferents from the the trigeminal ganglion.'
    },
    {
        stepId: 2,
        nodeIds: ['1', '2'],
        edgeIds: ['e1-2'],
        title: 'Burst Firing',
        description: 'Ye get burst firing.'
    },
    {
        stepId: 3,
        nodeIds: ['2', '4', '5', '6'],
        edgeIds: ['e2-4', 'e2-5', 'e2-6'],
        title: 'Widespread cortical chaos',
        description: 'All tangled up, yo.'
    },
]

export {initialNodes, initialEdges, walkthroughSteps};
