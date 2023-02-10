import {Handle, Position} from 'reactflow';
import styled from "styled-components";
import InfoAvailableIcon from "./InfoAvailableIcon";

const handleStyle = {left: 10};

const Node = styled.div`
  display: flex;
  //font-family: 'Nunito', sans-serif !important;
  font-size: 12px;
  height: 28px;
  box-shadow: none;
  padding: 5px;
  //border: 1px solid gray;
  //border-radius: 4px;
  background: white;
  justify-content: center;
  align-items: center;
`

function TextImageNode({data}) {

    return (
        <>
            <Node>
                <Handle type="target" position={Position.Left}/>
                {data?.label}
                {data?.infoAvailable ? <InfoAvailableIcon /> : null}
                <Handle type="source" position={Position.Right}/>
            </Node>
        </>
    );
}

export default TextImageNode