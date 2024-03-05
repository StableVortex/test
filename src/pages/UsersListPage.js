import React, { useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import PageContainer from "../styles/PageContainer";
import Button from "../styles/Button";
import PaginationButton from "../styles/PaginationButton";
import UserTable from "../styles/UserTable";

const fetchUsers = async (page = 1) => {
  const { data } = await axios.get(
    `https://gorest.co.in/public/v2/users?page=${page}&per_page=20`
  );
  return data;
};

const deleteUser = async (userId, token) => {
  await axios.delete(`https://gorest.co.in/public/v2/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const UsersListPage = () => {
  const token = sessionStorage.getItem("token");
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useQuery(
    ["users", page],
    () => fetchUsers(page),
    {
      keepPreviousData: true,
    }
  );
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation((userId) => deleteUser(userId, token), {
    onSuccess: () => {
      queryClient.invalidateQueries(["users", page]);
      alert("User has been deleted successfully!");
    },
    onError: (error) => {
      alert(
        `An error occurred: ${error.response?.data?.message || error.message}`
      );
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <PageContainer>
      <Button onClick={() => navigate("/add")}>Add User</Button>
      <h2>Users</h2>
      <UserTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.gender}</td>
                <td>{user.email}</td>
                <td>
                  <Button
                    onClick={() => navigate(`/edit/${user.id}`)}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button>
                  <Button onClick={() => mutation.mutate(user.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </UserTable>
      <div>
        <PaginationButton
          onClick={() => setPage((old) => Math.max(1, old - 1))}
        >
          Previous Page
        </PaginationButton>
        <PaginationButton onClick={() => setPage((old) => old + 1)}>
          Next Page
        </PaginationButton>
      </div>
    </PageContainer>
  );
};

export default UsersListPage;
