import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar/Navbar.js";
import emptyAvatar from "../images/empty_avatar.png";
import "./Users.css";
import FriendReqBtns from "../components/userPage/FriendReqBtns.js";

const token = localStorage.getItem("jwt");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//YOU ARE HITTING API with GET '/api/users/:username'
//MAKE SURE PARAMS IS A USERNAME

function User() {
  const [thisUsername, setThisUsername] = useState(null);
  const [data, setData] = useState("");
  const [myData, setMyData] = useState(null);
  const [allData, setAllData] = useState(null);
  // const [friends, setFriends] = useState({});
  const [friendStatus,setFriendStatus] = useState('')
  const [myFriends, setMyFriends] = useState({});
  const [theirFriends, setTheirFriends] = useState({});
  const [viewFriendsToggle, setViewFriendsToggle] = useState(false);
  const [thisUserSameProfile, setThisuserSameProfile] = useState(false);
  const [profilePhotoURL, setProfilePhotoURL] = useState(null);
  const [bgURL, setBgURL] = useState(null);
  const navigate = useNavigate();
  const { username } = useParams();


  useEffect(() => {
    const checkLogin = async () => {
      try {
        let response = await axios.get("/api/users/loginstatus");
        if (response.status) {
          setThisUsername(response.data.user.jwtusername);
          setThisuserSameProfile(response.data.user.jwtusername === username);
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
        setProfilePhotoURL(response.data.profilePhotoURL);
        setBgURL(response.data.bgPhotoURL);
      } catch (err) {
        console.log(err);
      }
    };

    // const retrieveFriends = async () => {
    //   try {
    //     let response = await axios.get(`/api/user/friends/${username}`);
    //     setFriends(response.data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    //is this function even really needed??? it seems like retrieve data for this user already captures evertyhing i need

    retrieveAllData();
    checkLogin();
    retrieveData();
    // retrieveFriends()
  }, [username]);

  useEffect(() => {
    const getMyInfo = async () => {
      const response = await axios.get(`/api/users/${thisUsername}`);
      setMyData(response.data);
    };

    !thisUserSameProfile&&thisUsername&&getMyInfo();
  }, [thisUserSameProfile,username]);

  useEffect(() => {
    if (!thisUserSameProfile && myData) {
      console.log('NOT THE SAME PROFILE')
      let myHash = {};
      let theirHash = {}

      for (let i = 0; i < myData.friends.length; i++) {
        if (!myFriends[myData.friends[i].friend]) {
          myHash[myData.friends[i].friend] = myData.friends[i].status;
        }
      }

      for (let i = 0; i < data.friends.length; i++) {
        if (!theirHash[data.friends[i].friend]) {
          theirHash[data.friends[i].friend] = data.friends[i].status;
        }
      }
      
      let myID = myData._id


      setMyFriends(myHash);
      setTheirFriends(theirHash);

      if(theirHash.hasOwnProperty(myID)){
        setFriendStatus(theirHash[myID])
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

  const updatePFP = async (event) => {
    const file = event.target.files[0];
    const imgFormData = new FormData();
    imgFormData.append("profilePhoto", file);

    //upload to server to get object key
    const response = await axios.post(`/api/users/imageUpload`, imgFormData);
    const key = response.data.objectKey;

    // update user in mongodb with new objectkey

    const updateResponse = await axios.put(`/api/users/${thisUsername}`, {
      pfpKey: key,
    });

    // get new URL to display on page

    if (updateResponse.status === 200) {
      const getPFP = await axios.get(`/api/users/pfp/${data._id}`);
      console.log(getPFP);
      setProfilePhotoURL(getPFP.data.profilePhotoURL);
    }
  };

  const updateBG = async (event) => {
    const file = event.target.files[0];
    const imgFormData = new FormData();
    imgFormData.append("bgPhoto", file);

    //upload to server to get object key
    const response = await axios.post(`/api/users/bgUpload`, imgFormData);
    const key = response.data.objectKey;

    // update user in mongodb with new objectkey

    const updateResponse = await axios.put(`/api/users/${thisUsername}`, {
      bgKey: key,
    });

    // get new URL to display on page

    if (updateResponse.status === 200) {
      const getBG = await axios.get(`/api/users/bg/${data._id}`);
      setBgURL(getBG.data.bgPhotoURL);
    }
  };

  const handlePFPupdateClick = () => {
    document.getElementById("pfp-upload").click();
  };

  const handleBGupdateClick = () => {
    document.getElementById("bg-upload").click();
  };

  return (
    <>
      <Navbar data={allData} username={thisUsername} />

      <div className="top-container">
        {/*BG BANNER CONTAINER */}
        <div
          className="background-container container"
          style={{ width: "1250px", height: "500px" }}
        >
          <img src={bgURL || emptyAvatar} height="100%"></img>
          {thisUserSameProfile && (
            <>
              <label htmlFor="bg-upload" className="file-upload-label" />
              <div>
                <input
                  id="bg-upload"
                  type="file"
                  style={{ display: "none" }}
                  onChange={updateBG}
                />
                <button
                  className="icon-button bg-offset"
                  onClick={handleBGupdateClick}
                >
                  <i className="fas fa-upload"></i> Upload
                </button>
              </div>
            </>
          )}
        </div>

        {/*PFP CONTAINER */}

        <div className="container d-flex flex-column-sm">
          <div className="col-2" style={{ height: "100px" }}>
            <img
              src={profilePhotoURL || emptyAvatar}
              width="auto"
              height="100%"
            ></img>
            {thisUserSameProfile && (
              <>
                <label htmlFor="pfp-upload" className="file-upload-label" />
                <div>
                  <input
                    id="pfp-upload"
                    type="file"
                    style={{ display: "none" }}
                    onChange={updatePFP}
                  />
                  <button
                    className="icon-button pfp-offset"
                    onClick={handlePFPupdateClick}
                  >
                    <i className="fas fa-upload"></i> Upload
                  </button>
                </div>
              </>
            )}
          </div>

          {/*USER INFO */}

          <div className="col-8 d-flex flex-column mt-auto">
            <div>{data?.fullName}</div>
            <div>{data ? `${data.friends.length} Friends` : "0 Friends"}</div>
            <div>FRIEND ICON GENERATOR TOP 10</div>
          </div>

          {/*Friend Req INFO */}

{!thisUserSameProfile&&<FriendReqBtns friendStatus={friendStatus} thisUsername={thisUsername} data={data} setFriendStatus={setFriendStatus}/>}
        </div>
      </div>

      <div className="container">MINI NAV BAR</div>
      <div className="container">
        CONTAINER FOR MAIN
        <div className="container">stickY friends div</div>
        <div className="container">
          /IF THIS IS THE SAME USER , POST CONTENT LINE HERE/ POSTS GO HERE
        </div>
        <button onClick={()=>{console.log([myFriends,theirFriends])}}/>
      </div>
    </>
  );
}

export default User;
