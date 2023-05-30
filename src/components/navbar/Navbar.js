import React, { useEffect, useState } from "react";
import "./navbar.css";
import avatar from "../../images/empty_avatar.png";
import { Tooltip } from "react-tooltip";
import { HomeOutlined, MessageOutlined, TeamOutlined } from "@ant-design/icons";
import Searchbar from "./Searchbar";
import RightNav from "./RightNav";

const Navbar = ({ data, username }) => {
  const [path, setPath] = useState(null);

  //sets current path to alter css for center icons
  useEffect(() => {
    setPath(window.location.pathname);
  }, [path]);

  return (
    <nav className="container-fluid d-flex justify-content-between bg-light">
      {/* start-elements brand logo and search bar */}
      <div className="left-nav container d-flex justify-content-start align-items-center">
        <a
          className="navbar-brand me-2 mb-1 d-flex align-items-center"
          href="#"
        >
          <img
            src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
            height="20"
            alt="MDB Logo"
            loading="lazy"
            style={{ marginTop: "2px" }}
          />
        </a>
        {/* Search form */}
        <Searchbar data={data} />
      </div>

      {/* CENTER NAVIGATION */}
      <div className="center-nav container d-none d-md-flex justify-content-center align-items-end">
        {/* home */}
        <a
          className={
            path === "/home"
              ? "center-nav-container mx-1"
              : "center-nav-container mx-1"
          }
          href="/home"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Home"
        >
          <div className="d-flex align-items-center">
            <HomeOutlined
              className={
                path === "/home" ? "current-path mx-2" : "friends-icon mx-2"
              }
            />
          </div>
        </a>

        {/* friends */}

        <a
          className="d-flex align-items-center"
          href="/friends"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Friends"
        >
          <div
            className={
              path === "/friends"
                ? "current-path mx-1"
                : "center-nav-container mx-1"
            }
          >
            <TeamOutlined />
          </div>
        </a>

        {/* messenger */}
        <a
          className="d-flex align-items-center"
          href="#"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Messenger"
        >
          <div className="center-nav-container mx-1">
            <MessageOutlined className="messenger-icon mx-2" />
          </div>
        </a>
      </div>

      {/* settings menu and profile page */}
      <div className="end-nav container d-flex justify-content-end">

        {/* uses media queries here to determine screen size to generate the appropriate RightNav version with boolean prop */}
        <div className="collapseTrue">
          <RightNav username={username} data={data} collapseState={true} />
        </div>

        <div className="collapseFalse">
          <RightNav username={username} data={data} collapseState={false} />
        </div>
      </div>

      {/*tooltip styling*/}
      <Tooltip
        style={{ fontSize: "11px", paddingTop: "3px", paddingBottom: "3px" }}
        delayShow="400"
        noArrow="true"
        id="my-tooltip"
      />
    </nav>
  );
};

export default Navbar;
