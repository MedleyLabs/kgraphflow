import React, {useState} from 'react';

import ViewFactory from './components/ViewFactory.js';

function App() {

    const defaultViewType = 'flowExplorerView';

    const [viewType, setViewType] = useState(defaultViewType);
    const [viewProps, setViewProps] = useState({});

    return (
        <ViewFactory
            viewType={viewType}
            setViewType={setViewType}
            viewProps={viewProps}
            setViewProps={setViewProps}
        />
    );
}

export default App;
