import "./App.css";

import React, { useState } from "react";
import { Grid, Typography, Paper } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {} from "@mui/material";
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import UserComments from "./components/UserComments";
import LoginRegister from "./components/LoginRegister";

const App = (props) => {
  const [advancedFeatures, setAdvancedFeatures] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar
              advancedFeatures={advancedFeatures}
              setAdvancedFeatures={setAdvancedFeatures}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              {currentUser && <UserList />}
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                {currentUser ? (
                  <>
                    <Route path="/users/:userId" element={<UserDetail />} />
                    <Route
                      path="/photos/:userId"
                      element={
                        <UserPhotos
                          advancedFeatures={advancedFeatures}
                          currentUser={currentUser}
                        />
                      }
                    />
                    <Route path="/users" element={<UserList />} />
                    <Route
                      path="/comments/:userId"
                      element={<UserComments />}
                    />
                  </>
                ) : (
                  <>
                    <Route
                      path="/login"
                      element={
                        <LoginRegister setCurrentUser={setCurrentUser} />
                      }
                    />
                    <Route
                      path="*"
                      element={<Navigate to="/login" replace />}
                    />
                  </>
                )}
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
