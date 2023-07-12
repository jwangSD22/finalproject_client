import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar/Navbar.js";
import YouMayKnow from "../components/home/YouMayKnow.js";
import HomePosts from "../components/home/HomePosts.js";
import Messenger from "../messenger/Messenger.js";

import "./Home.css";

function Home() {
  const [username, setUsername] = useState(null);
  const [userID,setUserID] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState(null);
  const [friends, setFriends] = useState(null);
  const [messengerOn, setMessengerOn] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    const checkLogin = async () => {
      try {
        let response = await axios.get("/api/users/loginstatus");
        if (response.status) {
          setUsername(response.data.user.jwtusername);
          setUserID(response.data.user.jwtid)
          setIsLoggedIn(true);
        }
      } catch (err) {
        if (err.response.status === 401) {
          navigate("/");
        }
      }
    };

    const retrieveData = async () => {
      try {
        let response = await axios.get("/api/users");

        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    checkLogin();
    retrieveData();

  }, []);

  useEffect(() => {
    const retrieveFriends = async () => {
      try {
        let response = await axios.get(`/api/user/friends/${username}`);
        setFriends(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    if(username){
      retrieveFriends();
    }
  }, [username]);


//useEffect to prevent touchscrolling in area outside of messenger
  const handleTouchStart = (e) => {
    e.stopPropagation();
  };

  const handleTouchMove = (e, messengerDiv) => {
    if (e.target === messengerDiv || messengerDiv.contains(e.target)) {
      e.stopPropagation();
    }
  };

  useEffect(() => {
    if (messengerOn) {

      const messengerDiv = document.querySelector(".hidden");
      const postContainer = document.querySelector(".home-post-container");

      messengerDiv.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });

      postContainer.addEventListener("touchmove", handleTouchMove, {
        passive: true,
      });

      return () => {
        messengerDiv.removeEventListener("touchstart", handleTouchStart, {
          passive: true,
        });
        postContainer.removeEventListener("touchmove", handleTouchMove, {
          passive: true,
        });
      };
    }
  }, [messengerOn]);

  return (
    <>
      <Navbar
        data={data}
        username={username}
        setMessengerOn={setMessengerOn}
      />
      <div className="container-fluid bg-light">
        <div className="row">
          <div className="col-md-3 d-none d-md-block">
            <YouMayKnow data={data} friends={friends} username={username} />
          </div>
          <div className=" d-none d-xl-flex col-xl-1"></div>
          <div className="col-md-8 col-lg-6 col-xxl-4 home-post-container">
            <HomePosts username={username} allUsers={data} />
          </div>
        </div>

        {messengerOn && (
          <div className="hidden bg-light border">
 
            <Messenger
              friends={friends}
              thisUsername={username}
              messengerOn={messengerOn}
              setMessengerOn={setMessengerOn}
              userID = {userID}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
