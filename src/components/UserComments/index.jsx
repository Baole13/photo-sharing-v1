import React, { useState, useEffect } from "react";
import { Typography, List, ListItem, Divider, Box } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserComments() {
  const { userId } = useParams();
  const [comments, setComments] = useState(null);

  useEffect(() => {
    fetchModel(`commentsOfUser/${userId}`)
      .then((result) => setComments(result.data))
      .catch((error) => console.error("Error fetching user comments:", error));
  }, [userId]);

  if (!comments) {
    return <Typography>Loading...</Typography>;
  }

  if (comments.length === 0) {
    return <Typography>This user hasn't made any comments yet.</Typography>;
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        User's Comments
      </Typography>
      <List>
        {comments.map((item) => (
          <React.Fragment key={item.comment_id}>
            <ListItem
              button
              component={Link}
              to={`/photos/${item.photo_owner_id}`}
              style={{ alignItems: "flex-start", padding: "16px 0" }}
            >
              <img
                src={`/images/${item.file_name}`}
                alt={item.file_name}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  marginRight: "16px",
                  borderRadius: "4px",
                }}
              />
              <Box>
                <Typography variant="body1" style={{ fontWeight: 500 }}>
                  "{item.comment}"
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {new Date(item.date_time).toLocaleString()}
                </Typography>
              </Box>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserComments;
