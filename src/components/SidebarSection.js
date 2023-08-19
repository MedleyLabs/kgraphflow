import React, { useState } from 'react';
import styled from 'styled-components';

import TriangleDownIcon from './svg/TriangleDownIcon.js';
import TriangleRightIcon from './svg/TriangleRightIcon.js';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid lightgray;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 0 0 8px 0;
  margin-top: 12px;
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: row;
`;

const SectionBody = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 15px;
  font-weight: 300;
  padding: 18px 0 0 20px;
`;

const SectionColumn = styled.div`
  flex: 0 0 auto;
  font-family: 'Roboto', sans-serif;
  font-size: 15px;
  font-weight: 300;
  color: #555;
`;

const SectionTitle = styled.span``;

const AddButton = styled.div`
  
  margin-left: 2px;
  
  &:hover {
    color: dodgerblue;
    font-weight: 400;
  }
`;

const SidebarSection = ({ title, description, addNewCallback, style, defaultIsOpen=true }) => {

    const [isOpen, setIsOpen] = useState(defaultIsOpen);

    const toggleCallback = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Section style={style}>
            <SectionHeader>
                <SectionColumn>
                    {isOpen
                        ? <TriangleDownIcon onClick={toggleCallback} />
                        : <TriangleRightIcon onClick={toggleCallback} />
                    }
                </SectionColumn>
                <SectionColumn style={{width: 365}}>
                    <SectionTitle>{title.toUpperCase()}</SectionTitle>
                </SectionColumn>
                <SectionColumn style={{fontSize: 24, marginTop: -5}}>
                    <AddButton onClick={addNewCallback}>+</AddButton>
                </SectionColumn>
            </SectionHeader>
            {isOpen && description
                ? (
                    typeof (description) === "string"
                        ? <SectionBody dangerouslySetInnerHTML={{__html: description.replaceAll("\\n", "<br/>")}}/>
                        : <SectionBody>{description}</SectionBody>
                )
                : null
            }
        </Section>
    );
};

export default SidebarSection;
