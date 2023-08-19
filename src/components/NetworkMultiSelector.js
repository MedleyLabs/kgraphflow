import React, { useState } from 'react';
import styled from 'styled-components';

import SidebarSection from "./SidebarSection";

const AddNew = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid lightgray;

  &:hover {
    color: dodgerblue;
  }
`;

const NetworkMultiSelector = ({setView, networks, activeNetworks, setActiveNetworks}) => {

    const [hover, setHover] = useState(false);

    const Row = ({network}) => {

        const isActive = activeNetworks.includes(network.id);

        const toggleActive = () => {
            if (isActive) {
                setActiveNetworks(activeNetworks => activeNetworks.filter(e => e !== network.id));
            } else {
                setActiveNetworks(activeNetworks => [...activeNetworks, network.id]);
            }
        };

        return (
            <div onClick={() => {
                toggleActive()
            }}>
                <input
                    type="checkbox"
                    id="item"
                    name="subscribe"
                    value="newsletter"
                    checked={isActive}
                    readOnly
                />
                <label htmlFor="subscribeNews"/>
                <span
                    className="sidebar-link"
                    aria-label={network.name}
                    style={{marginLeft: 5}}
                >{network.name}</span>
                <br/>
            </div>
        );
    };

    const mapToLinks = (networks) => {
        {networks.map((network) => {
            return <Row network={network} key={network.id} />
        })}
    }

    console.log('NETWORKS', networks)

    return (
        <SidebarSection
            title='Networks'
            description={networks.length > 0 ? mapToLinks(networks) : 'None specified'}
            defaultIsOpen={true}
            style={{paddingTop: 12, borderTop: '1px solid lightgray'}}
        />
    );

};

export default NetworkMultiSelector;
