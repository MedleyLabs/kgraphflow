import React, {useState} from 'react';
import styled from 'styled-components';

import {networkData} from '../data/networkData.js';

const AddNew = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid lightgray;

  &:hover {
    color: dodgerblue;
  }
`

const NetworkMultiSelector = ({ setView, networks, activeNetworks, setActiveNetworks }) => {

    const [hover, setHover] = useState(false);

    const Row = ({ network }) => {

        const isActive = activeNetworks.includes(network.id);

        const toggleActive = () => {
            if (isActive) {
                setActiveNetworks(activeNetworks => activeNetworks.filter(e => e !== network.id));
            } else {
                setActiveNetworks(activeNetworks => [...activeNetworks, network.id]);
            }
        };

        return (
            <div onClick={() => {toggleActive()}}>
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

    return (
        <>
            <h3>Active</h3>
            {networks.map((network) => {
                return <Row network={network} key={network.id} />
            })}
            <AddNew
                onClick={ networks.length === 1
                    ? () => {
                        setView('flowConnectomeView', {networkIndices: [0, 1]});
                        setActiveNetworks(['reset']);
                    }
                    : null
                }
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >{(!hover || networks?.length === 1) ? '+ Add New' : "That's all for now!"}
            </AddNew>
        </>
    );

};

export default NetworkMultiSelector;
