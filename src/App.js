import {ReactFlowProvider} from 'reactflow';
import 'reactflow/dist/style.css';

import Flow from './components/Flow.js';

function App(props) {
    return (
        <ReactFlowProvider className='react-flow-with-provider'>
            <Flow {...props} />
        </ReactFlowProvider>
    );
}

export default App;
