import React, {useState} from 'react';
import styled from 'styled-components';

import InfoAvailableIcon from './InfoAvailableIcon.js';

import rightTriangleIcon from './right-triangle-icon.png';
import downTriangleIcon from './down-triangle-icon.png';


const Section = styled.div`
  margin-bottom: 40px;
`

const SectionHeader = styled.div`
  margin-bottom: 1em;
  border-bottom: 1px solid lightgray;
  padding-bottom: 5px;
`

const SectionTitle = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1em;
  font-weight: bold;
`

const SectionBody = styled.div`
  font-family: 'Nunito', sans-serif;
  font-size: 1em;
`

const ToggleIcon = styled.img`
  height: 14px;
  width: 14px;
  margin-right: 5px;
  transform: translateY(1px);
`

function SidebarSection(props) {

    const [isOpen, setIsOpen] = useState(true);

    const toggleCallback = () => {
        setIsOpen(!isOpen)
    }

    return (
        <Section>
            <SectionHeader onClick={toggleCallback}>
                <ToggleIcon src={isOpen ? downTriangleIcon : rightTriangleIcon}/>
                <SectionTitle>{props.title}</SectionTitle>
                {!isOpen && props.description !== 'TBD' && props.description !== 'None specified'
                    ? <InfoAvailableIcon style={{transform: "translate(0, 1px)"}}/>
                    : null
                }
            </SectionHeader>
            <SectionBody>
                {isOpen
                    ? typeof(props.description) === "string"
                        ? <div dangerouslySetInnerHTML={{__html: props.description.replaceAll("\\n", "<br/>")}}/>
                        : <div>{props.description}</div>
                    : null
                }
            </SectionBody>
        </Section>
    );
}

export default SidebarSection;
