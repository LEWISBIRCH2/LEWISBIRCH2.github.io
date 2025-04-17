import { useState } from "react";
import { useParams } from "react-router-dom";

export function AllArtwork() {
  return (
    <>
      <h2>Select which collection of artwork you'd like to browse</h2>
      <button>Art Institute of Chicago </button>
      <button> Museum #2</button>
      <button> Museum #3</button>
    </>
  );
}
