import Button from "../button/Button";
import styles from "./Navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../util/auth/logout";
import DataContext from "../../context/DataContext";
import { useContext } from "react";

export default function Navbar() {
  const navigate = useNavigate();

  const { activeUser, setActiveUserFunction } = useContext(DataContext);

  const logoutHandler = () => {
    logoutUser(navigate, setActiveUserFunction);
  };

  return (
    <div className={`div-container background-darkBlue ${styles.navbarStyle}`}>
      <div className={styles.topContent}>
        {/* Logo & Navigation */}
        <div>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.active : styles.homeTitle
            }
          >
            Booking
          </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? styles.active : styles.homeTitle
            }
          >
            Search
          </NavLink>
        </div>

        {/* Nếu chưa đăng nhập */}
        {!activeUser.isLoggedIn && (
          <div className="d-flex">
            <NavLink to="/auth?mode=signup">
              <Button type="secondary">Signup</Button>
            </NavLink>
            <NavLink to="/auth?mode=login">
              <Button type="secondary">Login</Button>
            </NavLink>
          </div>
        )}

        {/* Nếu đã đăng nhập */}
        {activeUser.isLoggedIn && (
          <div>
            <label className={styles.userEmail}>{activeUser.email}</label>
            <NavLink to="/transactions">
              <Button type="secondary">Transactions</Button>
            </NavLink>
            <Button type="secondary" onClick={logoutHandler}>
              Log out
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
