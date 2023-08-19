import React, { useState } from 'react';
import styled from 'styled-components';

import HomeIcon from './svg/HomeIcon.js';
import ArrowLeftIcon from "./svg/ArrowLeftIcon";
import ArrowRightIcon from "./svg/ArrowRightIcon";

const Container = styled.div`
  height: 60px;
  -webkit-user-select: none; /* Disable text selection for Safari */
  -moz-user-select: none; /* Disable text selection for Firefox */
  -ms-user-select: none; /* Disable text selection for Internet Explorer/Edge */
  user-select: none; /* Disable text selection for other browsers */
`;

const TutorialLink = styled.a`
  position: absolute;
  top: 18.5px;
  left: 141px;
  color: #404040;
  font-family: Nunito, sans-serif;
  font-size: 18px;

  :hover {
    color: dodgerblue;
  }
`;

const arrowStyles = {
    position: 'absolute',
    top: 20,
    height: 22,
    zIndex: '1000 !important',
}

const SidebarHeader = ({
    canGoBack,
    goBack,
    canGoForward,
    goForward
}) => {

    const [hovered, setHovered] = useState(false);

    return (
        <Container>
            <a href={process.env.REACT_APP_ROOT_URL}><HomeIcon/></a>
            <ArrowLeftIcon
                isActive={canGoBack}
                onClick={goBack}
                style={{...arrowStyles, left: 57}}
            />
            <ArrowRightIcon
                isActive={canGoForward}
                onClick={goForward}
                style={{...arrowStyles, left: 92}}
            />
            <TutorialLink
                href=""
                target="_blank"
                onMouseEnter={() => {
                    setHovered(true);
                }}
                onMouseLeave={() => {
                    setHovered(false);
                }}
            >{hovered ? 'Coming soon!' : 'Tutorial'}
            </TutorialLink>
        </Container>
    )
}

export default SidebarHeader;
