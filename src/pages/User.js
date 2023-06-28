import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar/Navbar.js";
import emptyAvatar from "../images/empty_avatar.png";
import "./Users.css";
import UserPosts from "../components/userPage/UserPosts.js";
import TopBanner from "../components/userPage/TopBanner.js";
import MiniNav from "../components/userPage/MiniNav.js";
import MiniFriendContainer from "../components/userPage/MiniFriendContainer.js";
import FriendContainer from "../components/userPage/FriendContainer.js";

const token = localStorage.getItem("jwt");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//YOU ARE HITTING API with GET '/api/users/:username'
//MAKE SURE PARAMS IS A USERNAME

function User() {
  const [thisUsername, setThisUsername] = useState(null);
  const [data, setData] = useState("");
  const [myData, setMyData] = useState(null);
  const [allData, setAllData] = useState(null);
  const [thisUserFriends, setThisUserFriends] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendStatus, setFriendStatus] = useState("");
  const [myFriends, setMyFriends] = useState({});
  const [theirFriends, setTheirFriends] = useState({});
  const [viewFriendsToggle, setViewFriendsToggle] = useState(false);
  const [thisUserSameProfile, setThisUserSameProfile] = useState(false);
  const [navbarOffset, setNavbarOffset] = useState(0);
  const [miniOffset, setMiniOffset] = useState(0);

  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        let response = await axios.get("/api/users/loginstatus");
        if (response.status) {
          setThisUsername(response.data.user.jwtusername);
          setThisUserSameProfile(response.data.user.jwtusername === username);
        }
      } catch (err) {
        if (err) {
          navigate("/");
        }
      }
    };

    //need to retrieve all data for navbar
    const retrieveAllData = async () => {
      try {
        let response = await axios.get(`/api/users/`);
        setAllData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const retrieveData = async () => {
      try {
        let response = await axios.get(`/api/users/${username}`);
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    retrieveAllData();
    checkLogin();
    retrieveData();
  }, [username]);

  useEffect(() => {
    const getMyInfo = async () => {
      const response = await axios.get(`/api/users/${thisUsername}`);
      setMyData(response.data);
    };

    !thisUserSameProfile && thisUsername && getMyInfo();
  }, [thisUsername, username]);

  useEffect(() => {
    if (!thisUserSameProfile && myData) {
      let myHash = {};
      let theirHash = {};

      for (let i = 0; i < myData.friends.length; i++) {
        if (!myFriends[myData.friends[i].friend]) {
          myHash[myData.friends[i].friend] = myData.friends[i].status;
        }
      }
      for (let i = 0; i < myData.friendRequests.length; i++) {
        if (!myFriends[myData.friendRequests[i].friend]) {
          myHash[myData.friendRequests[i].friend] =
            myData.friendRequests[i].status;
        }
      }

      for (let i = 0; i < data.friends.length; i++) {
        if (!theirHash[data.friends[i].friend]) {
          theirHash[data.friends[i].friend] = data.friends[i].status;
        }
      }
      for (let i = 0; i < data.friendRequests.length; i++) {
        if (!theirHash[data.friendRequests[i].friend]) {
          theirHash[data.friendRequests[i].friend] =
            data.friendRequests[i].status;
        }
      }

      let myID = myData._id;

      setMyFriends(myHash);
      setTheirFriends(theirHash);

      if (theirHash.hasOwnProperty(myID)) {
        setFriendStatus(theirHash[myID]);
      } else {
        setFriendStatus("");
      }
    }
  }, [myData, username]);

  useEffect(() => {
    const retrieveFriends = async () => {
      const response = await axios.get(`/api/user/friends/${data.username}`);
      setFriends(response.data);
    };

    retrieveFriends();
  }, [data]);

  //need to create a use effect that will capture changes to 'data' and then create or set a hash table  to better access the friends information

  const pattern = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1250 500">
      <defs>
        <pattern
          id="pattern"
          width="50"
          height="50"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="25" cy="25" r="10" fill="#3498db" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pattern)" />
    </svg>
  );

  useEffect(() => {
    const navbar = document.querySelector(".top-navbar");

    if (navbar) {
      setNavbarOffset(navbar.scrollHeight);
    }

    const mininav = document.querySelector(".mini-nav");

    if (mininav) {
      setMiniOffset(navbar.scrollHeight + mininav.scrollHeight);
    }
  }, []);

  return (
    <>
    
      <Navbar data={allData} username={thisUsername} />

      <div className="container top-container">
        <TopBanner
          thisUserSameProfile={thisUserSameProfile}
          data={data}
          thisUsername={thisUsername}
          friendStatus={friendStatus}
          setFriendStatus={setFriendStatus}
        />
      </div>

      <div className="container ">
        <hr />
      </div>

      <div className="mini-nav sticky-top" style={{ top: `${navbarOffset}px` }}>
        <MiniNav
          viewFriendsToggle={viewFriendsToggle}
          setViewFriendsToggle={setViewFriendsToggle}
        />
      </div>

      {!viewFriendsToggle ? (
        <div className="container">
          <div className="row">
            <div className="col-lg-5 d-none d-lg-block" style={{ zIndex: "0" }}>
              <div className="sticky-top" style={{ top: `${miniOffset}px` }}>
                <MiniFriendContainer
                  allData={allData}
                  data={data}
                  viewFriendsToggle={viewFriendsToggle}
                  setViewFriendsToggle={setViewFriendsToggle}
                  friends={friends}
                  setFriends={setFriends}
                />
              </div>
            </div>
            <div className="col-lg-7">
              <UserPosts thisUsername={thisUsername} allData={allData} />
            </div>
          </div>
        </div>
      ) : (

            <FriendContainer friends={friends} myFriends={myFriends} theirFriends={theirFriends}/>

      )}
    </>
  );
}

export default User;
