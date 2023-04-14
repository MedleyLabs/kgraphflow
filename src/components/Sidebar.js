import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border-right: 1px solid #eee;
  padding: 20px 0 20px 30px;
  font-size: 16px;
  background: #fcfcfc;
  width: 35%;
  height: 100%;
  font-family: 'Nunito', sans-serif;
`

const Scrollable = styled.aside`
  height: 100%;
  overflow-y: scroll;
  padding-right: 30px;
`

function Sidebar(props) {

    return (
        <Container>
            {props.header}
            <Scrollable>{props.content}</Scrollable>
        </Container>
    );
}

export default Sidebar;
