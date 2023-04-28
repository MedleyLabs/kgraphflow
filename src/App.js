import React, { useState } from 'react';

import ViewFactory from './components/ViewFactory.js';
import './styles/main.css';

const App = () => {

    const defaultViewType = 'flowExplorerView';

    const defaultViewProps = {
        flowExplorerView: {baseEntity: 'Amygdala'},
        flowConnectomeView: {networkIndices: [0]},
    };

    const [history, setHistory] = useState([
        { type: defaultViewType, props: defaultViewProps[defaultViewType] },
    ]);
    const [historyIdx, setHistoryIdx] = useState(0);

    const setView = (type, props) => {
        setHistory((prevHistory) => {

            // Remove history entries after current index
            const newHistory = prevHistory.slice(0, historyIdx + 1);

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

    const currentView = history[historyIdx];

    return (
        <ViewFactory
            view={currentView}
            setView={setView}
            isBackActive={historyIdx > 0}
            goBack={goBack}
            isForwardActive={historyIdx < history.length - 1}
            goForward={goForward}
        />
    );
};

export default App;