import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UsersListPage from "./pages/UsersListPage";
import AddUserPage from "./pages/AddUser";
import { AuthProvider } from "./hooks/AuthContext";

import { QueryClient, QueryClientProvider } from "react-query";
import EditUserPage from "./pages/EditUser";

const queryClient = new QueryClient();

function App() {
  const token = sessionStorage.getItem("token");

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/users"
              element={token ? <UsersListPage /> : <Navigate to="/" />}
            />
            <Route
              path="/add"
              element={token ? <AddUserPage /> : <Navigate to="/" />}
            />
            <Route
              path="/edit/:id"
              element={token ? <EditUserPage /> : <Navigate to="/" />}
            />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
