import React from 'react';

import NetworkMultiSelector from '../NetworkMultiSelector.js';

function NetworkContent({ setView, networks, activeNetworks, setActiveNetworks }) {

    return (
        <>
            <div className='content-header'>{'⚙️ Network Visualizer'}
                <i style={{fontSize: 12, marginLeft: 12, fontWeight: "normal"}}>Super beta</i>
            </div>
            <div style={{marginTop: 30}}>
                <i>Disclaimer: The nodes and edges of these networks were manually created by aggregating findings from research papers and hence have not been validated. They are intended for demonstration purposes only.</i>
            </div>
            <div className='content-body'/>
            <div className='sidebar-body'>
                <NetworkMultiSelector
                    setView={setView}
                    networks={networks}
                    activeNetworks={activeNetworks}
                    setActiveNetworks={setActiveNetworks}
                />
            </div>
        </>
    );
}

export default NetworkContent;
