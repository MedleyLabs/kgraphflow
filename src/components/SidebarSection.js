import React, {useState} from 'react';
import styled from 'styled-components';

import InfoAvailableIcon from './InfoAvailableIcon.js';

import rightTriangleIcon from '../assets/triange-right-sharp.png';
import downTriangleIcon from '../assets/triangle-down-sharp.png';


const Section = styled.div`
  margin-bottom: 6px;
  border-bottom: 1px solid lightgray;
  padding-bottom: 6px;
`

const SectionHeader = styled.div`
  display: flex;
  flex-direction: row;
`

const SectionColumn = styled.div`
  flex: 1;
`

const ToggleIcon = styled.img`
  height: 14px;
  width: 14px;
  margin-right: 5px;
  transform: translateY(1px);
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

    return (
        <Section>
            <SectionHeader onClick={toggleCallback}>
                <SectionColumn style={{flex: "0 0 auto"}}>
                    <ToggleIcon src={isOpen ? downTriangleIcon : rightTriangleIcon}/>
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
