import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/display">User List</Link>
        </li>
        <li>
          <Link to="/display2">Add Language</Link>
        </li>
        <li>
          <Link to="/display3">User Language</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
