import styled from 'styled-components';

const Container = styled.label`
  cursor: pointer;
  font-family: Nunito, sans-serif;
  display: flex;
  align-items: center;
  height: 0px;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const Checkbox = styled.span`
  display: inline-block;
  margin-right: 10px;
  background-color: white;
  border: 1px solid #999;
  border-radius: 2px;
  position: relative;

  &:hover {
    box-shadow: 0 0 0 1.5px dodgerblue;
    border: 1px solid white;
  }
  
  ${HiddenCheckbox}:checked + & {
    border: 1px solid #35adff;
    background-color: #35adff;
  }
`;

const CircularButton = styled.button`
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid #999;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center; 
  font-size: 9px;
  margin-right: 10px;
  margin-left: -5px;
  font-weight: 700;
  
  &:hover {
    box-shadow: 0 0 0 1.5px dodgerblue;
    border: 0;
    color: dodgerblue;
  }
`;

const RowLabel = styled.span`
  &:hover {
    color: dodgerblue;
  }
`;

const InteractiveRow = ({ label, toggleActive, remove, checked=false, pixelLength=10}) => {

    const handleCheckboxClick = () => {
        toggleActive();
    }
    const handleRemoveClick = () => {
        remove();
    };

    return (
        <Container>
            <HiddenCheckbox checked={checked} onChange={handleCheckboxClick}/>
            <Checkbox style={{height: pixelLength, width: pixelLength}} />
            <CircularButton onClick={handleRemoveClick}>X</CircularButton>
            <RowLabel>{label}</RowLabel>
        </Container>
    );
};

export default InteractiveRow;
