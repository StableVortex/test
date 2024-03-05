import styled from "styled-components";

const Button = styled.button`
  margin: 0 5px;
  display: inline;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export default Button;
