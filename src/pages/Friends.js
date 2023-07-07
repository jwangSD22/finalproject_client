import React, { useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import Pending from '../components/friendsPage/Pending.js';
import axios from 'axios';
import Navbar from '../components/navbar/Navbar.js'
import Messenger from '../messenger/Messenger.js';
import emptyAvatar from '../images/empty_avatar.png'
import './Friends.css'


function Friends() {
    const [username, setUsername] = useState(null);
    const [friends, setFriends] = useState(null);
    const [messengerOn, setMessengerOn] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userID,setUserID] = useState(null)
    const [data, setData] = useState(null);
    const [pending,setPending] = useState([])
    const [friendsGenerated,setFriendsGenerated] = useState([])
    const [pendingGenerated,setPendingGenerated] = useState([])
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
      
      const getPending = async () => {
        const response = await axios.get('/api/user/pending')
        setPending(response.data)
        console.log(['pending',response.data])

      }

  
      checkLogin();
      retrieveData();
      getPending();
    }, []);


    useEffect(() => {
      const retrieveFriends = async () => {
        try {
          let response = await axios.get(`/api/user/friends/${username}`);
          setFriends(response.data);

          console.log(response.data)
        } catch (err) {
          console.log(err);
        }
      };

      if(username){
        retrieveFriends();
      }
      
    }, [username]);

    useEffect(()=>{

      if(friends){
        const finalArray = friends.map(item => 
        <div className="col-6 col-xs-4 col-lg-4 col-xl-3 col-xxl-3 d-flex flex-column my-2" key={item._id}>
          <div className="friend-container shadow-sm" onClick={()=>{handleNav(item.username)}}>
            <img className="friend-container-img" src={item.friendPhotoURL==='NO PROFILE PHOTO'?emptyAvatar:item.friendPhotoURL}/>
            <div className="friend-name mt-auto"onClick={()=>{handleNav(item.username)}}>{item.fullName}</div>
            </div>
        </div>)
    
      setFriendsGenerated(finalArray)
      }

    },[friends])

    useEffect(()=>{

      if(pending){
        const finalPending = pending.map(item=>
          
            <Pending data={item} />
          )


          setPendingGenerated(finalPending)
      }

    },[pending])
    
    const handleNav = (username) => {
      navigate(`/user/${username}`);window.location.reload()
    }  
    //full data will be required to populate the navbar info

    //friend data will be used to populate the bottom section of your list of friends.


  return (
    <>
    <Navbar data={data} username={username} setMessengerOn={setMessengerOn}/>
    <div className='container-fluid'>
      <div className="container border mt-4">
        <h2>Friend requests</h2>
        <div className="row">
{pendingGenerated}
        </div>
      </div>

      <div className="container"><hr/></div>

      <div className="container border">
        <h2>Friends</h2>
        <div className="row">
  {friendsGenerated}
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
