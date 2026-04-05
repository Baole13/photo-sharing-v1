import React, { useEffect, useState } from "react";
import fetchModel from "../../lib/fetchModelData";
import { Link } from "react-router-dom";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchModel("/user/list").then(setUsers);
  }, []);

  return (
    <div>
      {users.map((user) => (
        <Link key={user._id} to={`/users/${user._id}`}>
          <p>{user.first_name} {user.last_name}</p>
        </Link>
      ))}
    </div>
  );
}