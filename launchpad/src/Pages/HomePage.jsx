import { getGalleries } from "../api";
import { useState, useEffect } from "react";
import { ArtCard } from "../Components/ArtCard";

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
      <button>Browse All</button>
      <div className="artworks">
        {artwork.slice(0, 6).map((art) => {
          return <ArtCard art={art} key={art.id} />;
        })}
      </div>
    </>
  );
}
