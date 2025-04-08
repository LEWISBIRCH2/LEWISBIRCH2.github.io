import { getGallery } from "../api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export function SeeArtwork() {
  const [art, setArt] = useState({});

  let params = useParams();
  let id = params.id;

  useEffect(() => {
    async function loadArt() {
      let data = await getGallery(id);
      setArt(data);
    }
    loadArt();
  }, []);

  return (
    <>
      <h1>{art.museum}</h1>
      <h2>{art.title}</h2>
      <p>{art.description}</p>
    </>
  );
}
