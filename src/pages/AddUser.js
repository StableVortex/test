import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "../styles/Form";
import Input from "../styles/StyledInput";
import SubmitButton from "../styles/StyledButton";

const AddUserPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const { mutate, isLoading, error } = useMutation(
    (userData) => {
      return axios.post("https://gorest.co.in/public/v2/users", userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    {
      onSuccess: () => {
        alert("User added successfully!");
        navigate("/users");
      },
      onError: (error) => {
        alert(
          `An error occurred: ${error.response?.data?.message || error.message}`
        );
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ name, gender, email, status });
  };

  if (isLoading) return <div>Adding user...</div>;

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <Input
        type="text"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        placeholder="Gender"
        required
      />
      <Input
        type="text"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        placeholder="Status"
        required
      />
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <SubmitButton type="submit">Add User</SubmitButton>
    </Form>
  );
};

export default AddUserPage;
