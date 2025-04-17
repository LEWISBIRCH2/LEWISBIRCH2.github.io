import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGallery } from "../api";

export function SeeArtwork() {
  const [artworks, setArtworks] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchArtworks() {
      const data = await getGallery(id);
      setArtworks(data.data);
    }
    fetchArtworks();
  }, [id]);

  return (
    <div key={artworks.id} style={{ marginBottom: "2rem" }}>
      <h2>{artworks.title}</h2>
      <p>{artworks.artist_display}</p>
      <p>{artworks.date_display}</p>
      <p>
        {artworks.description
          ? artworks.description
          : "No Description Provided"}
      </p>
      <br></br>
      {artworks.image_id && (
        <img
          src={`https://www.artic.edu/iiif/2/${artworks.image_id}/full/843,/0/default.jpg`}
          alt={artworks.title}
          width="300"
        />
      )}
    </div>
  );
}
