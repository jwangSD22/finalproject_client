import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function Public({thisUser, publicUsers,thisUserFriends,toggle,setToggle}) {

  let hash = {}

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
    const usernameOrigin = thisUser
    const userIDEnd = userid

    //axios info to backend to handle logic for adding friend requests      

    const response = await axios.post('/api/user/friendrequest',{
      usernameOrigin:usernameOrigin,
      userIDEnd: userIDEnd
    })

    console.log(usernameOrigin)
    console.log(userIDEnd)

    setToggle(!toggle)

  }

  const buildAllUsers = () => publicUsers.map(user => {
    if(user.username!==thisUser){
return <div style={{padding:"7px"}} key={user._id}>{user.fullName}
{/*user.profilePhotoURL will be the URL */}
<div><button id ={user._id} onClick={(event)=>{handleSendFriendRequest(event.target.id)}}>Send Friend Request</button></div>
</div>
    }
      
  }
    )


  return <div> <div> <h2>PUBLIC USERS</h2></div>
  <div>{buildAllUsers()}
  </div>
  </div>
}

export default Public;


// 