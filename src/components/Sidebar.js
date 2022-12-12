import React from 'react';

function Sidebar(props) {

  return (
    <aside className='sidebar'>
      {props.content}
    </aside>
  );
}

export default Sidebar;
