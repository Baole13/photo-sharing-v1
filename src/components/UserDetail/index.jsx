import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

import { apiGet } from "../../lib/api";

function UserDetail() {
  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setUser(null);
    setErrorMessage("");

    apiGet(`/user/${userId}`)
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, [userId]);

  if (errorMessage) {
    return (
      <Typography color="error" sx={{ padding: 2 }}>
        {errorMessage}
      </Typography>
    );
  }

  if (!user) {
    return <Typography sx={{ padding: 2 }}>Loading user detail...</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        {user.first_name} {user.last_name}
      </Typography>

      <Typography>
        <strong>Location:</strong> {user.location}
      </Typography>

      <Typography>
        <strong>Description:</strong> {user.description}
      </Typography>

      <Typography>
        <strong>Occupation:</strong> {user.occupation}
      </Typography>

      <Button
        variant="contained"
        component={Link}
        to={`/photos/${user._id}`}
        sx={{ marginTop: 2 }}
      >
        View Photos
      </Button>
    </Box>
  );
}

export default UserDetail;
