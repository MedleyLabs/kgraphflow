import {ReactFlowProvider} from 'reactflow';
import Flow from './Flow.js';

function FlowWithProvider(props) {
  return (
    <div className='react-flow-with-provider'>
      <ReactFlowProvider>
          <Flow {...props} />
      </ReactFlowProvider>
    </div>
  );
}

export default FlowWithProvider;
