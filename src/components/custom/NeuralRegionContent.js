import React from 'react';
import SidebarSection from '../SidebarSection.js';

function NeuralRegionContent(props) {

  return (
    <>
    <div className='content-header'>🧠 Neural Region</div>
    <div className='content-body'>{props.header}</div>
      <div className='sidebar-body'>
        <SidebarSection title='Location' description={props.content.location || 'TBD' } />
        <SidebarSection title='Physiology' description={props.content.physiology || 'TBD' } />
        <SidebarSection title='Cytoarchitecture' description={props.content.cytoarchitecture || 'TBD' } />
        <SidebarSection title='Gene Expression' description={props.content.geneExpression || 'TBD' } />
        <SidebarSection title='Receptor Expression' description={props.content.receptorExpression || 'TBD' } />
        <SidebarSection title='Neurotransmitter Expression' description={props.neurotransmitterExpression || 'TBD' } />
      </div>
    </>
  );
}

export default NeuralRegionContent;
