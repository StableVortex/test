import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../styles/Form";
import Input from "../styles/StyledInput";
import SubmitButton from "../styles/StyledButton";

const EditUserPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const { id } = useParams();

  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const fetchUser = async () => {
    const response = await axios.get(
      `https://gorest.co.in/public/v2/users/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  };

  const { data: userData } = useQuery(["user", id], fetchUser, {
    enabled: !!id,
    onSuccess: (data) => {
      setName(data.name);
      setEmail(data.email);
      setGender(data.gender);
      setStatus(data.status);
    },
  });

  const updateUserMutation = useMutation(
    (userData) => {
      return axios.put(`https://gorest.co.in/public/v2/users/${id}`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    {
      onSuccess: () => {
        alert("User updated successfully!");
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
    updateUserMutation.mutate({ name, gender, email, status });
  };

  if (updateUserMutation.isLoading) return <div>Updating user...</div>;

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
      <SubmitButton type="submit">Update User</SubmitButton>
    </Form>
  );
};

export default EditUserPage;
