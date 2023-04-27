import {ReactFlowProvider} from 'reactflow';
import 'reactflow/dist/style.css';

function FlowWithProvider({ flow }) {
  return (
      <ReactFlowProvider className='react-flow-with-provider'>
          { flow }
      </ReactFlowProvider>
  );
}

export default FlowWithProvider;
