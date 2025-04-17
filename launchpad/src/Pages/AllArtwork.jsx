import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChicagoArtCard } from "../Components/ChicagoArtCard";
import { getGalleries } from "../api";

export function AllArtwork() {
  const [art, setArt] = useState([]);

  async function handleChicago() {
    // CURRENTLY, get galleries ONLY gets Chicago. DO NOT FORGET THIS. 
    const data = await getGalleries();
    setArt(data.data);
  }

  return (
    <>
      <h2>Select which collection of artwork you'd like to browse</h2>
      <button onClick={handleChicago}>Art Institute of Chicago </button>
      <button> Museum #2</button>
      <button> Museum #3</button>
    
    
      <div className="chicago-artwork">
        {art.map((art) => (
          <ChicagoArtCard key={art._id} art={art} />
        ))}
      </div>
    </>
  );
}
