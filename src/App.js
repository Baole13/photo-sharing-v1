import "./App.css";

import React, { useState } from "react";
import { Grid, Paper } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from "./components/LoginRegister";
import Register from "./components/Register";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [photoRefreshKey, setPhotoRefreshKey] = useState(0);

  const isLoggedIn = Boolean(loggedInUser);

  const handlePhotoUploaded = () => {
    setPhotoRefreshKey((prev) => prev + 1);
  };

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar
              loggedInUser={loggedInUser}
              setLoggedInUser={setLoggedInUser}
              onPhotoUploaded={handlePhotoUploaded}
            />
          </Grid>

          <div className="main-topbar-buffer" />

          {isLoggedIn && (
            <Grid item sm={3}>
              <Paper className="main-grid-item">
                <UserList />
              </Paper>
            </Grid>
          )}

          <Grid item sm={isLoggedIn ? 9 : 12}>
            <Paper className="main-grid-item">
              <Routes>
                <Route
                  path="/login-register"
                  element={
                    isLoggedIn ? (
                      <Navigate to={`/users/${loggedInUser._id}`} replace />
                    ) : (
                      <LoginRegister setLoggedInUser={setLoggedInUser} />
                    )
                  }
                />

                <Route
                  path="/register"
                  element={
                    isLoggedIn ? (
                      <Navigate to={`/users/${loggedInUser._id}`} replace />
                    ) : (
                      <Register />
                    )
                  }
                />

                <Route
                  path="/users/:userId"
                  element={
                    <ProtectedRoute>
                      <UserDetail />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/photos/:userId"
                  element={
                    <ProtectedRoute>
                      <UserPhotos />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/users"
                  element={
                    isLoggedIn ? (
                      <UserList />
                    ) : (
                      <Navigate to="/login-register" replace />
                    )
                  }
                />

                <Route
                  path="/"
                  element={
                    isLoggedIn ? (
                      <Navigate to={`/users/${loggedInUser._id}`} replace />
                    ) : (
                      <Navigate to="/login-register" replace />
                    )
                  }
                />

                <Route
                  path="*"
                  element={
                    isLoggedIn ? (
                      <Navigate to={`/users/${loggedInUser._id}`} replace />
                    ) : (
                      <Navigate to="/login-register" replace />
                    )
                  }
                />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;