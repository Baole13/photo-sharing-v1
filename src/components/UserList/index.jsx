import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Chip,
  Box,
} from "@mui/material";

import "./styles.css";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import { useState, useEffect } from "react";
/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  useEffect(() => {
    fetchModel("user/list")
      .then((result) => setUsers(result.data))
      .catch((error) => console.error("Error fetching user list:", error));
    fetchModel("user/stats")
      .then((result) => setStats(result.data))
      .catch((error) => console.error("Error fetching user stats:", error));
  }, []);
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        User List:
      </Typography>
      <List component="nav">
        {users ? (
          users.map((item) => {
            const userStats = stats[item._id] || {
              photoCount: 0,
              commentCount: 0,
            };
            return (
              <React.Fragment key={item._id}>
                <ListItem button component={Link} to={`/users/${item._id}`}>
                  <ListItemText
                    primary={`${item.first_name} ${item.last_name}`}
                  />
                  <Box display="flex" gap={1}>
                    <Link
                      to={`/photos/${item._id}`}
                      onClick={(e) => e.stopPropagation()}
                      style={{ textDecoration: "none" }}
                    >
                      <Chip
                        label={userStats.photoCount}
                        size="small"
                        style={{ backgroundColor: "#4caf50", color: "white" }}
                      />
                    </Link>
                    <Link
                      to={`/comments/${item._id}`}
                      onClick={(e) => e.stopPropagation()}
                      style={{ textDecoration: "none" }}
                    >
                      <Chip
                        label={userStats.commentCount}
                        size="small"
                        clickable
                        style={{
                          backgroundColor: "#f44336",
                          color: "white",
                          cursor: "pointer",
                        }}
                      />
                    </Link>
                  </Box>
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          })
        ) : (
          <Typography>Loading...</Typography>
        )}
      </List>
    </div>
  );
}

export default UserList;
