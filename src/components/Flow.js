import {useState} from 'react';

import InputOutputView from './views/InputOutputView.js';

const views = {
  inputOutput: <InputOutputView />,
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
