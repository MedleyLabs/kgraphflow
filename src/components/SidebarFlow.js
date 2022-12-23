import Sidebar from './Sidebar';
import ReactFlow, {Background} from 'reactflow';
import ExtendedControls from './ExtendedControls.js';

const SidebarFlow = (props) => {

  return (
    <div className='reactflow-wrapper'>
      <Sidebar content={props.sidebarContent} />
      <ReactFlow
        nodes={props.nodes}
        edges={props.edges}
        onNodesChange={props.onNodesChange}
        onEdgesChange={props.onEdgesChange}
        onConnect={props.onConnect}
      >
        <ExtendedControls
          viewType={props.viewType}
          settingsCallback={props.setViewTypeCallback}
        />
        <Background />
      </ReactFlow>
    </div>
  );

}

export default SidebarFlow;
