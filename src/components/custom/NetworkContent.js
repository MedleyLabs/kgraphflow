import React from 'react';

import NetworkMultiSelector from '../NetworkMultiSelector.js';

function NetworkContent({ networks, setNetworks, activeNetworks, setActiveNetworks, updateNetworks}) {

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
                    networks={networks}
                    setNetworks={setNetworks}
                    activeNetworks={activeNetworks}
                    setActiveNetworks={setActiveNetworks}
                    updateNetworks={updateNetworks}
                />
            </div>
        </>
    );
}

export default NetworkContent;
