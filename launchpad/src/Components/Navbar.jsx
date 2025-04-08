import { Link } from "react-router-dom";
import { pageData } from "./PageData";

export function Navbar() {
  return (
    <div className="navbar">
      {pageData.map((page) => {
        return (
          <Link to={page.path} className="navItem">
            <button>{page.name}</button>
          </Link>
        );
      })}
    </div>
  );
}
