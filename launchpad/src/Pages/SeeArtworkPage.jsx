import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getChicagoGallery, getMetGallery } from "../api";

export function SeeArtwork() {
  const [artworks, setArtworks] = useState([]);
  const [museum, setMuseum] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchArtworks() {
      try {
        let data = await getChicagoGallery(id);
        setArtworks(data.data);
        setMuseum("chicago");
        console.log("GET CHIC GALL - SEE ARTWORK");
      } catch (error) {
        if (error.response?.status === 404) {
          try {
            let metData = await getMetGallery(id);
            setArtworks(metData);
            setMuseum("met");
            console.log("MET DATA", metData);
          } catch (errorMet) {}
        }
      }
    }
  fetchArtworks();
  }, [id]);

  return (
    <>
      <button onClick={() => navigate(-1)}>Back</button>
      <div key={artworks.id} style={{ marginBottom: "2rem" }}>
        <h2>{artworks.title}</h2>
        <p>{artworks.artist_display || artworks.artistDisplayName}</p>
        <p>{artworks.date_display || artworks.objectDate}</p>
        <p>
          {artworks.description || artworks.medium || "No Description Provided"}
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
      <button>Press here to add this artwork to your personal exhibit</button>
    </>
  );
}
