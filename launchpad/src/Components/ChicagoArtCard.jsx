import { Link } from "react-router-dom";

export function ChicagoArtCard({ art }) {
  return (
    <Link to={`/gallery/${art.id}`}>
      <div className="art">
        <h1>{art.title || "Untitled"}</h1>
        <h2>{art.date_display || "No Date Provided"}</h2>

        <img
          className="artCardImage"
          src={`https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`}
          alt={art.title}
        />
      </div>
    </Link>
  );
}
