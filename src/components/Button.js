import styled from 'styled-components';

const BlueButton = styled.button`
  background-color: #4285F4;
  border: none;
  border-radius: 4px;
  color: white;
  padding: 8px 32px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-right: 20px;
  margin-bottom: 30px;
`;

const Button = (props) => {
  return (
      <BlueButton style={props.style || {}} />
  )
}

export default BlueButton;
