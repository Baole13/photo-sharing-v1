import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

import { apiGet } from "../../lib/api";

function UserList() {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    apiGet("/user/list")
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, []);

  if (errorMessage) {
    return (
      <Typography color="error" sx={{ padding: 2 }}>
        {errorMessage}
      </Typography>
    );
  }

  return (
    <List component="nav">
      {users.map((user) => (
        <ListItem
          button
          component={Link}
          to={`/users/${user._id}`}
          key={user._id}
        >
          <ListItemText primary={`${user.first_name} ${user.last_name}`} />
        </ListItem>
      ))}
    </List>
  );
}

export default UserList;
