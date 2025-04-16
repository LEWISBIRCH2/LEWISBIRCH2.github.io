import { getGallery } from "../api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import React, { useEffect, useState } from "react";
import axios from "axios";

export function SeeArtwork() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get(
          "https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display,image_id"
        );
        setArtworks(response.data.data);
      } catch (error) {
        console.error("Error fetching artworks:", error.message);
      }
    };

    fetchArtworks();
  }, []);

  return (
    <div>
      <h1>Artworks</h1>
      {artworks.map((art) => (
        <div key={art.id} style={{ marginBottom: "2rem" }}>
          <h2>{art.title}</h2>
          <p>{art.artist_display}</p>
          <p>{art.date_display}</p>
          {art.image_id && (
            <img
              src={`https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`}
              alt={art.title}
              width="300"
            />
          )}
        </div>
      ))}
    </div>
  );
}
