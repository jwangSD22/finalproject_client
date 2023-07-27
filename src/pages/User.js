import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import config from '../helper/config.js'
import Navbar from "../components/navbar/Navbar.js";
import "./User.css";
import UserPosts from "../components/userPage/UserPosts.js";
import TopBanner from "../components/userPage/TopBanner.js";
import MiniNav from "../components/userPage/MiniNav.js";
import MiniFriendContainer from "../components/userPage/MiniFriendContainer.js";
import FriendContainer from "../components/userPage/FriendContainer.js";
import Messenger from "../messenger/Messenger.js";

const token = localStorage.getItem("jwt");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//YOU ARE HITTING API with GET '/api/users/:username'
//MAKE SURE PARAMS IS A USERNAME

function User() {
  const [thisUsername, setThisUsername] = useState(null);
  const [thisUserFriends,setThisUserFriends] = useState([])
  const [data, setData] = useState("");
  const [myData, setMyData] = useState(null);
  const [allData, setAllData] = useState(null);
  const [friends, setFriends] = useState([]);
  const [friendStatus, setFriendStatus] = useState("");
  const [myFriends, setMyFriends] = useState({});
  const [theirFriends, setTheirFriends] = useState({});
  const [viewFriendsToggle, setViewFriendsToggle] = useState(false);
  const [thisUserSameProfile, setThisUserSameProfile] = useState(false);
  const [navbarOffset, setNavbarOffset] = useState(0);
  const [miniOffset, setMiniOffset] = useState(0);
  const [messengerOn, setMessengerOn] = useState(false);
  const [userID,setUserID] = useState(null)
  const [screenSize, setScreenSize] = useState(window.innerWidth);




  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {

    const checkLogin = async () => {
      try {
        let response = await axios.get(`${config.backendServer}/api/users/loginstatus`);
        if (response.status) {
          setThisUsername(response.data.user.jwtusername);
          setUserID(response.data.user.jwtid)
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
        let response = await axios.get(`${config.backendServer}/api/users/`);
        setAllData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const retrieveData = async () => {
      try {
        let response = await axios.get(`${config.backendServer}/api/users/${username}`);
        setData(response.data);
      } catch (err) {

        navigate('/error')
      }
    };

      checkLogin();
      retrieveData();
      retrieveAllData();



  }, [username]);


  useEffect(() => {


    const getMyInfo = async () => {
      const response = await axios.get(`${config.backendServer}/api/users/${thisUsername}`);
      setMyData(response.data);

      let myHash = {};
      for (let i = 0; i < response.data.friendRequests.length; i++) {
        if (!myFriends[response.data.friendRequests[i].friend]) {
          myHash[response.data.friendRequests[i].friend] =
          response.data.friendRequests[i].status;
        }
      }

      for (let i = 0; i < response.data.friends.length; i++) {
        if (!myFriends[response.data.friends[i].friend]) {
          myHash[response.data.friends[i].friend] = response.data.friends[i].status;
        }
      }
      
      setMyFriends(myHash);

    };

    if(thisUsername){
      getMyInfo();

    }
  

    
  }, [thisUsername,username]);

  useEffect(() => {

    if (!thisUserSameProfile&&myData) {

      let theirHash = {};
     

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


      if (theirHash.hasOwnProperty(myID)) {
        setFriendStatus(theirHash[myID]);
      } else {
        setFriendStatus("");
      }
      setTheirFriends(theirHash);
    }



  }, [myData, username]);

  useEffect(() => {
    const retrieveFriends = async () => {
      const response = await axios.get(`${config.backendServer}/api/user/friends/${data.username}`);
      setFriends(response.data);
    };

    const retrieveThisUserFriends = async () => {
      const response = await axios.get(`${config.backendServer}/api/user/friends/${thisUsername}`);
      setThisUserFriends(response.data);

    };

    retrieveFriends();
    retrieveThisUserFriends();

  }, [data]);

  //need to useeffect to retrieve THIS USER's friends because the messenger component requires it unfortuantely..



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

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
    <div className={`top-home-layer ${screenSize<576&&messengerOn?'stop-scroll':null}`}>
      <Navbar
        data={allData}
        username={thisUsername}
        setMessengerOn={setMessengerOn}
        messengerOn={messengerOn}
      />

      <div className="top-container bg-white">
        <TopBanner
          thisUserSameProfile={thisUserSameProfile}
          data={data}
          friends={friends}
          thisUsername={thisUsername}
          friendStatus={friendStatus}
          setFriendStatus={setFriendStatus}
          setViewFriendsToggle={setViewFriendsToggle}
        />
      </div>

      <div className="mini-nav bg-white" style={{ top: `${navbarOffset}px` }}>
        <MiniNav viewFriendsToggle={viewFriendsToggle} setViewFriendsToggle={setViewFriendsToggle}/>
      </div>

      {!viewFriendsToggle ? (
        <div className="main-container bg-light">

          <div className="container">
            <div className="row">
              <div className="col-lg-5 d-none d-lg-block" style={{ zIndex: "0" }}>
                <div className="sticky-top" style={{ top: `${miniOffset}px` }}>
                  <MiniFriendContainer
                    setViewFriendsToggle={setViewFriendsToggle}
                    friends={friends}
                  />
                </div>
              </div>
              <div className="col-lg-7">
                <UserPosts thisUsername={thisUsername} allData={allData} />
              </div>
            </div>
          </div>
        </div>
      ) : (
<div className="container-fluid bg-light p-4">
<FriendContainer friends={friends} myFriends={myFriends} theirFriends={theirFriends} myData={myData} />

</div>

      )}
      </div>
{messengerOn && (
          <div className="hidden bg-light border">
 
            <Messenger
              friends={thisUserFriends}
              thisUsername={thisUsername}
              messengerOn={messengerOn}
              setMessengerOn={setMessengerOn}
              userID = {userID}
            />
          </div>
        )}

    </>
  );
}

export default User;
