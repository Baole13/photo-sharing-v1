import React, { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import { useLocation } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";
/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar({
  advancedFeatures,
  setAdvancedFeatures,
  currentUser,
  setCurrentUser,
}) {
  const BASE_API = "https://w2279d-8080.csb.app/";
  const location = useLocation();
  const pathPart = location.pathname.split("/");
  const viewType = pathPart[1];
  const id = pathPart[2];

  const [userName, setUserName] = useState("");
  const uploadInputRef = useRef(null);

  useEffect(() => {
    if (id && (viewType === "users" || viewType === "photos")) {
      fetchModel(`user/${id}`)
        .then((result) =>
          setUserName(`${result.data.first_name} ${result.data.last_name}`)
        )
        .catch((error) =>
          console.error("Error fetching user for TopBar:", error)
        );
    } else {
      setUserName("");
    }
  }, [id, viewType]);

  let contextText = "";
  if (userName && currentUser) {
    if (viewType === "users") contextText = userName;
    else if (viewType === "photos") contextText = `Photos of ${userName}`;
  }

  const handleLogout = async () => {
    try {
      await fetch(BASE_API + "admin/logout", {
        method: "POST",
        credentials: "include",
      });
      setCurrentUser(null);
      localStorage.removeItem("currentUser");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // Tính năng Upload Photo
  const handleUploadButtonClicked = async (e) => {
    e.preventDefault();
    if (uploadInputRef.current.files.length > 0) {
      const domForm = new FormData();
      domForm.append("uploadedphoto", uploadInputRef.current.files[0]);

      try {
        const response = await fetch(BASE_API + "photos/new", {
          method: "POST",
          body: domForm,
          credentials: "include",
        });
        if (!response.ok) throw new Error("Upload failed");
        alert("Photo uploaded successfully! Refresh the page to see it.");
        uploadInputRef.current.value = ""; // Reset input
      } catch (err) {
        console.error("Error uploading photo:", err);
      }
    }
  };

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar className="topbar-toolbar">
        <Typography variant="h5" color="inherit">
          {currentUser ? `Hi ${currentUser.first_name}` : "Please Login"}
        </Typography>
        {currentUser && (
          <FormControlLabel
            control={
              <Checkbox
                checked={advancedFeatures}
                onChange={(e) => setAdvancedFeatures(e.target.checked)}
                color="default"
              />
            }
            label="Enable Advanced Features"
          />
        )}
        <Typography variant="h5" color="inherit">
          {contextText}
        </Typography>
        {currentUser && (
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {/* Nút Upload ảnh */}
            <input
              type="file"
              accept="image/*"
              ref={uploadInputRef}
              style={{ display: "none" }}
              onChange={handleUploadButtonClicked}
            />
            <Button
              variant="contained"
              color="success"
              onClick={() => uploadInputRef.current.click()}
            >
              Add Photo
            </Button>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
