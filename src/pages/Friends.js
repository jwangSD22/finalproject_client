import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pending from "../components/friendsPage/Pending.js";
import axios from "axios";
import config from "../helper/config.js";
import Navbar from "../components/navbar/Navbar.js";
import Messenger from "../messenger/Messenger.js";
import emptyAvatar from "../images/empty_avatar.png";
import "./Friends.css";

function Friends() {
  const [username, setUsername] = useState(null);
  const [friends, setFriends] = useState(null);
  const [messengerOn, setMessengerOn] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState(null);
  const [data, setData] = useState(null);
  const [pending, setPending] = useState([]);
  const [friendsGenerated, setFriendsGenerated] = useState([]);
  const [pendingGenerated, setPendingGenerated] = useState([]);
  const [pendingActionToggle, setPendingActionToggle] = useState(true);
  const [acceptFriendToggle, setAcceptFriendToggle] = useState(true);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        let response = await axios.get(
          `${config.backendServer}/api/users/loginstatus`
        );
        if (response.status) {
          setUsername(response.data.user.jwtusername);
          setUserID(response.data.user.jwtid);
          // setIsLoggedIn(true);
        }
      } catch (err) {
        if (err.response.status === 401) {
          navigate("/");
        }
      }
    };

    const retrieveData = async () => {
      try {
        let response = await axios.get(`${config.backendServer}/api/users`);

        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    checkLogin();
    retrieveData();
  }, []);

  useEffect(() => {
    const getPending = async () => {
      const response = await axios.get(
        `${config.backendServer}/api/user/pending`
      );
      setPending(response.data);
    };

    getPending();
  }, [pendingActionToggle]);

  useEffect(() => {
    const retrieveFriends = async () => {
      try {
        let response = await axios.get(
          `${config.backendServer}/api/user/friends/${username}`
        );
        setFriends(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    retrieveFriends();
  }, [username, acceptFriendToggle]);

  useEffect(() => {
    if (friends) {
      const finalArray = friends.map((item) => (
        <div
          className="  col-6 col-xs-4 col-md-4 col-lg-3 col-xxl-2 d-flex flex-column my-2 align-items-center"
          key={item._id}
        >
          <div
            className=" friend-container shadow-sm"
            onClick={() => {
              handleNav(item.username);
            }}
          >
            <img
              className="friend-container-img"
              alt="friend-container-img"
              src={
                item.friendPhotoURL === "NO PROFILE PHOTO"
                  ? emptyAvatar
                  : item.friendPhotoURL
              }
            />
            <div
              className="friend-name my-2"
              onClick={() => {
                handleNav(item.username);
              }}
            >
              {item.fullName}
            </div>
          </div>
        </div>
      ));

      setFriendsGenerated(finalArray);
    }
  }, [friends]);

  useEffect(() => {
    if (pending) {
      const finalPending = pending.map((item) => (
        <Pending
          key={item._id}
          data={item}
          setPendingActionToggle={setPendingActionToggle}
          pendingActionToggle={pendingActionToggle}
          acceptFriendToggle={acceptFriendToggle}
          setAcceptFriendToggle={setAcceptFriendToggle}
        />
      ));

      setPendingGenerated(finalPending);
    }
  }, [pending]);

  const handleNav = (username) => {
    navigate(`/user/${username}`);
    window.location.reload();
  };
  //full data will be required to populate the navbar info

  //friend data will be used to populate the bottom section of your list of friends.

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div
        className={`top-home-layer ${
          screenSize < 576 && messengerOn ? "stop-scroll" : null
        }`}
      >
        <Navbar
          data={data}
          username={username}
          setMessengerOn={setMessengerOn}
          messengerOn={messengerOn}
        />
        <div className="container-fluid bg-light">
          <div className="container pt-4">
            <div className="">
              <h2>Friend requests</h2>
            </div>
            <div className="row">
              {pendingGenerated.length ? (
                pendingGenerated
              ) : (
                <div>You have no pending requests</div>
              )}
            </div>
          </div>

          <div className="container">
            <hr />
          </div>

          <div className="lower-friend-container container">
            <h2>Friends</h2>
            <div className="row">
              {friendsGenerated.length > 0 ? (
                friendsGenerated
              ) : (
                <div>Add some friends to see them here</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {messengerOn && (
        <div className="hidden bg-light border">
          <Messenger
            friends={friends}
            thisUsername={username}
            messengerOn={messengerOn}
            setMessengerOn={setMessengerOn}
            userID={userID}
          />
        </div>
      )}
    </>
  );
}

export default Friends;
