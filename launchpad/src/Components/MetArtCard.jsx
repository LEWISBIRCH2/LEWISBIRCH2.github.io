import React from "react";
import { Link } from "react-router-dom";

export function MetArtCard({ art }) {
  return (
    <Link to={`/gallery/${art.objectID}`}>
      <div className="art">
        <h2>{art.title || "Untitled"}</h2>
        <p>{art.objectDate || "No Date Provided"}</p>
        <img
          className="artCardImage"
          src={art.primaryImageSmall}
          alt={art.title}
        />
      </div>
    </Link>
  );
}
