import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar/Navbar.js";
import emptyAvatar from "../images/empty_avatar.png";
import "./Users.css";
import UserPosts from "../components/userPage/UserPosts.js";
import TopBanner from "../components/userPage/TopBanner.js";

const token = localStorage.getItem("jwt");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//YOU ARE HITTING API with GET '/api/users/:username'
//MAKE SURE PARAMS IS A USERNAME

function User() {
  const [thisUsername, setThisUsername] = useState(null);
  const [data, setData] = useState("");
  const [myData, setMyData] = useState(null);
  const [allData, setAllData] = useState(null);
  const [friendStatus,setFriendStatus] = useState('')
  const [myFriends, setMyFriends] = useState({});
  const [theirFriends, setTheirFriends] = useState({});
  const [viewFriendsToggle, setViewFriendsToggle] = useState(false);
  const [thisUserSameProfile, setThisUserSameProfile] = useState(false);

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

    !thisUserSameProfile&&thisUsername&&getMyInfo();
  }, [thisUsername,username]);

  useEffect(() => {
    if (!thisUserSameProfile && myData) {
      let myHash = {};
      let theirHash = {}

      for (let i = 0; i < myData.friends.length; i++) {
        if (!myFriends[myData.friends[i].friend]) {
          myHash[myData.friends[i].friend] = myData.friends[i].status;
        }
      }
      for (let i = 0; i < myData.friendRequests.length; i++) {
        if (!myFriends[myData.friendRequests[i].friend]) {
          myHash[myData.friendRequests[i].friend] = myData.friendRequests[i].status;
        }
      }

      for (let i = 0; i < data.friends.length; i++) {
        if (!theirHash[data.friends[i].friend]) {
          theirHash[data.friends[i].friend] = data.friends[i].status;
        }
      }
      for (let i = 0; i < data.friendRequests.length; i++) {
        if (!theirHash[data.friendRequests[i].friend]) {
          theirHash[data.friendRequests[i].friend] = data.friendRequests[i].status;
        }
      }
      
      let myID = myData._id


      setMyFriends(myHash);
      setTheirFriends(theirHash);

      if(theirHash.hasOwnProperty(myID)){
        setFriendStatus(theirHash[myID])
        console.log(theirHash[myID])
      }
      else{

        setFriendStatus('')
      }

    }
  }, [myData,username]);


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






  return (
    <>
      <Navbar data={allData} username={thisUsername} />

      <div className="container top-container">
      <TopBanner thisUserSameProfile={thisUserSameProfile} data={data} thisUsername={thisUsername} friendStatus={friendStatus} setFriendStatus={setFriendStatus}/>
      </div>

      <div className="container">MINI NAV BAR</div>

      <div className="container">
        <div className="row">
        <div className="container d-none d-lg-flex col-lg-5">stickY f</div>
        <div className="container-fluid col-lg-7">
          <UserPosts thisUsername={thisUsername} allData={allData}/>
        </div>
        </div>
      </div>
    </>
  );
}

export default User;
