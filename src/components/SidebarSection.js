import React from 'react';

function SidebarSection(props) {

  return (
    <div className='sidebar-section'>
      <div className='section-title'>{props.title}</div>
      <div className='section-description' dangerouslySetInnerHTML={{__html: props.description.replaceAll('\\n\\n', '<br/><br/>')}} />
    </div>
  );
};

export default SidebarSection;
