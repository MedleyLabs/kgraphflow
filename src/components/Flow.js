import {useState} from 'react';

import InputOutput from './views/InputOutput.js';

const views = {
  inputOutput: <InputOutput />,
}

function Flow() {

  const defaultViewType = 'inputOutput';
  const initialView = views[defaultViewType];

  const [view, setView] = useState(initialView);

  return (
    <div className='reactflow-wrapper'>
      { view }
    </div>
  );
}

export default Flow;
