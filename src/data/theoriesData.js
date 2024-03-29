import diagram from '../assets/satellite-glial-cell-diagram.png'

const theories = [
    {
        id: 1,
        stars: 17,
        name: 'What are the mechanisms of chronic orofacial pain with neuropathic origin?',
        authors: ['Eric Yates'],
        conditions: ['Chronic orofacial pain'],
        lastUpdated: 'February 13th, 2023',
        nodes: [
            {
                id: '1',
                data: {label: 'Spinal Trigeminal Nucleus', abbreviation: 'STN'},
                position: {x: 250, y: 0},
                style: {},
                children: [],
            },
            {
                id: '2',
                data: {label: 'Thalamus', abbreviation: 'THLMS'},
                position: {x: 100, y: 100},
                style: {},
                children: [],
            },
            {
                id: '3',
                data: {label: 'Parabrachial Nuclei', abbreviation: 'PBN'},
                position: {x: 400, y: 100},
                style: {},
                children: [],
            },
            {
                id: '4',
                data: {label: 'Primary Somatosensory Cortex', abbreviation: 'S1'},
                position: {x: -100, y: 200},
                style: {},
                children: [],
            },
            {
                id: '5',
                data: {label: 'Secondary Somatosensory Cortex', abbreviation: 'S2'},
                position: {x: 100, y: 200},
                style: {},
                children: [],
            },
            {
                id: '6',
                data: {label: 'Insula', abbreviation: 'INS'},
                position: {x: 300, y: 208},
                style: {},
                children: [],
            },
            {
                id: '7',
                data: {label: 'Amygdala', abbreviation: 'AMY'},
                position: {x: 500, y: 208},
                style: {},
                children: [],
            },
            // {
            //     id: '8',
            //     data: {label: 'Anterior Insular Cortex'},
            //     position: {x: 300, y: 300},
            //     style: {},
            //     children: [],
            // },
            {
                id: '9',
                data: {label: 'Anterior Cingulate Cortex', abbreviation: 'ACC'},
                position: {x: 500, y: 300},
                style: {},
                children: [],
            },
            {
                id: '10',
                data: {label: 'Prefrontal Cortex', abbreviation: 'PFC'},
                position: {x: 100, y: 400},
                style: {},
                children: [],
            },
            {
                id: '11',
                data: {label: 'Periaqueductal Gray', abbreviation: 'PAG'},
                position: {x: 100, y: 500},
                style: {},
                children: [],
            },
            {
                id: '12',
                data: {label: 'Rostral Ventromedial Medulla', abbreviation: 'RVMM'},
                position: {x: 100, y: 600},
                style: {},
                children: [],
            },
            {
                id: '13',
                data: {label: 'Aδ Fibers', abbreviation: 'AδF'},
                position: {x: 150, y: -200},
                style: {},
                children: [],
            },
            {
                id: '14',
                data: {label: 'Trigeminal Ganglion', abbreviation: 'TG'},
                position: {x: 250, y: -100},
                style: {},
                children: [],
            },
            {
                id: '15',
                data: {label: 'Thalamic Reticular Nucleus', abbreviation: 'TRN'},
                position: {x: -50, y: 0},
                style: {},
                children: [],
            },
            {
                id: '16',
                data: {label: 'C Fibers', abbreviation: 'CF'},
                position: {x: 350, y: -200},
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
            {id: 'e3-7', source: '3', target: '7', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e4-5', source: '4', target: '5', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e5-4', source: '5', target: '4', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e5-6', source: '5', target: '6', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e6-5', source: '6', target: '5', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e6-7', source: '6', target: '7', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e6-9', source: '6', target: '9', animated: true, style: {stroke: 'lightgray'},},
            // {id: 'e6-7', source: '6', target: '7', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e7-6', source: '7', target: '6', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e7-9', source: '7', target: '9', animated: true, style: {stroke: 'lightgray'},},
            // {id: 'e7-10', source: '7', target: '10', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e4-10', source: '4', target: '10', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e6-10', source: '6', target: '10', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e9-10', source: '9', target: '10', animated: true, style: {stroke: 'lightgray'},},
            // {id: 'e10-7', source: '10', target: '7', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e10-11', source: '10', target: '11', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e11-12', source: '11', target: '12', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e12-1', source: '12', target: '1', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e9-11', source: '9', target: '11', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e14-1', source: '14', target: '1', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e7-3', source: '7', target: '3', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e15-2', source: '15', target: '2', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e2-15', source: '2', target: '15', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e13-14', source: '13', target: '14', animated: true, style: {stroke: 'lightgray'},},
            {id: 'e16-14', source: '16', target: '14', animated: true, style: {stroke: 'lightgray'},},
        ],
        steps: [
            {
                id: 1,
                nodeIds: ['13', '14', '16'],
                edgeIds: ['e13-14', 'e16-14'],
                claims: [
                    {
                        title: 'Nerve injury induces satellite glial cell activation, which drives calcium wave generation in sensory ganglia.',
                        description: <><span>The injury of a nerve axon induces the firing of action potentials in the first-order sensory cell body. This causes release of ATP from the neuron, which acts on satellite glial cells (SGCs) by elevating intracellular Ca2+ in them, which in turn induces them to release ATP (and other factors, including cytokines). The increased gap junctions between SGCs facilitate the spread of IP3 within the coupled SGCs, which increases the intracellular calcium in these cells. The combination of the increased sensitivity to ATP and the increased coupling by gap junctions will promote the propagation of calcium waves, resulting in the excitation of N2.</span><br/><br/><img src={diagram} alt='Satellite glial cell diagram' width={400}/><a href="https://www.nature.com/articles/s41583-020-0333-z">Hanani, Menachem, and David C. Spray. "Emerging importance of satellite glia in nervous system function and dysfunction." Nature Reviews Neuroscience 21.9 (2020): 485-498.</a></>,
                        comments: ['', '', '']
                    },
                    {
                        title: 'These calcium waves cause an increase in the excitability of first-order sensory neurons through cross-depolarization.',
                        description: 'TBD',
                        comments: ['', '', '', '', '']
                    },
                ],
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
            {
                id: 2,
                nodeIds: ['1', '14'],
                edgeIds: ['e14-1'],
                claims: [
                    {
                        title: 'Activated astrocytes in the spinal trigeminal nucleus (SpV) exhibit increased infra-slow calcium waves during orofacial neuropathic pain.',
                        description: 'After nerve injury, increased activity within primary afferent neurons results in excessive glutamatergic release. <a href="https://www.jneurosci.org/content/36/3/1008#p-35" target="_blank">[1]</a><br/><br/>Astrocytes respond to glutamate with dynamic spatio-temporal changes in intracellular calcium [Ca2+]i, which lead to the generation of infra-slow calcium waves. <a href="https://pubmed.ncbi.nlm.nih.gov/7927645/" target="_blank">[2]</a>',
                        comments: ['', '']
                    },
                    {
                        title: 'Second-order nociceptive neurons in SpV also exhibit increased infra-slow oscillatory activity at a similar frequency to the calcium waves.',
                        description: 'TBD',
                        comments: ['', '', '', '', '']
                    },
                    {
                        title: 'The astrocytic calcium waves drive the increased infra-slow oscillatory activity in second-order neurons through complex gap junction pathways.',
                        description: 'TBD',
                        comments: ['', '']
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
                id: 3,
                nodeIds: ['1', '2'],
                edgeIds: ['e1-2'],
                claims: [
                    {
                        title: 'The infra-slow oscillatory activity in SpV is temporally-coupled to burst firing in several thalamic nuclei.',
                        description: 'TBD',
                        comments: ['', '', '']
                    },

                ],
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
                id: 4,
                nodeIds: ['2', '4'],
                edgeIds: ['e2-4'],
                claims: [
                    {
                        title: 'Third-order nociceptive neurons in the ventral posteromedial nucleus of the thalamus exhibit burst firing, which is transmitted to the primary somatosensory cortex (S1) for sensory-discriminative processing.',
                        description: 'TBD',
                        comments: ['']
                    },
                    {
                        title: 'S1 exhibits a loss of lateral inhibition, leading to the perception of pain due to the edge effect of cortical columns.',
                        description: 'TBD',
                        comments: ['', '']
                    },
                ],
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
            {
                id: 5,
                nodeIds: ['2', '5'],
                edgeIds: ['e2-5'],
                claims: [
                    {
                        title: 'The ventral inferior nucleus relays nociceptive information to the secondary somatosensory cortex (S2) for affective-cognitive processing.',
                        description: 'TBD',
                        comments: ['', '', '', '']
                    },
                ],
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
            {
                id: 6,
                nodeIds: ['2', '6'],
                edgeIds: ['e2-6'],
                claims: [
                    {
                        title: 'The medial thalamus relays nociceptive information to the insula for affective-motivational processing.',
                        description: 'TBD',
                        comments: ['', '', '']
                    },
                ],
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
            {
                id: 7,
                nodeIds: ['4', '5', '6'],
                edgeIds: ['e4-5', 'e5-4', 'e5-6', 'e6-5'],
                claims: [
                    {
                        title: 'Rich, bidirectional communication between cortical areas regulates cortical processing of pain signals.',
                        description: 'TBD',
                        comments: ['', '']
                    },
                ],
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
            {
                id: 8,
                nodeIds: ['2', '15'],
                edgeIds: ['e2-15', 'e15-2'],
                claims: [
                    {
                        title: 'There is decreased activity in the thalamic reticular nucleus (TRN) during orofacial neuropathic pain.',
                        description: 'TBD',
                        comments: []
                    },
                    {
                        title: 'Loss of GABAergic inhibition from the TRN contributes to the persistence of burst firing in the thalamus.',
                        description: 'TBD',
                        comments: ['', '', '', '', '']
                    },
                ],
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
            {
                id: 9,
                nodeIds: ['1', '3'],
                edgeIds: ['e1-3'],
                claims: [
                    {
                        title: 'Nociceptive information is relayed to the parabrachial nuclei in a parallel pathway for emotional processing.',
                        description: 'TBD',
                        comments: ['', '', '']
                    },
                ],
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
            {
                id: 10,
                nodeIds: ['3', '7'],
                edgeIds: ['e3-7', 'e7-3'],
                claims: [
                    {
                        title: 'The lateral parabrachial nucleus (LPBN) sends output to the central nucleus of the amygdala (CeA) for fear conditioning.',
                        description: 'TBD',
                        comments: ['', '', '', '', '', '']
                    },
                    {
                        title: 'CeA sends reciprocal connections back to the LPBN to regulate its activity.',
                        description: 'TBD',
                        comments: []
                    },
                ],
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
            {
                id: 11,
                nodeIds: ['6', '7', '9'],
                edgeIds: ['e6-9', 'e7-9'],
                claims: [
                    {
                        title: 'The anterior cingulate cortex (ACC) integrates information from the insula and amygdala for affective-motivational processing.',
                        description: 'TBD',
                        comments: ['', '']
                    },
                ],
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
            {
                id: 12,
                nodeIds: ['4', '6', '9', '10'],
                edgeIds: ['e4-10', 'e6-10', 'e9-10'],
                claims: [
                    {
                        title: 'The prefrontal cortex integrates cortical processing to determine responses to the pain signal.',
                        description: 'TBD',
                        comments: ['', '', '', '', '']
                    },
                ],
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
            {
                id: 13,
                nodeIds: ['9', '10', '11'],
                edgeIds: ['e9-11', 'e10-11'],
                claims: [
                    {
                        title: 'Descending control of pain originates from the convergence of cortical processing on the periaqueductal gray (PAG).',
                        description: 'TBD',
                        comments: ['', '']
                    },
                ],
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
            {
                id: 14,
                nodeIds: ['11', '12'],
                edgeIds: ['e11-12'],
                claims: [
                    {
                        title: 'The PAG shows increased activity in ON cells that promote the intensification of pain signals in SpV.',
                        description: 'TBD',
                        comments: ['', '', '', '']
                    },
                    {
                        title: 'These ON cells sends glutamatergic output to the rostral ventromedial medulla (RVMM), stimulating the GABAergic neurons located there.',
                        description: 'TBD',
                        comments: ['',]
                    },
                ],
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
            {
                id: 15,
                nodeIds: ['12', '1'],
                edgeIds: ['e12-1'],
                claims: [
                    {
                        title: 'The stimulated neurons of the RVMM send increased GABAergic output to local GABAergic interneurons in SpV, resulting in decreased inhibition of SpV second-order nociceptive neurons.',
                        description: 'TBD',
                        comments: ['', '', '']
                    },
                    {
                        title: 'This decreased inhibition of SpV drives the maintenance of chronic pain states in the absence of continued tissue damage.',
                        description: 'TBD',
                        comments: ['', '', '', '', '', '', '']
                    },
                ],
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
        stars: 14,
        name: 'How does psychological stress affect the central nervous system?',
        authors: ['Jane Doe', 'John Doe'],
        conditions: [],
        lastUpdated: 'February 12th, 2023',
        nodes: [],
        edges: [],
        steps: [],
    },
    {
        id: 3,
        stars: 13,
        name: 'Which neural regions mediate both anxiety and depression?',
        authors: ['Matti Meikäläinen', 'Maija Meikäläinen'],
        conditions: [],
        lastUpdated: 'February 7th, 2023',
        nodes: [],
        edges: [],
        steps: [],
    },
    {
        id: 4,
        stars: 13,
        name: 'What is the neurodevelopmental basis of ADHD?',
        authors: ['Fulan AlFulani'],
        conditions: [],
        lastUpdated: 'February 3rd, 2023',
        nodes: [],
        edges: [],
        steps: [],
    },
    {
        id: 5,
        stars: 12,
        name: 'How do satellite glial cells contribute to peripheral and central sensitization?',
        authors: ['Li Si', 'Zhang San', 'Wang Wu'],
        conditions: [],
        lastUpdated: 'February 2nd, 2023',
        nodes: [],
        edges: [],
        steps: [],
    },
    {
        id: 6,
        stars: 9,
        name: 'How is the hippocampus affected by PTSD?',
        authors: ['Navn Navnesen'],
        conditions: [],
        lastUpdated: 'February 2nd, 2023',
        nodes: [],
        edges: [],
        steps: [],
    },
    {
        id: 7,
        stars: 7,
        name: 'Which neural circuits govern the carotid sinus stretch reflex?',
        authors: ['Peter Petrov'],
        conditions: [],
        lastUpdated: 'January 30th, 2023',
        nodes: [],
        edges: [],
        steps: [],
    },
    {
        id: 8,
        stars: 3,
        name: 'How does the nervous system regulate breath patterns?',
        authors: ['Chan Tai Man', 'Chris Wong'],
        conditions: [],
        lastUpdated: 'January 28th, 2022',
        nodes: [],
        edges: [],
        steps: [],
    },
    {
        id: 9,
        stars: 2,
        name: 'Chronic pain, orofacial',
        authors: ['Jan Novák', 'Eva Nováková'],
        conditions: [],
        lastUpdated: 'January 26th, 2022',
        nodes: [
            {
                id: '1',
                data: {label: 'Aδ Fibers', abbreviation: 'AδF'},
                style: {},
                children: [],
            },
            {
                id: '2',
                data: {label: 'C Fibers', abbreviation: 'CF'},
                style: {},
                children: [],
            },
            {
                id: '3',
                data: {label: 'Trigeminal Ganglion', abbreviation: 'TG'},
                style: {},
                children: [],
            },
            {
                id: '4',
                data: {label: 'Caudal Part of Spinal Trigeminal Nucleus', abbreviation: 'SpV'},
                style: {},
                children: [],
            },
            {
                id: '5',
                data: {label: 'Ventral Posteromedial Nucleus', abbreviation: 'VPM'},
                style: {},
                children: [],
            },
            {
                id: '6',
                data: {label: 'Ventral Posterior Inferior', abbreviation: 'VPi'},
                style: {},
                children: [],
            },
            {
                id: '7',
                data: {label: 'Ventral Medial Nucleus', abbreviation: 'VMN'},
                style: {},
                children: [],
            },
            {
                id: '8',
                data: {label: 'Thalamic Reticular Nucleus', abbreviation: 'TRN'},
                style: {},
                children: [],
            },
            {
                id: '9',
                data: {label: 'Lateral Parabrachial Nucleus', abbreviation: 'LPBN'},
                style: {},
                children: [],
            },
            {
                id: '10',
                data: {label: 'Primary Somatosensory Cortex', abbreviation: 'S1'},
                style: {},
                children: [],
            },
            {
                id: '11',
                data: {label: 'Secondary Somatosensory Cortex', abbreviation: 'S2'},
                style: {},
                children: [],
            },
            {
                id: '12',
                data: {label: 'Posterior Insula', abbreviation: 'PI'},
                style: {},
                children: [],
            },
            {
                id: '13',
                data: {label: 'Anterior Insula', abbreviation: 'AI'},
                style: {},
                children: [],
            },
            {
                id: '14',
                data: {label: 'Basolateral Nucleus of Amygdala', abbreviation: 'BLA'},
                style: {},
                children: [],
            },
            {
                id: '15',
                data: {label: 'Central Nucleus of Amygdala', abbreviation: 'CeA'},
                style: {},
                children: [],
            },
            {
                id: '16',
                data: {label: 'Anterior Cingulate Cortex', abbreviation: 'ACC'},
                style: {},
                children: [],
            },
            {
                id: '17',
                data: {label: 'Posterior Cingulate Cortex', abbreviation: 'PCC'},
                style: {},
                children: [],
            },
            {
                id: '18',
                data: {label: 'Dorsolateral Prefrontal Cortex', abbreviation: 'dlPFC'},
                style: {},
                children: [],
            },
            {
                id: '19',
                data: {label: 'Ventromedial Prefrontal Cortex', abbreviation: 'vmPFC'},
                style: {},
                children: [],
            },
            {
                id: '20',
                data: {label: 'Periaqueductal Gray', abbreviation: 'PAG'},
                style: {},
                children: [],
            },
            {
                id: '21',
                data: {label: 'Rostral Ventromedial Medulla', abbreviation: 'RVMM'},
                style: {},
                children: [],
            },
            {
                id: '22',
                data: {label: 'Nucleus of Tractus Solitarius', abbreviation: 'NTS'},
                style: {},
                children: [],
            },
            {
                id: '23',
                data: {label: 'Glossopharyngeal Ganglia', abbreviation: 'GG'},
                style: {},
                children: [],
            },
            {
                id: '24',
                data: {label: 'Vagal Ganglia', abbreviation: 'VG'},
                style: {},
                children: [],
            },
            {
                id: '25',
                data: {label: 'Facial Ganglia', abbreviation: 'FG'},
                style: {},
                children: [],
            },
        ],
        edges: [
            {source: '1', target: '3', animated: true, style: {stroke: 'lightgray'},},
            {source: '2', target: '3', animated: true, style: {stroke: 'lightgray'},},
            {source: '3', target: '4', animated: true, style: {stroke: 'lightgray'},},
            {source: '4', target: '5', animated: true, style: {stroke: 'lightgray'},},
            {source: '4', target: '9', animated: true, style: {stroke: 'lightgray'},},
            {source: '5', target: '10', animated: true, style: {stroke: 'lightgray'},},
            {source: '5', target: '12', animated: true, style: {stroke: 'lightgray'},},
            {source: '6', target: '11', animated: true, style: {stroke: 'lightgray'},},
            {source: '7', target: '12', animated: true, style: {stroke: 'lightgray'},},
            {source: '7', target: '13', animated: true, style: {stroke: 'lightgray'},},
            {source: '8', target: '5', animated: true, style: {stroke: 'lightgray'},},
            {source: '8', target: '6', animated: true, style: {stroke: 'lightgray'},},
            {source: '8', target: '7', animated: true, style: {stroke: 'lightgray'},},
            {source: '9', target: '12', animated: true, style: {stroke: 'lightgray'},},
            {source: '9', target: '14', animated: true, style: {stroke: 'lightgray'},},
            {source: '9', target: '19', animated: true, style: {stroke: 'lightgray'},},
            {source: '9', target: '20', animated: true, style: {stroke: 'lightgray'},},
            {source: '9', target: '22', animated: true, style: {stroke: 'lightgray'},},
            {source: '10', target: '8', animated: true, style: {stroke: 'lightgray'},},
            {source: '10', target: '11', animated: true, style: {stroke: 'lightgray'},},
            {source: '11', target: '8', animated: true, style: {stroke: 'lightgray'},},
            {source: '11', target: '10', animated: true, style: {stroke: 'lightgray'},},
            {source: '11', target: '12', animated: true, style: {stroke: 'lightgray'},},
            {source: '12', target: '8', animated: true, style: {stroke: 'lightgray'},},
            {source: '12', target: '11', animated: true, style: {stroke: 'lightgray'},},
            {source: '12', target: '13', animated: true, style: {stroke: 'lightgray'},},
            {source: '13', target: '8', animated: true, style: {stroke: 'lightgray'},},
            {source: '13', target: '12', animated: true, style: {stroke: 'lightgray'},},
            {source: '13', target: '14', animated: true, style: {stroke: 'lightgray'},},
            {source: '13', target: '16', animated: true, style: {stroke: 'lightgray'},},
            {source: '13', target: '18', animated: true, style: {stroke: 'lightgray'},},
            {source: '13', target: '19', animated: true, style: {stroke: 'lightgray'},},
            {source: '14', target: '12', animated: true, style: {stroke: 'lightgray'},},
            {source: '14', target: '13', animated: true, style: {stroke: 'lightgray'},},
            {source: '14', target: '15', animated: true, style: {stroke: 'lightgray'},},
            {source: '14', target: '16', animated: true, style: {stroke: 'lightgray'},},
            {source: '15', target: '9', animated: true, style: {stroke: 'lightgray'},},
            {source: '15', target: '14', animated: true, style: {stroke: 'lightgray'},},
            {source: '15', target: '20', animated: true, style: {stroke: 'lightgray'},},
            {source: '15', target: '22', animated: true, style: {stroke: 'lightgray'},},
            {source: '16', target: '13', animated: true, style: {stroke: 'lightgray'},},
            {source: '16', target: '14', animated: true, style: {stroke: 'lightgray'},},
            {source: '16', target: '17', animated: true, style: {stroke: 'lightgray'},},
            {source: '16', target: '18', animated: true, style: {stroke: 'lightgray'},},
            {source: '16', target: '19', animated: true, style: {stroke: 'lightgray'},},
            {source: '16', target: '20', animated: true, style: {stroke: 'lightgray'},},
            {source: '17', target: '16', animated: true, style: {stroke: 'lightgray'},},
            {source: '18', target: '20', animated: true, style: {stroke: 'lightgray'},},
            {source: '19', target: '20', animated: true, style: {stroke: 'lightgray'},},
            {source: '20', target: '21', animated: true, style: {stroke: 'lightgray'},},
            {source: '21', target: '4', animated: true, style: {stroke: 'lightgray'},},
            {source: '22', target: '4', animated: true, style: {stroke: 'lightgray'},},
            {source: '23', target: '22', animated: true, style: {stroke: 'lightgray'},},
            {source: '24', target: '22', animated: true, style: {stroke: 'lightgray'},},
            {source: '25', target: '22', animated: true, style: {stroke: 'lightgray'},},
            // {source: '', target: '', animated: true, style: {stroke: 'lightgray'},},
        ],
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