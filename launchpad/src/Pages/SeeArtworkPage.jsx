import { getGallery } from "../api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function SeeArtwork() {
  const [art, setArt] = useState({});

  const navigate = useNavigate(-1);

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
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
      <h1>{art.museum}</h1>
      <h2>{art.title}</h2>
      <p>{art.description}</p>
    </>
  );
}
