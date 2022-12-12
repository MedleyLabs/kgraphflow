import React from 'react';
import SidebarSection from './SidebarSection.js';

function EdgeContent(props) {

  return (
    <>
      <div className='content-header'>🅰️ 🅱️ Neural pathway</div>
      <div className='content-body'>{props.sourceName} - {props.targetName}</div>
      <div className='sidebar-body'>
        <SidebarSection description={props.description} />
        <SidebarSection title='Citations' description='[1] ...\n\n[2] ...\n\n[3] ...' />
      </div>
    </>
  );
}

export default EdgeContent;
