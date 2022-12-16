import ReactFlow, {Background, Controls} from 'reactflow';

import Sidebar from './Sidebar.js';

function FlowWithSidebar(props) {

  return (
    <div className='reactflow-wrapper'>
      <Sidebar content={props.sidebarContent || 'Please define the sidebarContent prop!'}/>
      <ReactFlow
        nodes={props.nodes}
        edges={props.edges}
        onNodesChange={props.onNodesChange}
        onEdgesChange={props.onEdgesChange}
        onConnect={props.onConnect}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default FlowWithSidebar;
