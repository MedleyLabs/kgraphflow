import React from 'react';
import styled from 'styled-components';

const Select = styled.select`
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  background-color: white;
  border: 0;
  border-bottom: 1px solid gray;
`;

const SelectOption = ({ title, values, callback }) => {

    return (
        <>
            <label htmlFor={title}>{title}</label>
            <Select name={title} onChange={callback}>
                {values.map(value => <option value={value}>{value}</option>)}
            </Select>
        </>
    );
};

export default SelectOption;
