import {Handle, Position} from 'reactflow';
import styled from "styled-components";
import InfoAvailableIcon from "./InfoAvailableIcon";

const Node = styled.div`
  display: flex;
  height: 28px;
  box-shadow: none;
  padding: 5px;
  background: white;
  justify-content: center;
  align-items: center;
`

function InfoAvailableNode({data}) {

    return (
        <Node aria-label={data.ariaLabel}>
            <Handle type="target" position={Position.Left}/>
            {data?.label}
            {data?.infoAvailable ? <InfoAvailableIcon /> : null}
            <Handle type="source" position={Position.Right}/>
        </Node>
    );
}

export default InfoAvailableNode