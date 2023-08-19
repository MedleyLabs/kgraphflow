import React from 'react';
import styled from 'styled-components';

import SidebarSection from '../SidebarSection.js';
import InteractiveRow from '../InteractiveRow.js';
import NeurometaLogo from '../../assets/neurometa-logo.png';

const CoordinateTable = styled.div`
  display: flex;
  flex-direction: row;
`;

const CoordinateColumn = styled.div`
  width: 40px;
  text-align: center;
`;

const DisclaimerContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 35px;
`;

const Logo = styled.img`
    height: 30px;
    margin-top: 30px;
`;

const NetworkContent = ({ view, setView, networks, regions, coordinates }) => {

    const mapNetworks = () => {
        return networks.map((network, i) => {
            return <NetworkRow network={network} key={i} />
        });
    };

    const mapRows = () => {
        return regions.map((region, i) => {
            return <RegionRow region={region} key={i} />
        });
    };

    const mapCoordinates = () => {
        return coordinates.map((coordinate, i) => {
            return <CoordinateRow coordinate={coordinate} key={i} />
        });
    };

    const NetworkRow = ({ network }) => {

        const toggleActive = () => {

            const networkIdx = networks.findIndex(item => item.id === network.id);
            const currentNetwork = networks[networkIdx];

            const updatedNetworks = [...networks];

            updatedNetworks[networkIdx] = {
                ...currentNetwork,
                isActive: !currentNetwork.isActive
            };

            setView('flowConnectomeView', {...view.props, networks: updatedNetworks});
        };

        const remove = () => {
            let updatedNetworks = networks.filter(item => item.name !== network.name);
            setView('flowConnectomeView', {...view.props, networks: updatedNetworks});
        };

        return (
            <div>
                <InteractiveRow
                    label={network.name}
                    checked={network.isActive}
                    toggleActive={toggleActive}
                    remove={remove}
                />
                <br/>
            </div>
        );
    };

    const RegionRow = ({ region }) => {

        const toggleActive = () => {
            const regionIdx = regions.findIndex(item => item.name === region.name);
            const currentRegion = regions[regionIdx];

            const updatedRegions = [...regions];

            updatedRegions[regionIdx] = {
                ...currentRegion,
                isActive: !currentRegion.isActive
            };

            setView('flowConnectomeView', {...view.props, regions: updatedRegions});
        };

        const remove = () => {
            let updatedRegions = regions.filter(item => item !== region);
            setView('flowConnectomeView', {...view.props, regions: updatedRegions});
        };

        return (
            <div>
                <InteractiveRow
                    label={region.name}
                    checked={region.isActive}
                    toggleActive={toggleActive}
                    remove={remove}
                />
                <br/>
            </div>
        );
    };

    const CoordinateRow = ({ coordinate }) => {

        const toggleActive = () => {
            const coordinateIdx = coordinates.findIndex(item => (
                item.x === coordinate.x && item.y === coordinate.y && item.z === coordinate.z
            ));
            const currentCoordinate = coordinates[coordinateIdx];

            const updatedCoordinates = [...coordinates];

            updatedCoordinates[coordinateIdx] = {
                ...currentCoordinate,
                isActive: !currentCoordinate.isActive
            };

            setView('flowConnectomeView', {...view.props, coordinates: updatedCoordinates});
        };

        const remove = () => {
            let updatedCoordinates = coordinates.filter(item => (
                item.x !== coordinate.x && item.y !== coordinate.y && item.z !== coordinate.z)
            );
            setView('flowConnectomeView', {...view.props, coordinates: updatedCoordinates});
        };

        let formattedX = coordinate.x.toString().split('-').join('&ndash;');
        let formattedY = coordinate.y.toString().split('-').join('&ndash;');
        let formattedZ = coordinate.z.toString().split('-').join('&ndash;');

        let item =
            <CoordinateTable>
                <CoordinateColumn dangerouslySetInnerHTML={{__html: formattedX}} style={{textAlign: 'left'}} />
                <CoordinateColumn dangerouslySetInnerHTML={{__html: formattedY}} />
                <CoordinateColumn dangerouslySetInnerHTML={{__html: formattedZ}} style={{textAlign: 'right'}} />
            </CoordinateTable>

        return (
            <div>
                <InteractiveRow
                    label={item}
                    checked={coordinate.isActive}
                    toggleActive={toggleActive}
                    remove={remove}
                />
                <br/>
            </div>
        );
    };

    return (
        <>
            <Logo src={NeurometaLogo} alt={'Neurometa Logo'} />
            <div>
                <DisclaimerContainer>
                    <i>Disclaimer: The nodes and edges of these networks were manually created by aggregating findings
                        from research papers and hence have not been validated. They are intended for demonstration
                        purposes only.</i>
                </DisclaimerContainer>
                <SidebarSection
                    title='Networks'
                    description={networks.length > 0 ? mapNetworks() : null}
                    defaultIsOpen={true}
                    style={{paddingTop: 12, borderTop: '1px solid lightgray'}}
                />
                <SidebarSection
                    title='Neuronal Regions'
                    description={regions.length > 0 ? mapRows() : null}
                    defaultIsOpen={true}
                />
                <SidebarSection
                    title='MNI Coordinates (X, Y, Z)'
                    description={coordinates.length > 0 ? mapCoordinates() : null}
                    defaultIsOpen={true}
                />
            </div>
        </>
    );
}

export default NetworkContent;
