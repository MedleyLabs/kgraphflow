import React from 'react';

function SidebarSection(props) {

  return (
    <div className="sidebar-section">
      <h3>{props.title}</h3>
      <div className='sidebar-description' dangerouslySetInnerHTML={{__html: props.description.replace('\n\n', '<br/><br/>')}} />
    </div>
  );
};

export default SidebarSection;