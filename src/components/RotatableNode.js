import React, {useEffect} from 'react';
import {Handle, useUpdateNodeInternals} from 'reactflow';
import styled from 'styled-components';

const Node = styled.div`
  display: flex;
  height: 28px;
  box-shadow: none;
  padding: 10px;
  background: white;
  justify-content: left;
  align-items: center;
`

function RotatableNode({data}) {

    const updateNodeInternals = useUpdateNodeInternals();

    useEffect(() => {
            updateNodeInternals(data.id);
    }, [data.id, data.style.transform]);

    return (
        <Node aria-label={data?.label} style={data?.style}>
            <Handle type="target" position={data?.targetPosition}/>
            {data?.label}
            <Handle type="source" position={data?.sourcePosition}/>
        </Node>
    );
}

export default RotatableNode