import {Controls, ControlButton} from 'reactflow';

function ExtendedControls(props) {

  return (
    <Controls>
      <ControlButton onClick={props.searchCallback}>
        <div>🔎</div>
      </ControlButton>
      <ControlButton onClick={props.settingsCallback}>
        <div>⚙️</div>
      </ControlButton>
    </Controls>
  );
}

export default ExtendedControls;
