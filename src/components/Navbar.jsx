import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

const NavBar = () => {
  return (
    <nav>
      <div className={styles.navlink}>
        <div className={styles.boxlink}>
          <Link to="/">Home</Link>
        </div>
        <div className={styles.boxlink}>
          <Link to="/UserList">User List</Link>
        </div>
        <div className={styles.boxlink}>
          <Link to="/LanguageList">Add Language</Link>
        </div>
        <div className={styles.boxlink}>
          <Link to="/UserAndLanguages">User's Language Background</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
