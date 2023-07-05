import React, { useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import Navbar from '../components/navbar/Navbar.js'
import Messenger from '../messenger/Messenger.js';


function Friends() {
    const [username, setUsername] = useState(null);
    const [friends, setFriends] = useState(null);
    const [messengerOn, setMessengerOn] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userID,setUserID] = useState(null)
    const [data, setData] = useState(null);
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

  return (
    <>
    <Navbar data={data} username={username} setMessengerOn={setMessengerOn}/>
    <div className='container-fluid'>
      <div className="container border mt-4">
        <h2>Friend requests</h2>
        <div className="row">
          <div className="col-4">item</div>
          <div className="col-4">item</div>
          <div className="col-4">item</div>
          <div className="col-4">item</div>
          <div className="col-4">item</div>
          <div className="col-4">item</div>
        </div>
      </div>

      <div className="container"><hr/></div>

      <div className="container border">
        <h2>Friends</h2>
        <div className="row">
        <div className="col-4">item</div>
        <div className="col-4">item</div>
        <div className="col-4">item</div>
        <div className="col-4">item</div>
        <div className="col-4">item</div>
        <div className="col-4">item</div>
        <div className="col-4">item</div>
        <div className="col-4">item</div>
        <div className="col-4">item</div>
        <div className="col-4">item</div>
        <div className="col-4">item</div>
        <div className="col-4">item</div>
        <div className="col-4">item</div>
        <div className="col-4">item</div>
        <div className="col-4">item</div>

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
  )
}

export default Friends
