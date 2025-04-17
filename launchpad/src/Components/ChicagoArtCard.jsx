import { Link } from "react-router-dom";

export function ChicagoArtCard({ art }) {
  return (
    <Link to={`/gallery/${art.id}`}>
      <div className="art">
        <h1>{art.title}</h1>
        <h2>{art.date_display}</h2>

        <img
          src={`https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`}
          alt={art.title}
          width="300"
        />
      </div>
    </Link>
  );
}
