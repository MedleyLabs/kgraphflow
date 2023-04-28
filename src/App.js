import React, {useState} from 'react';

import ViewFactory from './components/ViewFactory.js';

const App = () => {

    const defaultViewType = 'flowExplorerView';

    const defaultViewProps = {
        flowExplorerView: {baseEntity: 'Amygdala'},
        flowConnectomeView: {initialIdx: 0},
    };

    const [viewType, setViewType] = useState(defaultViewType);
    const [viewProps, setViewProps] = useState(defaultViewProps[defaultViewType]);

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
