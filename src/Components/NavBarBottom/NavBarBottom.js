import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBarBottom.css";

import { ReactComponent as HomeIcon } from "../../Icons/home-solid.svg";
import { ReactComponent as SearchIcon } from "../../Icons/search-solid.svg";
import { ReactComponent as BookIcon } from "../../Icons/book-open-solid.svg";
import { ReactComponent as StatsIcon } from "../../Icons/chart-line-solid.svg";

function NavBarBottom() {
  const isRunningStandalone = window.matchMedia("(display-mode: standalone) and (min-width: 992px)").matches;

  return (
    <>
      {isRunningStandalone && (
        <div className="bottomNavBar">
          <NavButton title="Home" icon={<HomeIcon />} link="/" />
          <NavButton title="Search" icon={<SearchIcon />} link="/search" />
          <NavButton title="Records" icon={<BookIcon />} link="/records" />
          <NavButton title="Stats" icon={<StatsIcon />} link="/stats" />
        </div>
      )}
    </>
  );
}

function NavButton({ title, icon, link }) {
  return (
    <NavLink
      exact
      activeClassName="navButton__active"
      className="navButton"
      to={link}
    >
      <span className="navButton__icon">{icon}</span>
      <span className="navButton__title">{title}</span>
    </NavLink>
  );
}

export default NavBarBottom;
