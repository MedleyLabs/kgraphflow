import React, { useState } from 'react';

import ViewFactory from './components/ViewFactory.js';
import networkData from './data/networkData.js';

import './styles/main.css';

const App = () => {

    const defaultViewType = 'flowConnectomeView';

    const defaultViewProps = {
        flowExplorerView: {baseEntity: 'Amygdala'},
        flowConnectomeView: {
            modality: 'Functional connectivity',
            networks: [0, 1].map(idx => networkData[idx]),
            regions: [
                {name: 'Cortex of insula'},
                {name: 'Median preoptic nucleus'},
                {name: 'Supraoptic nucleus'},
                {name: 'Vascular organ of the lamina terminalis'},
            ],
            coordinates: [
                {x: 36, y: -26, z: 16},
                {x: -14, y: -102, z: 4},
                {x: 6, y: 0, z: 38}
            ],
        },
        flowExtractView: {},
        searchView: {},
    };

    const [history, setHistory] = useState([
        {type: defaultViewType, props: defaultViewProps[defaultViewType]},
    ]);
    const [historyIdx, setHistoryIdx] = useState(0);

    const setView = (type, props) => {
        setHistory((prevView) => {
            // Remove history entries after current index
            const newHistory = prevView.slice(0, historyIdx + 1);

            // Add new history entry
            newHistory.push({type: type, props: props});

            return newHistory;
        });
        setHistoryIdx((prevIndex) => prevIndex + 1);
    };

    const goBack = () => {
        if (historyIdx > 0) {
            setHistoryIdx((prevIndex) => prevIndex - 1);
        }
    };

    const goForward = () => {
        if (historyIdx < history.length - 1) {
            setHistoryIdx((prevIndex) => prevIndex + 1);
        }
    };

    return (
        <ViewFactory
            view={history[historyIdx]}
            setView={setView}
            canGoBack={historyIdx > 0}
            goBack={goBack}
            canGoForward={historyIdx < history.length - 1}
            goForward={goForward}
        />
    );
};

export default App;
