import React from "react";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../firebase";

function Nav() {
  const isRunningStandalone = window.matchMedia("(display-mode: standalone)").matches;
  let userName = auth.currentUser.displayName?.split(' ')[0];

  auth.onAuthStateChanged(user => userName = user.displayName?.split(' ')[0]);

  function signOut(){
    auth.signOut();
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ background: "#000000" }}
    >

      <Link className="navbar-brand p-0" to="/"> 
        <img src="logo.png" alt="myExpenses" height="40" />
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          {!isRunningStandalone && (
            <>
              <NavButton title="Home" icon="fas fa-home" link="/" />
              <NavButton title="Search" icon="fas fa-search" link="/search" />
              <NavButton
                title="Records"
                icon="fas fa-book-open"
                link="/records"
              />
              <NavButton title="Stats" icon="fas fa-chart-line" link="/stats" />
            </>
          )}

          <li className="nav-item dropdown">
            <button
              className="btn nav-link dropdown-toggle"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {/* <img
                src="https://www.w3schools.com/howto/img_avatar.png"
                className="avatar"
                alt="Avatar"
              /> */}
              {userName}
            </button>
            <div
              className={`dropdown-menu ${isRunningStandalone && "show"} dropdown-menu-right`}
              aria-labelledby="navbarDropdownMenuLink"
            >
              <Link to="/settings" className="dropdown-item">
                <i className="fas fa-cog"></i> Settings
              </Link>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={signOut}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;

function NavButton({ title, icon, link }) {
  return (
    <NavLink
      exact
      activeClassName="active"
      className="nav-item standalone-mode"
      to={link}
    >
      <span className="nav-link">
        <i className={icon}></i> {title}
      </span>
    </NavLink>
  );
}
