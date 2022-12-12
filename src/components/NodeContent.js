import React from 'react';
import SidebarSection from './SidebarSection.js';

function NodeContent(props) {

  return (
    <>
      <div className='sidebar-header'>🧠 {props.header}</div>
      <div className='sidebar-body'>
        <SidebarSection title='Location' description={props.content.location || 'TBD' } />
        <SidebarSection title='Physiology' description={props.content.physiology || 'TBD' } />
        <SidebarSection title='Cytoarchitecture' description={props.content.cytoarchitecture || 'TBD' } />
        <SidebarSection title='Gene expression' description={props.content.geneExpression || 'TBD' } />
        <SidebarSection title='Receptor expression' description={props.content.receptorExpression || 'TBD' } />
        <SidebarSection title='Neurotransmitter expression' description={props.neurotransmitterExpression || 'TBD' } />
      </div>
    </>
  );
}

export default NodeContent;
