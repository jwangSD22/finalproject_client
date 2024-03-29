import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import config from "../helper/config.js";
import Public from "../components/Public.js";
import Friends from "../components/Friends.js";
import Pending from "../components/Pending.js";

const token = localStorage.getItem("jwt");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

function Users() {
  const navigate = useNavigate();
  const [thisUser, setThisUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [publicUsers, setPublicUsers] = useState([]);
  const [thisUserFriends, setThisUserFriends] = useState([]);
  const [thisUserPending, setThisUserPending] = useState([]);
  const [toggle, setToggle] = useState(true);

  const handleRemovePending = (userid) => {
    // Remove the item with the specified userid from thisUserPending
    const updatedPending = thisUserPending.filter(
      (item) => item._id !== userid
    );
    setThisUserPending(updatedPending);
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        let response = await axios.get(
          `${config.backendServer}/api/users/loginstatus`
        );
        if (response.status === 200) {
          setIsLoggedIn(true);

          const user = response.data.user.jwtusername;
          setThisUser(response.data.user.jwtusername);

          let getPublicUsersResponse = await axios.get("api/users");
          setPublicUsers(getPublicUsersResponse.data);

          let getFriendsResponse = await axios.get(
            `${config.backendServer}/api/user/friends/${user.username}`
          );
          console.log(getFriendsResponse.data);
          setThisUserFriends(getFriendsResponse.data);

          let getPendingResponse = await axios.get(
            `${config.backendServer}/api/user/pending`
          );
          setThisUserPending(getPendingResponse.data);

          return true;
        }
      } catch (err) {
        console.log(err);
      }
    };
    checkLogin();
  }, [toggle, thisUser]);

  //use effect to check login status
  //send user state down to Public so that it can filter out yourself

  return (
    <div className="users">
      <Public
        thisUser={thisUser}
        publicUsers={publicUsers}
        thisUserPending={thisUserPending}
        thisUserFriends={thisUserFriends}
        setToggle={setToggle}
        toggle={toggle}
      />
      <Friends
        thisUser={thisUser}
        publicUsers={publicUsers}
        thisUserFriends={thisUserFriends}
        setToggle={setToggle}
        toggle={toggle}
      />
      <Pending
        thisUser={thisUser}
        publicUsers={publicUsers}
        handleRemovePending={handleRemovePending}
        thisUserPending={thisUserPending}
        setToggle={setToggle}
        toggle={toggle}
      />
    </div>
  );
}

export default Users;
