import React, { Profiler, useContext, useState } from "react";
import "./NabBar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/storeContext";
const NavBar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getCartTotalAmount,token,setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = ()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }
  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          className={menu === "home" ? "active_nav_sec" : ""}
          onClick={() => setMenu("home")}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          className={menu === "menu" ? "active_nav_sec" : ""}
          onClick={() => setMenu("menu")}
        >
          menu
        </a>
        <a
          href="#app-download"
          className={menu === "mobile app" ? "active_nav_sec" : ""}
          onClick={() => setMenu("mobile app")}
        >
          mobile app
        </a>
        <a
          href="#footer"
          className={menu === "contact us" ? "active_nav_sec" : ""}
          onClick={() => setMenu("contact us")}
        >
          contact us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="basket-icon" />
          </Link>
          {getCartTotalAmount() === 0 ? "" : <div className="dot"></div>}
        </div>

        {!token ? (
          <button onClick={() => setShowLogin((prev) => !prev)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="profile" />
            <ul className="nav-profile-dropdown">
              <li>
                <img src={assets.bag_icon} alt="bag_icon" />
                <p>Orders</p>
              </li>
              <hr/>
              <li onClick={logout}>
              <img src={assets.logout_icon} alt="logout_icon" />
              <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
