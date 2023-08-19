import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border-right: 1px solid lightgray;
  padding: 10px 0 10px 20px;
  background: #fcfcfc;
  width: 25%;
  font-family: 'Nunito', sans-serif;
`;

const Scrollable = styled.aside`
  height: 100%;
  overflow-y: scroll;
  padding-right: 20px; // Positions the scrollbar to the right edge of Container
`;

const Sidebar = ({ header, content}) => {
    return (
        <Container>
            {header}
            <Scrollable>{content}</Scrollable>
        </Container>
    );
};

export default Sidebar;
