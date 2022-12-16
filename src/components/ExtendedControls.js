import {Controls, ControlButton} from 'reactflow';

import filterImage from '../assets/filterImage.png'
import searchImage from '../assets/searchImage.png'
import settingsImage from '../assets/settingsImage.png'

function ExtendedControls(props) {

  return (
    <Controls>
      {props.filterCallback ? (
        <ControlButton onClick={props.filterCallback}>
          <div><img src={filterImage} alt='F' height={12} width={12}/></div>
        </ControlButton>
      ) : null}
      {props.searchCallback ? (
        <ControlButton onClick={props.searchCallback}>
          <div><img src={searchImage} alt='S' height={13} width={13}/></div>
        </ControlButton>
      ) : null}
      {props.settingsCallback ? (
        <ControlButton onClick={props.settingsCallback}>
          <div><img src={settingsImage} alt='F' height={12} width={12}/>️</div>
        </ControlButton>
      ) : null}
    </Controls>
  );
}

export default ExtendedControls;
