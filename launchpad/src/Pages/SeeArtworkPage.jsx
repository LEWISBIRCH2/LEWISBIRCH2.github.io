import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getChicagoGallery, getMetGallery } from "../api";
import axios from "axios";
import CustomSpinner from "../Components/Spinner";
import { jwtDecode } from "jwt-decode";

export function SeeArtwork() {
  const [artworks, setArtworks] = useState([]);
  const [museum, setMuseum] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchArtworks() {
      setLoading(true);
      try {
        let data = await getChicagoGallery(id);
        setArtworks(data.data);
        setMuseum("chicago");
      } catch (error) {
        if (error.response?.status === 404 || error.response?.status === 500) {
          try {
            let metData = await getMetGallery(id);
            setArtworks(metData);
            setMuseum("met");
          } catch (errorMet) {}
        }
      }
      setLoading(false);
    }
    fetchArtworks();
  }, [id]);

  async function handleAddToExhibit() {
    const token = localStorage.getItem("User");
    const decoded = jwtDecode(token);
    const userId = decoded._id;
    setIsChecked(!isChecked);

    try {
      await axios.post(
        `http://localhost:3000/Users/${userId}/add-artwork`,
        {
          artwork: artworks,
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
      );
      alert("Artwork added to your personal exhibit!");
    } catch (err) {
      console.error("Error adding artwork:", err);
      alert("Failed to add artwork.");
    }
  }

  return (
    <>
      <button onClick={() => navigate(-1)}>Back</button>

      {loading ? (
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <CustomSpinner />
        </div>
      ) : (
        <>
          <div key={artworks.id} style={{ marginBottom: "2rem" }}>
            <h2>{artworks.title}</h2>
            <p>{artworks.artist_display || artworks.artistDisplayName}</p>
            <p>{artworks.date_display || artworks.objectDate}</p>
            <p>
              {artworks.description
                ?.replace(/<[a-z]{0,}>/gi, "")
                .replace(/<\/[a-z]{0,}>/gi, "") ||
                artworks.medium ||
                "No Description Provided"}
            </p>
            <br></br>
            {artworks.image_id || artworks.primaryImage ? (
              <img
                src={
                  artworks.image_id
                    ? `https://www.artic.edu/iiif/2/${artworks.image_id}/full/843,/0/default.jpg`
                    : artworks.primaryImage
                }
                alt={artworks.title || artworks.medium}
                width="300"
              />
            ) : null}
          </div>
          <label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleAddToExhibit}
            />
            Add to personal exhibit
          </label>
        </>
      )}
    </>
  );
}
