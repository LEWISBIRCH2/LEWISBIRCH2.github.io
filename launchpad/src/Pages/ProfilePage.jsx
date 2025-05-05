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
   
      );
      setExhibit(res.data.personalExhibit || []);
    }
    loadUserData();
  }, []);

  async function handleRemoveArtwork(artworkId) {
    try {
      await axios.post(
        `http://localhost:3000/Users/${user._id}/remove-artwork`,
        { artworkId }
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
      <div className="profileContainer">
        <div className="profileUser">
          <h1>{user.name}'s Personal Exhibit</h1>
        </div>
        <div className="personalExhibitHeader">
          <h2>
            Add artworks to your personal exhibit by ticking the assigned box
            when viewing individual artworks
            <br></br>
            <br></br>
            Remove them from your exhibit by selecting the button below
          </h2>
        </div>
      </div>
      <ul className="personalList">
        {exhibit.map((art, i) => (
          <li key={i}>
            <div key={art.id || art.objectID} style={{ marginBottom: "2rem" }}>
              <h1>{art.title}</h1>
              <h3>Artist</h3>
              <p>{art.artist_display || art.artistDisplayName}</p>
              <h3>Date</h3>

              <p>{art.date_display || art.objectDate}</p>
              <h3>Description</h3>

              <p>
                {art.description
                  ?.replace(/<[a-z]{0,}>/gi, "")
                  .replace(/<\/[a-z]{0,}>/gi, "") ||
                  art.medium ||
                  "No Description Provided"}
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
                className="removeFromExhibit"
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
