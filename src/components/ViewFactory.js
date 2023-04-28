import React from 'react';

import FlowWithProvider from './FlowWithProvider.js';

import FlowBuilderView from './views/FlowBuilderView.js';
import FlowCircuitView from './views/FlowCircuitView.js';
import FlowConnectomeView from './views/FlowConnectomeView.js';
import FlowExplorerView from './views/FlowExplorerView.js';
import FlowFinderView from './views/FlowFinderView.js';
import FlowTourView from './views/FlowTourView.js';
import FlowVisualizerView from './views/FlowVisualizerView.js';

const ViewFactory = ({ view, setView, isBackActive, goBack, isForwardActive, goForward }) => {

    const wrapWithProvider = (Flow) => {

        const props = {
            view: view,
            setView: setView,
            isBackActive: isBackActive,
            goBack: goBack,
            isForwardActive: isForwardActive,
            goForward: goForward,
            ...view.props,
        };

        return <FlowWithProvider flow={React.createElement(Flow, props)} />;
    }

    switch (view.type) {
        case 'flowBuilderView':
            return wrapWithProvider(FlowBuilderView);
        case 'flowCircuitView':
            return wrapWithProvider(FlowCircuitView);
        case 'flowConnectomeView':
            return wrapWithProvider(FlowConnectomeView);
        case 'flowExplorerView':
            return wrapWithProvider(FlowExplorerView);
        case 'flowFinderView':
            return wrapWithProvider(FlowFinderView);
        case 'flowTourView':
            return wrapWithProvider(FlowTourView);
        case 'flowVisualizerView':
            return wrapWithProvider(FlowVisualizerView);
        default:
            return <div>Error: Invalid view type</div>;
    }
}

export default ViewFactory;
