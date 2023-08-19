import React, { useState } from 'react';
import styled from 'styled-components';

import SettingsModal from './SettingsModal.js';

import settingsIcon from '../assets/settings-icon.png';
import ListSelector from './ListSelector.js';
import BlueButton from './Button';

const SettingsIcon = styled.img`
  height: 35px;
  width: 35px;
  position: relative;
  right: 10px;
  top: 0;
  z-index: 1000;
`

const ModalWindow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1000;
  //opacity: 0.5;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(100px);
`

const ModalPane = styled.div`
  position: fixed;
  background-color: white;
  border: 1px solid #eee;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 320px;
  height: 200px;
  padding: 20px;
  z-index: 10000 !important;
  opacity: 1;
  top: 4px;
  right: 10px;
`

const ModalHeading = styled.h2`
  margin-top: 0;
  position: relative;
`

function SettingsModal(props) {

    const viewOptions = [
        { value: 'flowBuilderView', label: 'Flow builder' },
        { value: 'flowExplorerView', label: 'Flow explorer' },
        { value: 'flowVisualizerView', label: 'Flow visualizer' },
    ];

    const networkOptions = [
        { value: 'chronicOrofacialPain', label: 'Chronic orofacial pain' },
        { value: 'carotidSinusBaroreflex', label: 'Carotid sinus baroreflex' },
    ];

    return (
        <ModalWindow>
            <ModalPane>
                <div className="modal-content">
                    <ModalHeading>Settings</ModalHeading>
                    <p style={{fontStyle: 'italic'}}>Select a view type</p>
                    <ListSelector value={props.viewType} options={viewOptions} onChange={(event) => { props.callback(event.target.value) }} />
                    {/*{props.viewType === 'guidedTourView'*/}
                    {/*    ? <>*/}
                    {/*        <p style={{fontStyle: 'italic', marginTop: 20}}>Select a network type</p>*/}
                    {/*        <ListSelector value={props.viewType} options={networkOptions} onChange={(event) => { props.callback(event.target.value) }} />*/}
                    {/*      </>*/}
                    {/*    : null*/}
                    {/*}*/}
                    <BlueButton onClick={props.doneCallback} style={{position: 'relative', top: 50}}>
                        Done
                    </BlueButton>
                </div>
            </ModalPane>
        </ModalWindow>
    );
}

function Settings() {

    const [active, setActive] = useState(false);

    const toggleActive = () => {
        setActive(!active);
    }

    return (
        <>
            <SettingsIcon
                src={settingsIcon}
                alt='Settings icon'
                className='settings-icon'
                onClick={() => toggleActive()}
            />
            <SettingsModal
                callback={(viewName) => {
                    setViewName(viewName);
                    setSettingsIsActive(false);
                }}
                doneCallback={() => {
                    setSettingsIsActive(false);
                }}
                setViewName={setViewName}
                viewType={viewName}
            />
        </>
    );
}

export default Settings;
