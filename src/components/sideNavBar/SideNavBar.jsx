import React from "react";
import { Link } from "react-router-dom";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

import "./sidenavbar.scss";
import {RoutesConstant} from "../../assets/constants"

const SideNavBar = () => {
  return (
    <div className="side-nav-bar">
      <div className="side-nav-bar-wrapper">
        <div className="side-nav-bar-top">
          <div className="side-nav-bar-title">Memory Blog</div>
          <div className="side-nav-bar-logo">
            <MenuBookIcon className="logo-icoon" />
          </div>
        </div>
        <div className="side-nav-bar-middle">
          <div className="side-nav-bar-items">
            <Link className="side-nav-links">
              <AddBoxIcon className="link-icon" />
              <p>Create Post</p>
            </Link>
          </div>
          <div className="side-nav-bar-items">
            <Link to={RoutesConstant.userProfile} className="side-nav-links">
              <PersonIcon className="link-icon" />
              <p>My Profile</p>
            </Link>
          </div>
        </div>
        <div className="side-nav-bar-bottom">
          <div className="side-nav-bar-logout">
            <LogoutIcon className="link-icon" />
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
