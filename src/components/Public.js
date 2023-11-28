import React from "react";
import { useEffect } from "react";
import axios from "axios";
import config from "../helper/config.js";

function Public({
  thisUser,
  publicUsers,
  thisUserPending,
  thisUserFriends,
  toggle,
  setToggle,
}) {
  useEffect(() => {
    const getUsers = async () => {
      try {
      } catch (err) {
        console.log(err.response);
      }
    };
    getUsers();
  }, []);

  const handleSendFriendRequest = async (userid) => {
    const usernameOrigin = thisUser;
    const userIDEnd = userid;

    //axios info to backend to handle logic for adding friend requests

    const response = await axios.post(
      `${config.backendServer}/api/user/friendrequest`,
      {
        usernameOrigin: usernameOrigin,
        userIDEnd: userIDEnd,
      }
    );
    console.log(response.data);

    console.log(usernameOrigin);
    console.log(userIDEnd);

    setToggle(!toggle);
  };

  const buildAllUsers = () => {
    // Convert thisUserFriends and thisUserPending to lookup tables
    const friendsSet = new Set(thisUserFriends.map((friend) => friend._id));
    const pendingSet = new Set(thisUserPending.map((pending) => pending._id));

    return publicUsers.map((user) => {
      if (user.username !== thisUser) {
        const isFriend = friendsSet.has(user._id);
        const isPending = pendingSet.has(user._id);

        if (isFriend) {
          return (
            <div style={{ padding: "7px" }} key={user._id}>
              {user.fullName} - Friends
            </div>
          );
        } else if (isPending) {
          return (
            <div style={{ padding: "7px" }} key={user._id}>
              {user.fullName} - Pending Request
              <div>
                <button disabled>Pending</button>
              </div>
            </div>
          );
        } else {
          return (
            <div style={{ padding: "7px" }} key={user._id}>
              {user.fullName}
              {/* user.profilePhotoURL will be the URL */}
              <div>
                <button
                  id={user._id}
                  onClick={(event) => {
                    handleSendFriendRequest(event.target.id);
                  }}
                >
                  Send Friend Request
                </button>
              </div>
            </div>
          );
        }
      }
      return null;
    });
  };

  return (
    <div>
      {" "}
      <div>
        {" "}
        <h2>PUBLIC USERS</h2>
      </div>
      <div>{buildAllUsers()}</div>
    </div>
  );
}

export default Public;

//
