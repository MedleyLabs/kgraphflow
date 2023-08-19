import React, { useEffect } from 'react';
import { Handle, useUpdateNodeInternals } from 'reactflow';
import styled from 'styled-components';

const Node = styled.div`
  display: flex;
  height: 28px;
  box-shadow: none;
  padding: 10px;
  background: white;
  justify-content: left;
  align-items: center;
`;

const RotatableNode = ({ data, includeCheckbox=false }) => {

    const updateNodeInternals = useUpdateNodeInternals();

    useEffect(() => {
            updateNodeInternals(data.id);
    }, [data.id, data.style.transform]);

    return (
        <Node aria-label={data?.label} style={data.style}>
            <Handle type="target" position={data.targetPosition} isConnectable={false} />
            {data.targetPosition === 'right' ? data.label : null}
            {includeCheckbox
                ? (
                    <input
                        type="checkbox"
                        name="select-node"
                        style={ data.targetPosition === 'right'
                            ? {marginLeft: 12}
                            : {marginRight: 12}
                        }
                    />
                ) : null
            }
            {data.targetPosition === 'right' ? null : data.label}
            <Handle type="source" position={data.sourcePosition} isConnectable={false} />
        </Node>
    );
};

export default RotatableNode;
