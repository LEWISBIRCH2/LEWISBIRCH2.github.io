import { useState, useEffect } from "react";
import * as jwt_decode from "jwt-decode";
import axios from "axios";

export function ProfilePage() {
  const [user, setUser] = useState([]);
  const [exhibit, setExhibit] = useState([]);

  useEffect(() => {
    async function loadUserData() {
      const token = localStorage.getItem("User");
      const decodedUser = jwt_decode.jwtDecode(token);
      setUser(decodedUser);

      const res = await axios.get(
        `http://localhost:3000/Users/${decodedUser._id}`
        // {
        //   headers: { Authorization: `Bearer ${token}` },
        // }
      );
      setExhibit(res.data.personalExhibit || []);
    }
    loadUserData();
  }, []);

  async function handleRemoveArtwork(artworkId) {
    const token = localStorage.getItem("User"); // Would I need this? If removing all headers
    try {
      await axios.post(
        `http://localhost:3000/Users/${user._id}/remove-artwork`,
        { artworkId }
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      alert("Successfully removed artwork!");

      setExhibit((prev) =>
        prev.filter((art) => (art.id || art.objectID) !== artworkId)
      );
    } catch (err) {
      alert("Could not remove artwork.");
    }
  }

  return (
    <>
      <label>Name:</label>
      <h2>{user.name}</h2>
      <label>Email:</label>
      <h2>{user.email}</h2>
      <h1>-----------------</h1>
      <br></br>
      <label>Personal Exhibit:</label>
      <ul>
        {exhibit.map((art, i) => (
          <li key={i}>
            <div key={art.id} style={{ marginBottom: "2rem" }}>
              <h2>{art.title}</h2>
              <p>{art.artist_display || art.artistDisplayName}</p>
              <p>{art.date_display || art.objectDate}</p>
              <p>
                {art.description || art.medium || "No Description Provided"}
              </p>
              <br></br>
              {art.image_id || art.primaryImage ? (
                <img
                  src={
                    art.image_id
                      ? `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`
                      : art.primaryImage
                  }
                  alt={art.title || art.medium}
                  width="300"
                />
              ) : null}
              <br></br>
              <button
                onClick={() => handleRemoveArtwork(art.id || art.objectID)}
              >
                Remove from Personal Exhibit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
