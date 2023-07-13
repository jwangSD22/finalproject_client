import React, {useState,useEffect} from "react";
import axios from "axios";
import emptyAvatar from '../../images/empty_avatar.png'
import './minifriendcontainer.css'
import { useNavigate } from "react-router-dom";

function MiniFriendContainer({setViewFriendsToggle,friends}) {

  const navigate = useNavigate()
  const [friendsDiv,setFriendsDiv] = useState([])

  useEffect(()=>{
    if(friends){
      const array = friends.slice(0,9)

      const finalArray = array.map(item => 
      <div className="col-lg-6 col-xxl-4 d-flex flex-column my-2" key={item._id}>
        <div className="mini-friend-container" onClick={()=>{handleNav(item.username)}}>
          <img className="mini-friend-container-img shadow-sm" src={item.friendPhotoURL==='NO PROFILE PHOTO'?emptyAvatar:item.friendPhotoURL}/>
          </div>
        <div className="mini-friend-name"onClick={()=>{handleNav(item.username)}}>{item.fullName}</div>
      </div>)
  
    setFriendsDiv(finalArray)
    }

    
  },[friends])

  // router.get('/user/friends/:username',verifyToken,friend_controller.get_user_friends)

  const handleNav = (username) => {
    navigate(`/user/${username}`);window.location.reload()
  }








  return (
    <div className="container rounded border my-4">
      <div className="row">
        <div className="d-flex justify-content-between">
          <div>
            <div><h2>Friends</h2></div>
            <div>{`${friends.length} friends`}</div>
          </div>
          <div><div className="see-all-friends" onClick={()=>{setViewFriendsToggle(true)}}>See all friends</div></div>
        </div>
        <div className="container">

<div className="row">
    
{friendsDiv}
    


</div>


        </div>
      </div>
    </div>
  );
}

export default MiniFriendContainer;
