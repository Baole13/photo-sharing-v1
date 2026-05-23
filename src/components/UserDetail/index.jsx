import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";

import "./styles.css";
import { Link, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchModel(`user/${userId}`)
      .then((result) => setUser(result.data))
      .catch((error) => console.error("Error fetching user details:", error));
  }, [userId]);

  if (!user) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <>
      <Typography variant="body1">
        <Typography variant="h4">
          {user.first_name} {user.last_name}
        </Typography>

        <Typography variant="body1">Location: {user.location}</Typography>
        <Typography variant="body1">Occupation: {user.occupation}</Typography>
        <Typography variant="body1">Description: {user.description}</Typography>

        <Button
          variant="contained"
          component={Link}
          to={`/photos/${userId}`}
          style={{ marginTop: "16px" }}
        >
          View Photos
        </Button>
      </Typography>
    </>
  );
}

export default UserDetail;
