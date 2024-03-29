import React from "react";
import styled from "styled-components";

const Image = styled.img`
  position: absolute;
  height: 33px;
  width: 33px;
  border-radius: 50%;
  z-index: 1000;
`

const ProfilePicture = ({src, alt, style}) => {

    const openProfile = () => {

    };

    return (
        <Image src={src} alt={alt} style={style} onClick={openProfile}/>
    );
}

export default ProfilePicture;
