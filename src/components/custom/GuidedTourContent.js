import React, {useState} from 'react';
import SidebarSection from '../SidebarSection.js';
import Button from '../Button.js';

function GuidedTourContent(props) {

  console.log(props.stepNumber, props.totalSteps)

  return (
    <>
      <div className='content-header'>♻️ Guided Tour</div>
      <div className='content-body'>Chronic Orofacial Pain</div>
      <div className='content-body' style={{fontStyle: 'italic'}}>Disclaimer: This tour only shows currently known, major neural regions and connections implicated in chronic orofacial pain and does not show all relevant brain regions and connections.</div>
      <div className='sidebar-body'>
        {props.stepNumber === 0
          ? <Button onClick={() => { props.nextCallback(props.stepNumber) }}>Start Tour</Button>
          : (props.stepNumber !== props.totalSteps)
                ? (<>
                     <Button onClick={() => { props.backCallback(props.stepNumber) }} style={{width: 100}}>Back</Button>
                     <Button onClick={() => { props.nextCallback(props.stepNumber) }} style={{width: 100}}>Next</Button>
                   </>)
                : (<>
                    <Button onClick={() => { props.backCallback(props.stepNumber) }} style={{width: 100}}>Back</Button>
                    <Button onClick={() => { props.finishCallback() }} style={{width: 100}}>Finish</Button>
                   </>)
        }
        <SidebarSection title={props.title} description={props.description} />
      </div>
    </>
  );
}

export default GuidedTourContent;
