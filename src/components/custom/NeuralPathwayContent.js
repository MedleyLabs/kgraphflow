import React from 'react';
import SidebarSection from '../SidebarSection.js';

function NeuralPathwayContent(props) {

  return (
    <>
      <div className='content-header'>🅰️ 🅱️ Neural Pathway</div>
      <div className='content-body'>{props.sourceName} - {props.targetName}</div>
      <div className='sidebar-body'>
        <SidebarSection title='Mentions in Literature' description='This connection is mentioned <a href="">72</a> times across <a href="">16</a> research papers.'></SidebarSection>
        <SidebarSection title='Connectivity' description={props.description} />
      </div>
    </>
  );
}

export default NeuralPathwayContent;
