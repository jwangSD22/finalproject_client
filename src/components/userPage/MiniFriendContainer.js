import React, {useState,useEffect} from "react";
import axios from "axios";
import emptyAvatar from '../../images/empty_avatar.png'
import './minifriendcontainer.css'
import { useNavigate } from "react-router-dom";

function MiniFriendContainer({allData, data}) {

  const [friends,setFriends] = useState([])
  const navigate = useNavigate()

  // router.get('/user/friends/:username',verifyToken,friend_controller.get_user_friends)

  const handleNav = (username) => {
    navigate(`/user/${username}`);window.location.reload()
  }


  useEffect(()=>{

    const retrieveFriends = async () => {
      const response = await axios.get(`/api/user/friends/${data.username}`)
      const array = response.data.slice(0,9)
      console.log(array)

      const finalArray = array.map(item => 
      <div className="col-lg-6 col-xl-4 d-flex flex-column my-2" key={item._id}>
        <div className="mini-friend-container" onClick={()=>{handleNav(item.username)}}>
          <img className="mini-friend-container-img" src={item.friendPhotoURL==='NO PROFILE PHOTO'?emptyAvatar:item.friendPhotoURL}/>
          </div>
        <div className="mini-friend-name"onClick={()=>{handleNav(item.username)}}>{item.fullName}</div>
      </div>)

      setFriends(finalArray)
    }

    retrieveFriends();

  },[data])





  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-between">
          <div>
            <div><h2>Friends</h2></div>
            <div>{`${friends.length} friends`}</div>
          </div>
          <div><div className="see-all-friends">See all friends</div></div>
        </div>
        <div className="container">

<div className="friend-container row">
    
{friends}
    


</div>


        </div>
      </div>
    </div>
  );
}

export default MiniFriendContainer;
