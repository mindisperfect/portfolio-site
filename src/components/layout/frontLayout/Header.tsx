import { NavLink } from "react-router-dom";
import { useState } from "react";
import { auth, links } from "../../../data";
import "./header.scss";

const Header = () => {
  const [showMenu, SetShowMenu] = useState(false);

  return (
    <nav className="nav">
      <div className={`${showMenu ? "nav__menu show-menu" : "nav__menu"}`}>
        <ul className="nav__list">
          <div className="auth__login__register">
            {auth.map(({ name, icon, path }, index) => {
              return (
                <li className="nav__item" key={index}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      isActive ? "nav__link active-nav" : "nav__link"
                    }
                    onClick={() => SetShowMenu(!showMenu)} >
                    {icon}
                    <h3 className="nav__name">{name}</h3>
                  </NavLink>
                </li>
              );
            })}
          </div>
          {links.map(({ name, icon, path }, index) => {
            return (
              <li className="nav__item" key={index}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive ? "nav__link active-nav" : "nav__link"
                  }
                  onClick={() => SetShowMenu(!showMenu)}
                >
                  {icon}
                  <h3 className="nav__name">{name}</h3>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <div
        className={`${showMenu ? "nav__toogle animate-toogle" : "nav__toogle"}`}
        onClick={() => SetShowMenu(!showMenu)} >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Header;
