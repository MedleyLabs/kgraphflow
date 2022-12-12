import React from 'react';

import SidebarSection from "./SidebarSection";

function Sidebar(props) {

  return (
    <aside className="sidebar">
      <div className="sidebar-header">{props.header}</div>
      <div className="sidebar-body">
        <SidebarSection title='Location' description={props.locationDescription || 'TBD' }/>
        <SidebarSection title='Function' description={props.functionDescription || 'TBD' }/>
        <SidebarSection title='Cytoarchitecture' description='TDB'/>
        <SidebarSection title='Gene expression' description='TDB'/>
        <SidebarSection title='Receptor expression' description='TDB'/>
        <SidebarSection title='Neurotransmitter expression' description='TDB'/>
      </div>
    </aside>
  );
};

export default Sidebar;