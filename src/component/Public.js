import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function Public({username}) {
  const [thisUser,setThisUser] = useState(null)  
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        let response = await axios.get("api/users");
        setUsers(response.data);
      } catch (err) {
        console.log(err.response);
      }
    };
    setThisUser(username)
    getUsers();
  }, []);

  const handleSendFriendRequest = async (userid) => {
    const usernameOrigin = thisUser
    const useridDest = userid

    //axios info to backend to handle logic for adding friend requests      


  }

  const buildAllUsers = () => users.map(user => {
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