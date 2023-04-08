import {useEffect, useState} from 'react';
import styled from 'styled-components';

import FlowBuilderView from './views/FlowBuilderView.js';
import FlowCircuitView from './views/FlowCircuitView.js'
import FlowExplorerView from './views/FlowExplorerView.js';
import FlowFinderView from './views/FlowFinderView.js';
import FlowTourView from './views/FlowTourView.js';
import FlowVisualizerView from './views/FlowVisualizerView.js';
import ProfilePicture from './ProfilePicture.js';
import SettingsModal from './SettingsModal.js';

import headshot from '../assets/headshot.jpg'
import logo from '../assets/molecular-human-logo.png'
import settingsIcon from '../assets/settings-icon.png'

import '../styles/sidebar.css';

const MenuBar = styled.div`
  position: absolute;
  top: 15px;
  right: 50px;
`

const SiteLogo = styled.img`
  position: relative;
  top: 20px;
  left: 20px;
  height: 50px;
`

const SettingsIcon = styled.img`
  height: 35px;
  width: 35px;
  position: relative;
  right: 10px;
  top: 0px;
  z-index: 1000;
`

const Explorer = styled.span`
  position: relative;
  right: 30px;
  top: -12px;
  font-family: Nunito, sans-serif;

  &:hover {
    color: dodgerblue;
  }
`


function Flow() {

    const defaultViewType = 'flowExplorerView';

    const [viewName, setViewName] = useState(defaultViewType);

    const views = {
        flowBuilderView: <FlowBuilderView/>,
        flowCircuitView: <FlowCircuitView/>,
        flowExplorerView: <FlowExplorerView/>,
        flowFinderView: <FlowFinderView setViewName={setViewName}/>,
        flowTourView: <FlowTourView/>,
        flowVisualizerView: <FlowTourView/>,
    }

    const [view, setView] = useState(views[defaultViewType]);
    const [settingsIsActive, setSettingsIsActive] = useState(false);

    useEffect(() => {
        setView(views[viewName])
    }, [viewName])

    const openSettings = () => {
        setSettingsIsActive(!settingsIsActive);
    }

    return (
        <>
            {viewName === 'flowFinderView' ? <SiteLogo src={logo} alt='Composition logo'/> : null}
            {settingsIsActive
                ? <SettingsModal
                    callback={(viewName) => {
                        setViewName(viewName);
                        setSettingsIsActive(false);
                    }}
                    doneCallback={() => {
                        setSettingsIsActive(false);
                    }}
                    setViewName={setViewName}
                    viewType={viewName}
                />
                : null
            }
            {viewName === 'flowFinderView'
                ? (
                    <MenuBar>
                        <Explorer onClick={() => {setViewName('flowExplorerView');}}>Explorer</Explorer>
                        <SettingsIcon src={settingsIcon} alt='Settings icon' className='settings-icon' onClick={() => openSettings()}/>
                        <ProfilePicture src={headshot} alt='Profile picture' onClick={() => console.log('HEHE')}/>
                    </MenuBar>
                )
                : null
            }
            {view}
        </>
    );
}

export default Flow;
