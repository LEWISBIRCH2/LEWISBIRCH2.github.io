import { getGalleries } from "../api";
import { useState, useEffect } from "react";
import { ArtCard } from "../Components/ArtCard";
import { AllArtwork } from "./AllArtwork";
import { Link } from "react-router-dom";

export function HomePage() {
  const [artwork, setArtwork] = useState([]);

  useEffect(() => {
    async function loadAllArtwork() {
      const data = await getGalleries();
      setArtwork(data.data);
    }
    loadAllArtwork();
  }, []);

  return (
    <>
      <h1>Highlights </h1>
      <h2>Some selected highlights from the collection</h2>

      <div className="artworks">
        {artwork.slice(0, 6).map((art) => {
          return <ArtCard art={art} key={art.id} />;
        })}
      </div>
    </>
  );
}
