import React, { useRef, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { apiPost, apiPostForm } from "../../lib/api";
import "./styles.css";
import { useAuth } from "../../contexts/AuthContext";


function TopBar({ loggedInUser, setLoggedInUser, onPhotoUploaded }) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { user, logout } = useAuth();
  const [uploadMessage, setUploadMessage] = useState("");

  const handleLogout = async () => {
    try {
      await apiPost("/admin/logout", {});
      setLoggedInUser(null);
      navigate("/login-register");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddPhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUploadPhoto = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);

    try {
      await apiPostForm("/photos/new", formData);

      setUploadMessage("Photo uploaded successfully");

      if (onPhotoUploaded) {
        onPhotoUploaded();
      }

      navigate(`/photos/${loggedInUser._id}`);
    } catch (error) {
      setUploadMessage(error.message);
    } finally {
      event.target.value = "";
    }
  };

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Photo Sharing App
        </Typography>

        {loggedInUser ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography>Hi {loggedInUser.first_name}</Typography>

            <Button color="inherit" onClick={handleAddPhotoClick}>
              Add Photo
            </Button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleUploadPhoto}
            />

          <button onClick={handleLogout}>
            Logout
          </button>

            {uploadMessage && (
              <Typography variant="body2">{uploadMessage}</Typography>
            )}
          </Box>
        ) : (
          <Typography>Please Login</Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
