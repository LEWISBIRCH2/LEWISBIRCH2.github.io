import { Link } from "react-router-dom";

export function ArtCard({ art }) {
  return (
    <Link to={`/gallery/${art._id}`}>
      <div className="art">
        <h1>{art.museum}</h1>
        <h2>{art.title}</h2>
        <p>{art.description}</p>
      </div>
    </Link>
  );
}
