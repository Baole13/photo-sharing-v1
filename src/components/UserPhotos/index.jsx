import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";

import { apiGet, apiPost, API_BASE_URL } from "../../lib/api";

function UserPhotos({ photoRefreshKey }) {
  const { userId } = useParams();

  const [photos, setPhotos] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const loadPhotos = useCallback(() => {
    setErrorMessage("");

    apiGet(`/photosOfUser/${userId}`)
      .then((data) => {
        setPhotos(data);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, [userId]);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos, photoRefreshKey]);

  const handleCommentInputChange = (photoId, value) => {
    setCommentInputs((prev) => ({
      ...prev,
      [photoId]: value,
    }));
  };

  const handleAddComment = async (photoId) => {
    const comment = commentInputs[photoId] || "";

    try {
      await apiPost(`/commentsOfPhoto/${photoId}`, {
        comment,
      });

      setCommentInputs((prev) => ({
        ...prev,
        [photoId]: "",
      }));

      loadPhotos();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  if (errorMessage) {
    return (
      <Typography color="error" sx={{ padding: 2 }}>
        {errorMessage}
      </Typography>
    );
  }

  if (!photos || photos.length === 0) {
    return <Typography sx={{ padding: 2 }}>No photos found.</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      {photos.map((photo) => (
        <Card key={photo._id} sx={{ marginBottom: 3 }}>
          <CardContent>
            <Box>
              <img
                src={`${API_BASE_URL}/images/${photo.file_name}`}
                alt={photo.file_name}
                style={{
                  maxWidth: "100%",
                  borderRadius: "4px",
                }}
              />
            </Box>

            <Typography variant="body2" sx={{ marginTop: 1 }}>
              Created: {new Date(photo.date_time).toLocaleString()}
            </Typography>

            <Divider sx={{ marginY: 2 }} />

            <Typography variant="h6">Comments</Typography>

            {photo.comments && photo.comments.length > 0 ? (
              photo.comments.map((comment) => (
                <Box
                  key={comment._id}
                  sx={{
                    paddingTop: 1,
                    paddingBottom: 1,
                  }}
                >
                  <Typography variant="body2">
                    <Link to={`/users/${comment.user._id}`}>
                      {comment.user.first_name} {comment.user.last_name}
                    </Link>
                  </Typography>

                  <Typography variant="caption">
                    {new Date(comment.date_time).toLocaleString()}
                  </Typography>

                  <Typography>{comment.comment}</Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2">No comments yet.</Typography>
            )}

            <TextField
              label="Add a comment"
              value={commentInputs[photo._id] || ""}
              onChange={(event) =>
                handleCommentInputChange(photo._id, event.target.value)
              }
              fullWidth
              multiline
              rows={2}
              sx={{ marginTop: 2 }}
            />

            <Button
              variant="contained"
              sx={{ marginTop: 1 }}
              onClick={() => handleAddComment(photo._id)}
            >
              Submit Comment
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default UserPhotos;
