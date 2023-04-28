import ReactFlow, {Background, Controls} from 'reactflow';
import styled from 'styled-components';

import Sidebar from './Sidebar.js';

const ReactFlowWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  height: 100%;
  width: 100%;
  color: #404040;
  overflow-y: hidden;
`

const FlowWithSidebar = ({
    sidebarHeader,
    sidebarContent,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    nodeTypes,
    enableBackground = true,
    enableControls = false
}) => {
    return (
        <ReactFlowWrapper>
            <Sidebar header={sidebarHeader} content={sidebarContent}/>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                panOnDrag={enableControls}
                zoomOnScroll={enableControls}
                zoomOnPinch={enableControls}
                zoomOnDoubleClick={enableControls}
            >
                {enableControls ? <Controls/> : null}
                {enableBackground ? <Background/> : null}
            </ReactFlow>
        </ReactFlowWrapper>
    );
}

export default FlowWithSidebar;
