import React from "react";

export function MetArtCard({ art }) {
  if (!art || !art.primaryImageSmall) return null;

  return (
    <div className="art">
      <h2>{art.title || "Untitled"}</h2>
      <p>{art.artistDisplayName || "Unknown Artist"}</p>
      <p>{art.objectDate || "No Date Provided"}</p>
      <img
        src={art.primaryImageSmall}
        alt={art.title}
        width="300"
        style={{ borderRadius: "10px" }}
      />
    </div>
  );
}
