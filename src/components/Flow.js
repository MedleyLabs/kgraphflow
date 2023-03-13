import {useEffect, useState} from 'react';
import styled from 'styled-components';

import FlowBuilderView from './views/FlowBuilderView.js';
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

const SiteLogo = styled.img`
  position: absolute;
  left: 20px;
  top: 15px;
  height: 50px;
`

const SettingsIcon = styled.img`
  height: 35px;
  width: 35px;
  position: absolute;
  right: 65px;
  top: 20px;
  z-index: 1000;
`


function Flow() {

    const defaultViewType = 'flowFinderView';

    const [viewName, setViewName] = useState(defaultViewType);

    const views = {
        flowBuilderView: <FlowBuilderView/>,
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
            <SettingsIcon src={settingsIcon} alt='Settings icon' className='settings-icon' onClick={() => openSettings()}/>
            <ProfilePicture src={headshot} alt='Profile picture' onClick={() => console.log('HEHE')}/>
            {view}
        </>
    );
}

export default Flow;
