import React from 'react';
import styled from 'styled-components';

import infoAvailableIcon from '../assets/info-available-icon.png'

const Icon = styled.img`
  color: dodgerblue;
  height: 14px;
  width: 14px;
  margin-left: 5px;
`

function InfoAvailableIcon(props) {

    return (
        <Icon src={infoAvailableIcon} {...props} />
    );
}

export default InfoAvailableIcon;
