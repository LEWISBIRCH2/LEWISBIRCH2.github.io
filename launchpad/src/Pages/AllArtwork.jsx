import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChicagoArtCard } from "../Components/ChicagoArtCard";
import { getGalleries } from "../api";
import axios from "axios";
import { getGalleriesPage } from "../api";

export function AllArtwork() {
  const [art, setArt] = useState([]);
  const [museum, setMuseum] = useState(null);
  const [page, setPage] = useState(1);
  // const [info, setInfo] = useState({});

  useEffect(() => {
    async function fetchArt() {
      if (museum === "chicago") {
        const data = await getGalleriesPage(page);
        setArt(data.data);
      }
    }
    fetchArt();
  }, [museum, page]);

  function handlePrevious() {
    if (page > 1) setPage((prev) => prev - 1);
  }
  function handleNext() {
    setPage((prev) => prev + 1);
  }
  //   async function handleChicago() {
  //     // CURRENTLY, get galleries ONLY gets Chicago. DO NOT FORGET THIS.
  //     const data = await getGalleries();
  //     setArt(data.data);
  //   }

  return (
    <>
      <h2>Select which collection of artwork you'd like to browse</h2>
      <button
        onClick={() => {
          setMuseum("chicago");
          setPage(1);
        }}
      >
        Art Institute of Chicago{" "}
      </button>
      <button> Museum #2</button>
      <button> Museum #3</button>

      {museum && (
        <div style={{ marginTop: "20px" }}>
          <button disabled={page === 1} onClick={handlePrevious}>
            Previous
          </button>
          <span style={{ margin: "0 10px" }}>Page {page}</span>
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      <div className="chicago-artwork">
        {art.map((art) => (
          <ChicagoArtCard key={art._id} art={art} />
        ))}


      </div>
    </>
  );
}
