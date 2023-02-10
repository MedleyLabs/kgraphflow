import {useEffect, useState} from "react";

import FlowBuilderView from './views/FlowBuilderView.js';
import FlowExplorerView from './views/FlowExplorerView.js';
import FlowVisualizerView from './views/FlowVisualizerView.js';
import SettingsModal from './SettingsModal.js';

import '../styles/sidebar.css';
import SettingsIcon from './Settings-Icon.png'

function Flow() {

  const defaultViewType = 'flowExplorerView';

  const views = {
    flowExplorerView: <FlowExplorerView />,
    flowBuilderView: <FlowBuilderView />,
    flowVisualizerView: <FlowVisualizerView />,
  }

  const [viewName, setViewName] = useState(defaultViewType);
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
        { settingsIsActive
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
        <img src={SettingsIcon} alt='Settings' className='settings-icon' onClick={() => openSettings()}/>
        { view }
      </>
  );
}

export default Flow;
