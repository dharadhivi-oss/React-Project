
import { Link } from "react-router-dom";

function Navbar({ favoriteCount }) {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        CampusConnect
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/register">Register</Link>
        <Link to="/favorites">
          Favorites ({favoriteCount})
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

