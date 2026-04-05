import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import models from "../../modelData/models";
import fetchModel from "../../lib/fetchModelData";

export default function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchModel(`/photosOfUser/${userId}`).then(setPhotos);
  }, [userId]);

  const [index, setIndex] = useState(0);
  const photo = photos[index];

  return (
    <div>
      {photo && (
        <div style={{ marginBottom: 30 }}>
          
          <img
            src={`/images/${photo.file_name}`}
            alt=""
            width="300"
          />

          <p>
             {new Date(photo.date_time).toLocaleString()}
          </p>

          <h4>Comments:</h4>
          {photo.comments && photo.comments.map((c) => (
            <div key={c._id} style={{ marginLeft: 20 }}>
              
              <Link to={`/users/${c.user._id}`}>
                {c.user.first_name} {c.user.last_name}
              </Link>

              <p> {new Date(c.date_time).toLocaleString()}</p>
              <p>{c.comment}</p>

            </div>
            
          ))}
          <button
              disabled={index === 0}
              onClick={() => setIndex(index - 1)}
            >
              Prev
            </button>

            <button
              disabled={index === photos.length - 1}
              onClick={() => setIndex(index + 1)}
            >
              Next
            </button>
        </div>
      )}
    </div>
  );
}