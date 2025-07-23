import { useContext, useEffect, useState } from "react";
import styles from "./Header.module.css";
import { NavLink, useLocation } from "react-router-dom";
import HeaderList from "./HeaderList";
import HeaderSearch from "./HeaderSearch";
import Button from "../../button/Button";
import classNames from "classnames";
import { checkLogin } from "../../../util/auth/auth";
import DataContext from "../../../context/DataContext";

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const { activeUser } = useContext(DataContext);
  const isLoggedIn = activeUser.isLoggedIn;

  return (
    <div className={styles.header}>
      <div
        className={classNames(styles.headerContainer, {
          [styles.listMode]: !isHome,
        })}
      >
        <HeaderList />
        {isHome && (
          <>
            <h1 className={styles.headerTitle}>
              A lifetime of discounts? It's Genius.
            </h1>
            <p className={styles.headerDesc}>
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free account.
            </p>
            {!isLoggedIn && (
              <NavLink to="/auth?mode=login">
                <Button type="primary">Sign up / Login</Button>
              </NavLink>
            )}
            {isLoggedIn && <HeaderSearch />}
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
