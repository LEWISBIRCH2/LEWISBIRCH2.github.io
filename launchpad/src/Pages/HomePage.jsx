import { getGalleries } from "../api";
import { useState, useEffect } from "react";
import { ArtCard } from "../Components/ArtCard";

export function HomePage() {
  const [artwork, setArtwork] = useState([]);

  useEffect(() => {
    async function loadAllArtwork() {
      const data = await getGalleries();
      setArtwork(data);
    }

    loadAllArtwork();
  }, []);

  return (
    <div className="artworks">
      {artwork.map((art) => {
        return <ArtCard art={art} />;
      })}
    </div>
  );
}
