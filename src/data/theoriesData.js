const theories = [
    {
        id: 1,
        name: 'Thalamocortical dysrhythmia model of chronic orofacial pain',
        authors: ['Eric Yates'],
        conditions: ['Chronic orofacial pain'],
        lastUpdated: 'February 13th, 2023',
        nodes: [
            {
                id: '1',
                data: {label: 'Spinal Trigeminal Nucleus'},
                position: {x: 250, y: 0},
                style: {},
                children: [],
                claims: [
                    {
                        title: 'Activated astrocytes in the spinal trigeminal nucleus exhibit increased infra-slow oscillatory activity.',
                        description: 'Hello',
                    },
                    {
                        title: 'Second-order neurons in the spinal trigeminal nucleus also exhibit increased infra-slow oscillatory activity at a similar frequency.',
                        description: 'Test',
                    },
                ],
            },
            {
                id: '2',
                data: {label: 'Ventral Posteromedial Nucleus'},
                position: {x: 100, y: 100},
                style: {},
                children: [],
            },
            {
                id: '3',
                data: {label: 'Lateral Parabrachial Nucleus'},
                position: {x: 400, y: 100},
                style: {},
                children: [],
            },
            {
                id: '4',
                data: {label: 'Primary Somatosensory Cortex'},
                position: {x: -100, y: 200},
                style: {},
                children: [],
            },
            {
                id: '5',
                data: {label: 'Secondary Somatosensory Cortex'},
                position: {x: 100, y: 200},
                style: {},
                children: [],
            },
            {
                id: '6',
                data: {label: 'Posterior Insular Cortex'},
                position: {x: 300, y: 200},
                style: {},
                children: [],
            },
            {
                id: '7',
                data: {label: 'Central Nucleus of Amygdala'},
                position: {x: 500, y: 200},
                style: {},
                children: [],
            },
            {
                id: '8',
                data: {label: 'Anterior Insular Cortex'},
                position: {x: 300, y: 300},
                style: {},
                children: [],
            },
            {
                id: '9',
                data: {label: 'Anterior Cingulate Cortex'},
                position: {x: 500, y: 300},
                style: {},
                children: [],
            },
            {
                id: '10',
                data: {label: 'Prefrontal Cortex'},
                position: {x: 0, y: 400},
                style: {},
                children: [],
            },
            {
                id: '11',
                data: {label: 'Periaqueductal Gray'},
                position: {x: 0, y: 500},
                style: {},
                children: [],
            },
            {
                id: '12',
                data: {label: 'Rostral Ventromedial Medulla'},
                position: {x: 0, y: 600},
                style: {},
                children: [],
            },
            {
                id: '13',
                data: {label: 'Solitary Nucleus'},
                position: {x: 100, y: -100},
                style: {},
                children: [],
            },
            {
                id: '14',
                data: {label: 'Trigeminal Ganglion'},
                position: {x: 400, y: -100},
                style: {},
                children: [],
            },
            {
                id: '15',
                data: {label: 'Thalamic Reticular Nucleus'},
                position: {x: -50, y: 0},
                style: {},
                children: [],
            },
        ],
        edges: [
            {id: 'e1-2', source: '1', target: '2', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e1-3', source: '1', target: '3', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e2-4', source: '2', target: '4', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e2-5', source: '2', target: '5', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e2-6', source: '2', target: '6', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e4-5', source: '4', target: '5', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e5-4', source: '5', target: '4', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e3-7', source: '3', target: '7', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e6-8', source: '6', target: '8', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e6-9', source: '6', target: '9', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e7-9', source: '7', target: '9', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e8-9', source: '8', target: '9', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e4-10', source: '4', target: '10', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e6-10', source: '6', target: '10', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e8-10', source: '8', target: '10', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e9-10', source: '9', target: '10', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e10-11', source: '10', target: '11', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e11-12', source: '11', target: '12', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e12-1', source: '12', target: '1', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e13-1', source: '13', target: '1', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e9-11', source: '9', target: '11', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e14-1', source: '14', target: '1', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e7-3', source: '7', target: '3', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e15-2', source: '15', target: '2', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e2-15', source: '2', target: '15', animated: true, style: {stroke: 'lightgray'},},
        ],
        steps: [
            {
                id: 1,
                nodeIds: ['1'],
                edgeIds: [],
                claims: [
                    {
                        title: 'Activated astrocytes in the spinal trigeminal nucleus exhibit increased infra-slow calcium waves.',
                        description: 'After nerve injury, increased activity within primary afferent neurons results in excessive glutamatergic release. <a href="https://www.jneurosci.org/content/36/3/1008#p-35" target="_blank">[1]</a><br/><br/>Astrocytes respond to glutamate with dynamic spatio-temporal changes in intracellular calcium [Ca2+]i, which lead to the generation of infra-slow calcium waves. <a href="https://pubmed.ncbi.nlm.nih.gov/7927645/" target="_blank">[2]</a>',
                        comments: ['', '']
                    },
                    {
                        title: 'Second-order neurons in the spinal trigeminal nucleus also exhibit increased infra-slow oscillatory activity at a similar frequency.',
                        description: '...',
                        comments: ['', '', '', '', '']
                    },
                ],
                comments: [
                    {
                        id: 1,
                        text: 'An alternative explanation for the calcium waves could be changes due to two-pore channels:<br/><br/><a href="https://pubmed.ncbi.nlm.nih.gov/20018950/" target="_blank">https://pubmed.ncbi.nlm.nih.gov/20018950/</a>',
                        user: 'Navn Navnesen',
                        time: '1 week ago',
                        upvotes: 2,
                        downvotes: 3,
                        replies: [
                            {
                                id: 2,
                                text: 'While that could be the case, your counter-claim needs greater synthesis than linking to a paper. Could you please summarize the potential mechanism?',
                                user: 'Eric Yates',
                                time: '4 days ago',
                                upvotes: 4,
                                downvotes: 0,
                                replies: [
                                    {
                                        id: 3,
                                        text: 'Sure, and thanks for clarifying the guidelines!<br/><br/>The potential mechanism is that two-pore channels recruit inositol 1,4,5-trisphoshpate receptors and/or ryanodine receptors on the endosplasmic reticulum by calcium-induced calcium release to evoke a propagating calcium wave.',
                                        user: 'Navn Navnesen',
                                        time: '3 days ago',
                                        upvotes: 6,
                                        downvotes: 0,
                                        replies: []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: 2,
                nodeIds: ['1', '2'],
                edgeIds: ['e1-2'],
                claims: [],
                comments: [
                    {
                        id: 1,
                        text: 'I disagree',
                        user: 'Eric Yates',
                        time: '1 week ago',
                        upvotes: 7,
                        downvotes: 3,
                        replies: []
                    }
                ]
            },
            {
                id: 3,
                nodeIds: ['2', '4', '5', '6'],
                edgeIds: ['e2-4', 'e2-5', 'e2-6'],
                claims: [],
                comments: [
                    {
                        id: 1,
                        text: 'I agree',
                        user: 'Eric Yates',
                        time: '1 week ago',
                        upvotes: 7,
                        downvotes: 3,
                        replies: []
                    }
                ]
            },
        ],
    },
    {
        id: 2,
        name: 'A neurobiological model of psychological stress',
        authors: ['Jane Doe', 'John Doe'],
        conditions: [],
        lastUpdated: 'February 12th, 2023',
        nodes: [],
        edges: [],
        steps: [],
    },
    {
        id: 3,
        name: 'Overlapping neural circuits mediating depression and anxiety',
        authors: ['Matti Meikäläinen', 'Maija Meikäläinen'],
        conditions: [],
        lastUpdated: 'February 7th, 2023',
        nodes: [],
        edges: [],
        steps: [],
    },
    {
        id: 4,
        name: 'The neurodevelopmental basis of ADHD',
        authors: ['Fulan AlFulani'],
        conditions: [],
        lastUpdated: 'February 3rd, 2023',
        nodes: [],
        edges: [],
        steps: [],
    },
    {
        id: 5,
        name: 'Chronic pain induced by peripheral sensitization',
        authors: ['Li Si', 'Zhang San', 'Wang Wu'],
        conditions: [],
        lastUpdated: 'February 2nd, 2023',
        nodes: [],
        edges: [],
        steps: [],
    },
    {
        id: 6,
        name: 'PTSD as a model of hippocampal dysregulation',
        authors: ['Navn Navnesen'],
        conditions: [],
        lastUpdated: 'February 2nd, 2023',
        nodes: [],
        edges: [],
        steps: [],
    },
    {
        id: 7,
        name: 'Carotid sinus stretch reflex',
        authors: ['Peter Petrov'],
        conditions: [],
        lastUpdated: 'January 30th, 2023',
        nodes: [],
        edges: [],
        steps: [],
    },
    {
        id: 8,
        name: 'Central regulation of respiration',
        authors: ['Chan Tai Man', 'Chris Wong'],
        conditions: [],
        lastUpdated: 'January 28th, 2022',
        nodes: [],
        edges: [],
        steps: [],
    },
    {
        id: 9,
        name: 'Psychological effects on the chronic pain network',
        authors: ['Jan Novák', 'Eva Nováková'],
        conditions: [],
        lastUpdated: 'January 26th, 2022',
        nodes: [],
        edges: [],
        steps: [],
    },
    // {
    //     id: 10,
    //     name: 'TBD',
    //     authors: ['Matti Meikäläinen', 'Maija Meikäläinen'],
    //     conditions: [],
    //     lastUpdated: 'May 9th, 2022',
    //     nodes: [],
    //     edges: [],
    //     steps: [],
    // },
    // {
    //     id: 11,
    //     name: 'TBD',
    //     authors: ['Navn Navnesen'],
    //     conditions: [],
    //     lastUpdated: 'July 6th, 2022',
    //     nodes: [],
    //     edges: [],
    //     steps: [],
    // },
    // {
    //     id: 12,
    //     name: '',
    //     authors: [],
    //     conditions: [],
    //     lastUpdated: 'June 30th, 2023',
    //     nodes: [],
    //     edges: [],
    //     steps: [],
    // },
    // {
    //     id: 13,
    //     name: '',
    //     authors: [],
    //     conditions: [],
    //     lastUpdated: 'August 22nd, 2022',
    //     nodes: [],
    //     edges: [],
    //     steps: [],
    // },
    // {
    //     id: 14,
    //     name: '',
    //     authors: [],
    //     conditions: [],
    //     lastUpdated: 'November 23rd, 2022',
    //     nodes: [],
    //     edges: [],
    //     steps: [],
    // },





];

export {theories};
