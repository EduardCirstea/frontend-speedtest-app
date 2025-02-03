import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../utilities/hooks";

import { RootState } from "../app/store";
import { logout } from "../features/authSlice"; // Adjust the path to your logout action

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const { status, user } = useAppSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
  };

  return (
    <nav className="navbar">
      <div className="navbar-background" />
      <div className="navbar-content">
        <div className="navbar-logo">
          <Link to="/">
            <span className="logo-text">MyApp</span>
            <div className="logo-underline" />
          </Link>
        </div>

        <input type="checkbox" id="menu-toggle" className="menu-toggle" />
        <label htmlFor="menu-toggle" className="hamburger">
          <div className="hamburger-lines">
            <span className="line" />
            <span className="line" />
            <span className="line" />
          </div>
        </label>

        <ul className="navbar-links">
          <li>
            <Link to="/">
              Home
              <div className="link-highlight" />
            </Link>
          </li>
          <li>
            <Link to="/harta-multilayer">
              Harta
              <div className="link-highlight" />
            </Link>
          </li>
          {!user ? (
            <>
              <li>
                <Link to="/login">
                  Login
                  <div className="link-highlight" />
                </Link>
              </li>
              <li>
                <Link to="/register">
                  Register
                  <div className="link-highlight" />
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/history">
                  Istoric
                  <div className="link-highlight" />
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="log-button">
                  Logout
                  <div className="button-glow" />
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
