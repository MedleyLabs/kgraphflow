import React from 'react';
import styled from 'styled-components';

const Container = styled.div`

`

const Select = styled.select`
  height: 30px;
  width: 200px;
`

const ListSelector = ({ options, onChange, value }) => {
  return (
    <Container>
      <Select value={value} style={{ position: 'absolute', zIndex: 1000 }} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value} >
            {option.label}
          </option>
        ))}
      </Select>
    </Container>
  );
};

export default ListSelector;