import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import Form from "../styles/Form";
import StyledInput from "../styles/StyledInput";
import StyledButton from "../styles/StyledButton";

const LoginPage = () => {
  const [inputToken, setInputToken] = useState("");
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setToken(inputToken);
    navigate("/users");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <StyledInput
        type="text"
        value={inputToken}
        onChange={(e) => setInputToken(e.target.value)}
        placeholder="Please enter a VALID API TOKEN"
        required
      />
      <StyledButton type="submit">Login</StyledButton>
    </Form>
  );
};

export default LoginPage;
