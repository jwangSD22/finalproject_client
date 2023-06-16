import React, { useState, useEffect } from "react";
import { useNavigate,useParams} from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar/Navbar.js";
import emptyAvatar from '../images/empty_avatar.png'
import './Users.css'



const token = localStorage.getItem("jwt");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//YOU ARE HITTING API with GET '/api/users/:username'
//MAKE SURE PARAMS IS A USERNAME

function User() {
  const [thisUsername, setThisUsername ] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState(null);
  const [allData,setAllData] = useState(null)
  const [friends,setFriends] = useState(null)
  const [viewFriendsToggle,setViewFriendsToggle] = useState(false)
  const [thisUserSameProfile,setThisuserSameProfile] = useState(false)
  const [profilePhotoURL,setProfilePhotoURL] = useState(null)
  const navigate = useNavigate();
  const {username} = useParams()

  useEffect(() => {
    const checkLogin = async () => {
      try {
        let response = await axios.get("/api/users/loginstatus");
        if (response.status) {
          setThisUsername(response.data.user.jwtusername);
          setIsLoggedIn(true);
          setThisuserSameProfile(response.data.user.jwtusername===username)
        }
      } catch (err) {
        if (err.response.status === 401) {
          navigate("/");
        }
      }
    };

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
        setProfilePhotoURL(response.data.profilePhotoURL)
      } catch (err) {
        console.log(err);
      }
    };

    const retrieveFriends = async () => {
      try{
        let response = await axios.get(`/api/user/friends/${username}`)
        console.log(response.data)
        setFriends(response.data)
      }
      catch(err){
        console.log(err)
      }
    }



    checkLogin();
    retrieveData();
    retrieveFriends()
  }, []);



  return (
    <div className="container-fluid">
      <Navbar data={allData} username={thisUsername} />
      <div className="container">
      <img src={profilePhotoURL||emptyAvatar} width='auto' height='100%'></img>

        BG PIC</div>
      <div  className="container d-flex" >
        <div style={{height:"250px"}}>
        <img src={profilePhotoURL||emptyAvatar} width='auto' height='100%'></img>
        <div className="pfp-offset">OFFSET INFO</div>
        </div>
        <div> USER pic, name, # of friends, and friend icons     IF NOT THSI USER FRIEND STATUS and SEND FRIEND REQ</div>
        </div>
      <div  className="container">MINI NAV BAR</div>
      <div  className="container">CONTAINER FOR MAIN 
      <div  className="container">stickY friends div</div>
      <div  className="container">
        /IF THIS IS THE SAME USER , POST CONTENT LINE HERE/

        POSTS GO HERE


      </div>

      </div>

      </div>
  )
}

export default User
