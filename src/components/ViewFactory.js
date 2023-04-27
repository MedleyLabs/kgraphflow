import React from 'react';

import FlowWithProvider from './FlowWithProvider.js';

import FlowBuilderView from './views/FlowBuilderView.js';
import FlowCircuitView from './views/FlowCircuitView.js';
import FlowConnectomeView from './views/FlowConnectomeView.js';
import FlowExplorerView from './views/FlowExplorerView.js';
import FlowFinderView from './views/FlowFinderView.js';
import FlowTourView from './views/FlowTourView.js';
import FlowVisualizerView from './views/FlowVisualizerView.js';

import '../styles/main.css';

const ViewFactory = ({ viewType, setViewType, viewProps, setViewProps }) => {

    function wrapWithProvider(Flow, props) {

        props = {
            viewType: viewType,
            setViewType: setViewType,
            viewProps: viewProps,
            setViewProps: setViewProps,
            ...props
        };

        return <FlowWithProvider flow={React.createElement(Flow, props)} />;
    }

    switch (viewType) {
        case 'flowBuilderView':
            return wrapWithProvider(FlowBuilderView);
        case 'flowCircuitView':
            return wrapWithProvider(FlowCircuitView);
        case 'flowConnectomeView-0':
            return wrapWithProvider(FlowConnectomeView, {initialIdx: 0});
        case 'flowConnectomeView-1':
            return wrapWithProvider(FlowConnectomeView, {initialIdx: 1});
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
