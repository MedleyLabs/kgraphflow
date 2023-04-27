import React, {useState} from 'react';
import styled from 'styled-components';

import InfoAvailableIcon from './InfoAvailableIcon.js';
import TriangleDownIcon from './svg/TriangleDownIcon.js';
import TriangleRightIcon from './svg/TriangleRightIcon.js';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid lightgray;
  height: 100%;
  box-sizing: border-box;
  padding: 18px 0 19px 0;
`

const SectionHeader = styled.div`
  display: flex;
  flex-direction: row;
`

const SectionColumn = styled.div`
  flex: 0 0 auto;
`

const SectionTitle = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 17px;
  font-weight: bold;
`

const SectionBody = styled.div`
  font-family: 'Nunito', sans-serif;
  font-size: 0.95em;
  padding: 18px 0 0 20px;
`


function SidebarSection(props) {

    const [isOpen, setIsOpen] = useState(props.defaultIsOpen);

    const toggleCallback = () => {
        setIsOpen(!isOpen)
    }

    if (!props.description) return null;

    const toggleStyles = {
        height: 15,
        width: 15,
        marginRight: 5,
        transform: 'translateY(1.5px)',
    }

    return (
        <Section style={props.style}>
            <SectionHeader>
                <SectionColumn>
                    {isOpen
                        ? <TriangleDownIcon styles={toggleStyles} onClick={toggleCallback}/>
                        : <TriangleRightIcon styles={toggleStyles} onClick={toggleCallback}/>
                    }
                </SectionColumn>
                <SectionColumn>
                    <SectionTitle>{props.title}</SectionTitle>
                    {!isOpen && props.description !== 'TBD' && props.description !== 'None specified' && !props.suppressIcon
                        ? <InfoAvailableIcon style={{transform: "translate(0, 1px)"}}/>
                        : null
                    }
                </SectionColumn>
            </SectionHeader>
            {isOpen
                ? typeof(props.description) === "string"
                    ? <SectionBody dangerouslySetInnerHTML={{__html: props.description.replaceAll("\\n", "<br/>")}}/>
                    : <SectionBody>{props.description}</SectionBody>
                : null
            }
        </Section>
    );
}

export default SidebarSection;
