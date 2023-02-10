import React, { useState } from 'react';
import styled from 'styled-components';
import ListSelector from "./ListSelector";
import BlueButton from "./Button";

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
  width: 300px;
  height: 200px;
  padding: 20px;
  z-index: 10000 !important;
  opacity: 1;
  top: 10px;
  right: 50px;
`

const ModalHeading = styled.h2`
  margin-top: 0;
  position: relative;
`

const SettingsModal = (props) => {

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
        </ModalWindow>
    );
};

export default SettingsModal;