import React, { Fragment } from 'react';
import styled from 'styled-components';
import { width, space, color } from 'styled-system';

const turquoise = "linear-gradient(to bottom, rgba(47,95,109,1) 25%,rgba(26,46,56,1) 69%)";

const violet = "linear-gradient(to bottom, rgba(60,47,109,1) 25%,rgba(36,26,56,1) 69%)";

const greenColor = "linear-gradient(to bottom, rgba(47,109,71,1) 25%,rgba(26,56,41,1) 69%);"

const StyledButton = styled.button`
  ${width}
  ${space}
  background: ${props => props.violet ? violet : props.green ? greenColor : turquoise};
  color: #fff;
`;

const Button = ({ width, m, bg, type, children }) => {
  const bgColor = bg
  return (  
    <StyledButton 
      type={type}
      width={width}
      m={m}
      bg={bg}
      className="btn"
      >
      {children}
    </StyledButton>
  )
};

export default Button;