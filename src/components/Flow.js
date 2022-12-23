import {useEffect, useState} from 'react';

import InputOutputView from './views/InputOutputView.js';
import WalkthroughView from './views/WalkthroughView.js';

function Flow() {

  const defaultViewType = 'guidedTourView';

  const [viewType, setViewType] = useState(defaultViewType);
  const [view, setView] = useState(null);

  useEffect(() => {

    const views = {
      inputOutputView: <InputOutputView viewType={viewType} setViewTypeCallback={setViewType} />,
      guidedTourView: <WalkthroughView viewType={viewType} setViewTypeCallback={setViewType} />,
    }

    const currentView = views[viewType];

    setView(currentView);

  }, [viewType])

  return (
    <div className='reactflow-wrapper'>
      { view }
    </div>
  );
}

export default Flow;
