import React, {useState} from 'react';
import styled from 'styled-components';

import InfoAvailableIcon from './InfoAvailableIcon.js';
import TriangleDownIcon from './svg/TriangleDownIcon.js';
import TriangleRightIcon from './svg/TriangleRightIcon.js';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 21px;
  border-bottom: 1px solid lightgray;
  padding-bottom: 20px;
`

const SectionHeader = styled.div`
  display: flex;
  flex-direction: row;
`

const SectionColumn = styled.div`
  flex: 1;
`

const SectionTitle = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
  font-weight: bold;
`

const SectionBody = styled.div`
  font-family: 'Nunito', sans-serif;
  font-size: 0.95em;
`


function SidebarSection(props) {

    const [isOpen, setIsOpen] = useState(props.defaultIsOpen);

    const toggleCallback = () => {
        setIsOpen(!isOpen)
    }

    if (!props.description) return null;

    const toggleStyles = {
        height: 14,
        width: 14,
        marginRight: 5,
        transform: 'translateY(1px)',
    }

    return (
        <Section style={isOpen ? props.style : {}}>
            <SectionHeader>
                <SectionColumn style={{flex: "0 0 auto"}}>
                    {isOpen
                        ? <TriangleDownIcon styles={toggleStyles} onClick={toggleCallback}/>
                        : <TriangleRightIcon styles={toggleStyles} onClick={toggleCallback}/>
                    }
                </SectionColumn>
                <SectionColumn style={{}}>
                    <SectionTitle>{props.title}</SectionTitle>
                    {!isOpen && props.description !== 'TBD' && props.description !== 'None specified' && !props.suppressIcon
                        ? <InfoAvailableIcon style={{transform: "translate(0, 1px)"}}/>
                        : null
                    }
                    <SectionBody style={isOpen ? {marginTop: '1em'} : {}}>
                        {isOpen
                            ? typeof(props.description) === "string"
                                ? <div dangerouslySetInnerHTML={{__html: props.description.replaceAll("\\n", "<br/>")}}/>
                                : <div>{props.description}</div>
                            : null
                        }
                    </SectionBody>
                    {props.footer}
                </SectionColumn>
            </SectionHeader>
        </Section>
    );
}

export default SidebarSection;
