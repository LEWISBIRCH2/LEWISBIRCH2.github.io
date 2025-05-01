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
    <div className="home-container">
      <div className="top-row">
        <div className="top-left">
          <h1>
            The Launchpad <br></br>Project
          </h1>
        </div>
        <div className="top-right">
          <h1>Highlights</h1>
          <h2>Browse selected highlights from the collection</h2>
        </div>
      </div>

      {loading ? (
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <CustomSpinner />
        </div>
      ) : (
        <div className="highlight-grid">
          {artwork.map((art) => (
            <ArtCard art={art} key={art.id} />
          ))}
        </div>
      )}
    </div>
  );
}
