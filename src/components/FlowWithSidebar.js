import ReactFlow, { Background, Controls } from 'reactflow';
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

const MobileNotSupported = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  border: 1.5px solid dodgerblue;
  border-radius: 12px;
  padding: 12px;
  font-family: Nunito, sans-serif;
  font-size: 22px;
  color: #404040;
  background-color: white;
  z-index: 1000;
  text-align: center;
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

    const isMobile = window.innerWidth > 768;

    return (
        isMobile
            ? (
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
            )
            :
            <>
                <MobileNotSupported>
                    The Molecular Human app is currently unsupported on mobile.
                    <br/><br/>
                    Please view on desktop!
                </MobileNotSupported>
                <Background/>
            </>
    // <ReactFlowWrapper>
    //     <SidebarWrapper isSidebarVisible={isSidebarVisible}>
    //         <Sidebar header={sidebarHeader} content={sidebarContent}/>
    //     </SidebarWrapper>
    //     <PaneWrapper isSidebarVisible={isSidebarVisible}>
    //         <ReactFlow
    //             nodes={nodes}
    //             edges={edges}
    //             onNodesChange={onNodesChange}
    //             onEdgesChange={onEdgesChange}
    //             nodeTypes={nodeTypes}
    //             panOnDrag={enableControls}
    //             zoomOnScroll={enableControls}
    //             zoomOnPinch={enableControls}
    //             zoomOnDoubleClick={enableControls}
    //         >
    //             {enableControls ? <Controls/> : null}
    //             {enableBackground ? <Background/> : null}
    //         </ReactFlow>
    //     </PaneWrapper>
    // </ReactFlowWrapper>
    );
}

export default FlowWithSidebar;
