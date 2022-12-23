import React, { useState } from 'react';
import styled from 'styled-components';
import ListSelector from "./ListSelector";
import BlueButton from "./Button";

const Modal = styled.div`
  position: relative;
  background-color: white;
  border: 1px solid #eee;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  height: 180px;
  padding: 20px;
  z-index: 1000;
  opacity: 1;
  bottom: -588px;
  left: 56px;
`

const ModalHeading = styled.h2`
  margin-top: 0;
  position: relative;
`

const CloseButton = styled.button`
`

const SettingsModal = (props) => {

  const options = [
    { value: 'inputOutputView', label: 'Input-output view' },
    { value: 'guidedTourView', label: 'Guided tour view' },
  ];

  const handleChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <>
      <Modal>
        <div className="modal-content">
          <ModalHeading>Settings</ModalHeading>
          <p style={{fontStyle: 'italic'}}>Select a view type</p>
          <ListSelector value={props.viewType} options={options} onChange={(event) => {console.log(event.target.value); props.callback(event.target.value) }} />
          <BlueButton onClick={props.doneCallback} style={{position: 'relative', top: 50}}>
            Done
          </BlueButton>
        </div>
      </Modal>
    </>
  );
};

export default SettingsModal;