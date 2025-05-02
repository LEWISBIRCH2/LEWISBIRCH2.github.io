import { useEffect, useState } from "react";
import { ChicagoArtCard } from "../Components/ChicagoArtCard";
import { MetArtCard } from "../Components/MetArtCard";
import { initializeMetIDs, getMetArtworksBatch } from "../api";
import { getGalleriesPage } from "../api";
import CustomSpinner from "../Components/Spinner";

export function AllArtwork() {
  const [rawArt, setRawArt] = useState([]);
  const [art, setArt] = useState([]);
  const [museum, setMuseum] = useState(null);
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchArt() {
      setLoading(true);
      if (museum === "chicago") {
        const data = await getGalleriesPage(page);
        setRawArt(data.data);
      }

      if (museum === "met") {
        await initializeMetIDs();
        const metData = await getMetArtworksBatch((page - 1) * 20, 20);
        setRawArt(metData);
      }
      setLoading(false);
    }
    fetchArt();
  }, [museum, page]);

  useEffect(() => {
    let sorted = [...rawArt];
    if (sortOrder === "asc") {
      sorted = [...sorted].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "desc") {
      sorted = [...sorted].sort((a, b) => b.title.localeCompare(a.title));
    }
    setArt(sorted);
  }, [rawArt, sortOrder]);

  function handlePrevious() {
    if (page > 1) setPage((prev) => prev - 1);
  }
  function handleNext() {
    setPage((prev) => prev + 1);
  }

  function handleSortChange(e) {
    setSortOrder(e.target.value);
  }

  return (
    <>
      <div className="topTextContainer">
        <h2>Select which collection of artwork you'd like to browse</h2>
        <button
          className="chicagoButton"
          onClick={() => {
            setMuseum("chicago");
            setPage(1);
          }}
        >
          The Art Institute of Chicago
        </button>
        <button
          className="metButton"
          onClick={async () => {
            setMuseum("met");
            setPage(1);
          }}
        >
          The Metropolitan Museum of Art
        </button>
      </div>
      {loading ? (
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <CustomSpinner />
        </div>
      ) : (
        <>
          {museum && (
            <div className="paginationAndSortContainer">
              <div className="paginationControls">
                <button disabled={page === 1} onClick={handlePrevious}>
                  Previous
                </button>
                <span className="pageText">Page {page}</span>
                <button onClick={handleNext}>Next</button>
              </div>

              {art.length > 0 && (
                <div className="sortControls">
                  <label htmlFor="sortSelect">Sort by Title: </label>
                  <select
                    id="sortSelect"
                    onChange={handleSortChange}
                    value={sortOrder || ""}
                  >
                    <option value=""></option>
                    <option value="asc">A → Z</option>
                    <option value="desc">Z → A</option>
                  </select>
                </div>
              )}
            </div>
          )}
            <div className="allArtworkPageContainer">
              {art.slice(0, 16).map((artwork) =>
                museum === "met" ? (
                  <div className="single">
                    <MetArtCard key={artwork.objectID} art={artwork} />
                  </div>
                ) : (
                  <div className="single">
                    <ChicagoArtCard key={artwork._id} art={artwork} />
                  </div>
                )
              )}
            </div>
        </>
      )}
    </>
  );
}
