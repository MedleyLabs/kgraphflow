import React, { useState } from 'react';
import { Controls, ControlButton } from 'reactflow';

import AutoCompleteSearch from './Autocomplete.js';
import SettingsModal from './SettingsModal.js';

import filterImage from '../assets/filterImage.png'
import searchImage from '../assets/searchImage.png'
import settingsImage from '../assets/settingsImage.png'

const ExtendedControls = ({ viewType, filterCallback, searchCallback, settingsCallback }) => {

  const [filterIsActive, setFilterIsActive] = useState(false);
  const [searchIsActive, setSearchIsActive] = useState(false);
  const [settingsIsActive, setSettingsIsActive] = useState(false);

  return (
    <>
      <Controls>
        {filterCallback ? (
          <ControlButton id='filter-button' onClick={() => {setFilterIsActive(!filterIsActive)} }>
            <div><img src={filterImage} alt='F' height={12} width={12}/></div>
          </ControlButton>
        ) : null}
        {searchCallback ? (
          <ControlButton id='search-button' onClick={() => {setSearchIsActive(!searchIsActive)} }>
            <div><img src={searchImage} alt='S' height={13} width={13}/></div>
          </ControlButton>
        ) : null}
        {settingsCallback ? (
          <ControlButton id='settings-button' onClick={() => {setSettingsIsActive(!settingsIsActive)} }>
            <div><img src={settingsImage} alt='F' height={12} width={12}/>️</div>
          </ControlButton>
        ) : null}
      </Controls>
      {filterIsActive ? <AutoCompleteSearch callback={filterCallback} /> : null}
      {searchIsActive ? <AutoCompleteSearch callback={searchCallback} /> : null}
      {settingsIsActive
          ? <SettingsModal
              viewType={viewType}
              callback={settingsCallback}
              doneCallback={() => {setSettingsIsActive(false)}}
          /> : null
      }
    </>
  );
};

export default ExtendedControls;
