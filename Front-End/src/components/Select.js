import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.form`
  width: 25%;
`;

const Select = () => {
  return (
    <StyledSelect >
      <div className="form-group">
        <select className="form-control">
          <option value="" hidden>Catégories</option>
          <option>Transport</option>
          <option>Ecole</option>
          <option>Travail</option>
          <option>Famille</option>
          <option>Amis</option>
        </select>
      </div>
    </StyledSelect>
  )
};

export default Select;