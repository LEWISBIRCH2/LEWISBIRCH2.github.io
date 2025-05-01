import { getGalleries } from "../api";
import { useState, useEffect } from "react";
import { ArtCard } from "../Components/ArtCard";
import CustomSpinner from "../Components/Spinner";

export function HomePage() {
  const [artwork, setArtwork] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadAllArtwork() {
      setLoading(true);
      const data = await getGalleries();
      const shuffled = data.data.sort(() => 0.5 - Math.random());
      setArtwork(shuffled.slice(0, 3));
      setLoading(false);
    }
    loadAllArtwork();
  }, []);

  return (
    <>
      <h1>Highlights</h1>
      <h2>Some selected highlights from the collection</h2>
      {loading ? (
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <CustomSpinner />
        </div>
      ) : (
        <>
          <div className="artworks">
            {artwork.map((art) => (
              <ArtCard art={art} key={art.id} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
