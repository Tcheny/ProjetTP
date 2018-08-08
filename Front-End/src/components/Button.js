import React, { Fragment } from 'react';
import styled from 'styled-components';
import { width, space } from 'styled-system';

const StyledButton = styled.button`
  ${width}
  ${space}
`;

const Button = ({ width, m, type, children }) =>  {
  return (  
    <StyledButton 
      type={type}
      width={width}
      m={m}
      className="btn btn-primary"
      >
      {children}
    </StyledButton>
  )
};

export default Button;