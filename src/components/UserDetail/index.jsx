import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

export default function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchModel(`/user/${userId}`).then(setUser);
  }, [userId]);

  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h2>{user.first_name} {user.last_name}</h2>
      <p><b>Location:</b> {user.location}</p>
      <p><b>Occupation:</b> {user.occupation}</p>
      <p>{user.description}</p>

      <Link to={`/photos/${user._id}`}>
        View Photos
      </Link>
    </div>
  );
}