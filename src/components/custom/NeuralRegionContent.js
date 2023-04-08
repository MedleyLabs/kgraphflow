import React from 'react';
import styled from "styled-components";

import SidebarSection from '../SidebarSection.js';

const Link = styled.a`
  &:hover {
    color: dodgerblue;
  }
`

const ListItem = ({ value, onClick }) => (
    <li onClick={onClick}>{value}</li>
);

const List = ({ items, onItemClick }) => (
    <ul>
        {
            items.map((item, i) => <ListItem key={i} value={item} onClick={onItemClick} />)
        }
    </ul>
);

function NeuralRegionContent(props) {

    const clickCallback = (event) => {
        props.setBaseEntity(event.target.textContent)
    }

    const mapToLinks = (items) => {
        return items.map((item) => {
            return (
                <>
                    <span className="sidebar-link" onClick={clickCallback}>{item}</span>
                    <br/>
                </>
            );
        })
    }

    console.log('PROPS', props.header)

    return (
        <>
            <div className='content-header'>🧠 Neural Region</div>
            <div className='content-body'>{props.header || 'TBD'}</div>
            <div className='sidebar-body'>
                <SidebarSection title='Parents' description={props.content.parents.length > 0 ? mapToLinks(props.content.parents) : 'None specified'} defaultIsOpen={true}/>
                <SidebarSection title='Children' description={props.content.children.length > 0 ? mapToLinks(props.content.children): 'None specified'} defaultIsOpen={true}/>
                <SidebarSection title='Arterial Supply' description={props.content.arterialSupply.length > 0 ? mapToLinks(props.content.arterialSupply) : 'None specified'} defaultIsOpen={true}/>
                {/*<SidebarSection title='⌖ Location' description={props.content && props.content.location || 'TBD' } />*/}
                <SidebarSection title='Cell Types' description={props.header === 'Primary motor cortex' ? props.content.cellTypes : null} defaultIsOpen={true} style={props.header === 'Primary motor cortex' ? {height: 420} : {}}/>
                {/*<SidebarSection title='Gene Expression' description={props.content && props.content.geneExpression || 'TBD'} defaultIsOpen={true}/>*/}
                {/*<SidebarSection title='Receptor Expression' description={props.content && props.content.receptorExpression || 'TBD'} defaultIsOpen={true}/>*/}
                {/*<SidebarSection title='Neurotransmitter Expression' description={props.content && props.neurotransmitterExpression || 'TBD'} defaultIsOpen={true}/>*/}
            </div>
        </>
    );
}

export default NeuralRegionContent;
