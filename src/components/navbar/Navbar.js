import React, { useEffect, useState } from "react";
import "./navbar.css";
import {
  HomeOutlined,
  MessageOutlined,
  TeamOutlined,
  MessageFilled,
} from "@ant-design/icons";
import Searchbar from "./Searchbar.js";
import RightNav from "./RightNav.js";
import wave from "../../images/wave.png";

const Navbar = ({ data, username, setMessengerOn, messengerOn }) => {
  const [path, setPath] = useState(null);

  //sets current path to alter css for center icons
  useEffect(() => {
    setPath(window.location.pathname);
  }, [path]);

  return (
    <nav className="top-navbar container-fluid bg-white ">
      <div className="row">
        {/* start-elements brand logo and search bar */}
        <div className="left-nav col-6 col-md-4 d-flex justify-content-start align-items-center">
          <div className="navbar-brand me-2 mb-1 d-none d-sm-flex align-items-center">
            <div className="wavelogo">
              {" "}
              <img src={wave} alt="wave png Designed by brgfx / Freepik"></img>
            </div>
          </div>
          {/* Search form */}
          <Searchbar data={data} />
        </div>

        {/* CENTER NAVIGATION */}
        <div className="center-nav col-md-4 container d-none d-md-flex justify-content-center align-items-end">
          {/* home */}
          <a
            className={
              path === "/home"
                ? "current-path mx-1"
                : "center-nav-container mx-1"
            }
            href="/home"
            data-tooltip-id="right-tooltip"
            data-tooltip-content="Home"
          >
            <div className="d-flex align-items-center">
              <HomeOutlined className="top-icon" />
            </div>
          </a>

          {/* friends */}

          <a
            className="d-flex align-items-center"
            href="/friends"
            data-tooltip-id="right-tooltip"
            data-tooltip-content="Friends"
          >
            <div
              className={
                path === "/friends"
                  ? "current-path mx-1"
                  : "center-nav-container mx-1"
              }
            >
              <TeamOutlined className="top-icon" />
            </div>
          </a>

          {/* messenger */}
          <div
            className="d-flex align-items-center nav-messenger"
            data-tooltip-id="right-tooltip"
            data-tooltip-content="Messenger"
            onClick={() => {
              setMessengerOn(!messengerOn);
            }}
          >
            <div className="center-nav-container mx-1">
              {messengerOn ? (
                <MessageFilled className="top-icon icon-filled mx-2" />
              ) : (
                <MessageOutlined className="messenger-icon mx-2" />
              )}
            </div>
          </div>
        </div>

        {/* settings menu and profile page */}
        <div className="end-nav col-6 col-md-4 d-flex justify-content-end">
          {/* uses media queries here to determine screen size to generate the appropriate RightNav version with boolean prop */}
          <div className="collapseTrue">
            <RightNav
              username={username}
              data={data}
              collapseState={true}
              setMessengerOn={setMessengerOn}
            />
          </div>

          <div className="collapseFalse">
            <RightNav
              username={username}
              data={data}
              collapseState={false}
              setMessengerOn={setMessengerOn}
            />
          </div>
        </div>

        {/*tooltip styling - refer to rightnav where tooltip component settings are*/}
      </div>
    </nav>
  );
};

export default Navbar;
