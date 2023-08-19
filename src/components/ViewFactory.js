import React from 'react';

import FlowWithProvider from './FlowWithProvider.js';

import FlowBuilderView from './views/FlowBuilderView.js';
import FlowCircuitView from './views/FlowCircuitView.js';
import FlowConnectomeView from './views/FlowConnectomeView.js';
import FlowExplorerView from './views/FlowExplorerView.js';
import FlowFinderView from './views/FlowFinderView.js';
import FlowTourView from './views/FlowTourView.js';
import FlowVisualizerView from './views/FlowVisualizerView.js';
import FlowExtractView from './views/FlowExtractView.js';
import SearchView from './views/SearchView.js';

const ViewFactory = ({ view, setView, canGoBack, goBack, canGoForward, goForward }) => {

    const props = {
        view: view,
        setView: setView,
        canGoBack: canGoBack,
        goBack: goBack,
        canGoForward: canGoForward,
        goForward: goForward,
        ...view.props,
    };

    const wrapWithProvider = (Flow) => {
        return <FlowWithProvider flow={React.createElement(Flow, props)} />;
    };

    switch (view.type) {
        case 'flowBuilderView':
            return wrapWithProvider(FlowBuilderView);
        case 'flowCircuitView':
            return wrapWithProvider(FlowCircuitView);
        case 'flowConnectomeView':
            return wrapWithProvider(FlowConnectomeView);
        case 'flowExplorerView':
            return wrapWithProvider(FlowExplorerView);
        case 'flowExtractView':
            return wrapWithProvider(FlowExtractView);
        case 'flowFinderView':
            return wrapWithProvider(FlowFinderView);
        case 'flowTourView':
            return wrapWithProvider(FlowTourView);
        case 'flowVisualizerView':
            return wrapWithProvider(FlowVisualizerView);
        case 'searchView':
            return React.createElement(SearchView, props);
        default:
            return <div>Error: Invalid view type "{view.type}"</div>;
    }
}

export default ViewFactory;
