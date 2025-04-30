import { getGalleries } from "../api";
import { useState, useEffect } from "react";
import { ArtCard } from "../Components/ArtCard";

export function HomePage() {
  const [artwork, setArtwork] = useState([]);

  useEffect(() => {
    async function loadAllArtwork() {
      const data = await getGalleries();
      const shuffled = data.data.sort(() => 0.5 - Math.random());
      setArtwork(shuffled.slice(0, 3));
    }
    loadAllArtwork();
  }, []);

  return (
    <>
      <h1>Highlights</h1>
      <h2>Some selected highlights from the collection</h2>

      <div className="artworks">
        {artwork.map((art) => (
          <ArtCard art={art} key={art.id} />
        ))}
      </div>
    </>
  );
}
