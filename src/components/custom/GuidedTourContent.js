import React, {useState} from 'react';
import SidebarSection from '../SidebarSection.js';
import Button from '../Button.js';

function GuidedTourContent(props) {

  const [tourIsActive, setTourIsActive] = useState(false);

  console.log('stepNumber', props.stepNumber)

  return (
    <>
      <div className='content-header'>♻️ Guided Tour</div>
      <div className='content-body'>Chronic Orofacial Pain</div>
      <div className='sidebar-body'>
        {props.stepNumber === 0
          ? <Button onClick={() => { setTourIsActive(!tourIsActive); props.nextCallback(0) }}>Start Tour</Button>
          : (<>
              <Button onClick={() => { props.backCallback(props.stepNumber) }} >Back</Button>
              <Button onClick={() => { props.nextCallback(props.stepNumber) }} >Next</Button>
             </>
            )
        }
        <SidebarSection title={props.title} description={props.description} />
      </div>
    </>
  );
}

export default GuidedTourContent;
