import React from "react";

import "./home.scss";
import { SideNavBar } from "../../components";

const Home = () => {
  return (
    <div className="home">
      <div className="home-wrapper">
        <div className="home-sidenavbar">
          <SideNavBar />
        </div>
        <div className="home-contain">container</div>
      </div>
    </div>
  );
};

export default Home;
