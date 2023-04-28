import React, {useState} from 'react';
import styled from 'styled-components';

import HomeIcon from './svg/HomeIcon.js';
import ArrowLeftIcon from "./svg/ArrowLeftIcon";
import ArrowRightIcon from "./svg/ArrowRightIcon";

const SidebarHeaderContainer = styled.div`
  height: 60px;
  -webkit-user-select: none; /* Disable text selection for Safari */
  -moz-user-select: none; /* Disable text selection for Firefox */
  -ms-user-select: none; /* Disable text selection for Internet Explorer/Edge */
  user-select: none; /* Disable text selection for other browsers */
`

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
`

const arrowStyles = {
    position: 'absolute',
    top: 20,
    height: 22,
    zIndex: '1000 !important',
}

const SidebarHeader = ({
    isBackActive,
    goBack,
    isForwardActive,
    goForward
}) => {

    const [hovered, setHovered] = useState(false);

    return (
        <SidebarHeaderContainer>
            <a href={process.env.REACT_APP_ROOT_URL}><HomeIcon/></a>
            <ArrowLeftIcon
                isActive={isBackActive}
                onClick={goBack}
                style={{...arrowStyles, left: 67}}
            />
            <ArrowRightIcon
                isActive={isForwardActive}
                onClick={goForward}
                style={{...arrowStyles, left: 102}}
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
        </SidebarHeaderContainer>
    )
}

export default SidebarHeader;
