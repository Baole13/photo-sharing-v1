import React, { useState, useEffect } from "react";
import { Divider, Typography, Button, TextField } from "@mui/material";

import "./styles.css";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos({ advancedFeatures, currentUser }) {
  const BASE_API = "https://w2279d-8080.csb.app/";
  const { userId } = useParams();
  const [photos, setPhotos] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [newComments, setNewComments] = useState({});

  const fetchPhotos = () => {
    fetchModel(`photosOfUser/${userId}`)
      .then((result) => {
        setPhotos(result.data);
      })
      .catch((error) => console.error("Error fetching user photos:", error));
  };

  useEffect(() => {
    fetchPhotos();
    setCurrentIndex(0);
  }, [userId]);

  // Xử lý gửi bình luận
  const handleAddComment = async (photoId) => {
    const text = newComments[photoId];
    if (!text || text.trim() === "") return;

    try {
      const response = await fetch(`${BASE_API}commentsOfPhoto/${photoId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: text }),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to add comment");

      // Xóa chữ ở input và load lại ảnh để hiển thị comment mới
      setNewComments({ ...newComments, [photoId]: "" });
      fetchPhotos();
    } catch (err) {
      console.error(err);
    }
  };

  if (!photos) {
    return <Typography>Loading...</Typography>;
  }

  if (photos.length === 0) {
    return <Typography>This user has no photos.</Typography>;
  }

  const renderPhoto = (photo) => (
    <div key={photo._id} style={{ marginBottom: "40px" }}>
      <img
        src={`${BASE_API}images/${photo.file_name}`}
        alt={photo.file_name}
        style={{ maxWidth: "100%" }}
      />
      <Typography
        variant="body2"
        color="textSecondary"
        style={{ marginBottom: "10px" }}
      >
        Date: {new Date(photo.date_time).toLocaleString()}
      </Typography>

      <div>
        <Typography variant="h6">Comments:</Typography>
        {photo.comments && photo.comments.length > 0 ? (
          photo.comments.map((comment) => (
            <div key={comment._id} style={{ marginBottom: "10px" }}>
              <Typography variant="body1">
                <Link to={`/users/${comment.user._id}`}>
                  {comment.user.first_name} {comment.user.last_name}
                </Link>
                : {comment.comment}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {new Date(comment.date_time).toLocaleString()}
              </Typography>
            </div>
          ))
        ) : (
          <Typography variant="body2">No comments yet.</Typography>
        )}
      </div>

      {/* Vùng nhập comment mới */}
      {currentUser && (
        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          <TextField
            size="small"
            fullWidth
            placeholder="Write a comment..."
            value={newComments[photo._id] || ""}
            onChange={(e) =>
              setNewComments({ ...newComments, [photo._id]: e.target.value })
            }
          />
          <Button
            variant="contained"
            onClick={() => handleAddComment(photo._id)}
          >
            Post
          </Button>
        </div>
      )}

      <Divider style={{ marginTop: "20px" }} />
    </div>
  );

  if (advancedFeatures) {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Button
            variant="contained"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(currentIndex - 1)}
          >
            Previous
          </Button>
          <Typography variant="h6">
            Photo {currentIndex + 1} of {photos.length}
          </Typography>
          <Button
            variant="contained"
            disabled={currentIndex === photos.length - 1}
            onClick={() => setCurrentIndex(currentIndex + 1)}
          >
            Next
          </Button>
        </div>
        {renderPhoto(photos[currentIndex])}
      </div>
    );
  }

  return <div>{photos.map((photo) => renderPhoto(photo))}</div>;
}

export default UserPhotos;
