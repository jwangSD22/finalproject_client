import React, {useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import GenerateAvatar from '../../helper/GenerateAvatar.js'
import './friendicons.css'

function FriendIcons({friends}) {
  
const [friendIcons,setFriendIcons] = useState(null)

const navigate = useNavigate()

const handleNav = (username) => {
  navigate(`/user/${username}`);window.location.reload()
}


useEffect(()=>{
  const generateIcons = friends.slice(0,8).map((friend,index)=>
    <GenerateAvatar key={friend.username} url={friend.friendPhotoURL} cssClassIdentifier={`friend-icon friend-layer-${index+1}`} username={friend.username} toggleHandler={true} />
  )


  setFriendIcons(generateIcons)

},[friends])

  return (

    <div className='mb-3'>{friendIcons}</div>
  )
}

export default FriendIcons
