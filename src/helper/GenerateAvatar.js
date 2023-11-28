import React from "react";
import emptyAvatar from "../images/empty_avatar.png";
import { useNavigate } from "react-router-dom";

function GenerateAvatar({ url, cssClassIdentifier, username, toggleHandler }) {
  const navigate = useNavigate();

  let activeURL = null;
  if (url !== "NO PROFILE PHOTO") {
    activeURL = url;
  }

  const handleNav = (username) => {
    navigate(`/user/${username}`);
    window.location.reload();
  };

  return (
    <img
      onClick={() => {
        toggleHandler && handleNav(username);
      }}
      className={cssClassIdentifier}
      src={activeURL || emptyAvatar}
    />
  );
}

export default GenerateAvatar;
