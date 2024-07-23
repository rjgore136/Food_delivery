import React from "react";
import "./AppDownload.css";
import { assets } from "../../assets/frontend_assets/assets";
const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
      <p>
        For Better Experiece Download <br /> Tomato App
      </p>
      <div className="app-download-platforms">
        <img src={assets.play_store} alt="playstore_icon" />
        <img src={assets.app_store} alt="appstore_icon" />
      </div>
    </div>
  );
};

export default AppDownload;
