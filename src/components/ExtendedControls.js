import {useState} from 'react';
import {Controls, ControlButton} from 'reactflow';

import filterImage from '../assets/filterImage.png'
import searchImage from '../assets/searchImage.png'
import settingsImage from '../assets/settingsImage.png'

import AutoCompleteSearch from './Autocomplete.js';
import SettingsModal from './SettingsModal.js';

function ExtendedControls(props) {

  const [filterIsActive, setFilterIsActive] = useState(false);
  const [searchIsActive, setSearchIsActive] = useState(false);
  const [settingsIsActive, setSettingsIsActive] = useState(false);

  return (
    <>
      <Controls>
        {props.filterCallback ? (
          <ControlButton id='filter-button' onClick={() => {setFilterIsActive(!filterIsActive)} }>
            <div><img src={filterImage} alt='F' height={12} width={12}/></div>
          </ControlButton>
        ) : null}
        {props.searchCallback ? (
          <ControlButton id='search-button' onClick={() => {setSearchIsActive(!searchIsActive)} }>
            <div><img src={searchImage} alt='S' height={13} width={13}/></div>
          </ControlButton>
        ) : null}
        {props.settingsCallback ? (
          <ControlButton id='settings-button' onClick={() => {setSettingsIsActive(!settingsIsActive)} }>
            <div><img src={settingsImage} alt='F' height={12} width={12}/>️</div>
          </ControlButton>
        ) : null}
      </Controls>
      {filterIsActive ? <AutoCompleteSearch callback={props.filterCallback} /> : null}
      {searchIsActive ? <AutoCompleteSearch callback={props.searchCallback} /> : null}
      {settingsIsActive ? <SettingsModal viewType={props.viewType} callback={props.settingsCallback} doneCallback={() => {setSettingsIsActive(false)}} /> : null}
    </>
  );
}

export default ExtendedControls;
