import React from 'react';
import styled from 'styled-components';

import SelectOption from './SelectOption.js';

import settingsIcon from '../assets/settings-icon.png';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const SettingsIcon = styled.img`
  height: 20px;
  margin-left: 10px;
`;

const ModalitySettings = ({ view, setView, settingsCallback }) => {
    return (
        <Container>
            <SelectOption
                values={[
                    'Functional connectivity',
                    'Structural connectivity',
                    'Gene expression',
                    'Cell types'
                ]}
                callback={(event) => {
                    setView('flowConnectomeView', {...view.props, modality: event.target.value});
                }}
            />
            <SettingsIcon
                src={settingsIcon}
                alt="Settings"
                onClick={settingsCallback}
            />
        </Container>
    );
};

export default ModalitySettings;
