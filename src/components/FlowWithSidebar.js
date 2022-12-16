import ReactFlow, {Background, Controls, ControlButton} from 'reactflow';

import Sidebar from './Sidebar.js';
import ExtendedControls from './ExtendedControls.js';

function FlowWithSidebar(props) {

  return (
    <div className='reactflow-wrapper'>
      <Sidebar content={props.sidebarContent || 'Please define the sidebarContent prop!'} />
      <ReactFlow
        nodes={props.nodes}
        edges={props.edges}
        onNodesChange={props.onNodesChange}
        onEdgesChange={props.onEdgesChange}
        onConnect={props.onConnect}
      >
        <ExtendedControls
          searchCallback={() => {console.log('Search!')}}
          settingsCallback={() => {console.log('Settings!')}}
        />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default FlowWithSidebar;
