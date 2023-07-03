import React,{useState,useEffect} from 'react'

import emptyAvatar from '../../src/images/empty_avatar.png'
import { connect } from 'socket.io-client'

function FriendList({friends,setUsername2,setChatConnected,setDisplayFriends}) {



        //generated a list of friends each with an onclick handler

        //the onclick handler will setusername 2 so the specified name, and also setChatconnected

        //if chat is connected, and username2 is present, then it needs to remove username 2, and disconnect chat 






    const connectFriend = (data) => {
        setUsername2(data.username)
        setChatConnected(true)
        setDisplayFriends(false)

    }
    
    
  return (
    <div className="container-fluid">
        <div className='row'>
            {friends&&friends.length?friends.map(friend=>
              <div className="friendInList col-12 border d-flex" key={friend._id} onClick={()=>{connectFriend(friend)}} >
              <div className="col-2"><img className='pfp-msger-preview' src={friend.friendPhotoURL==='NO PROFILE PHOTO'?emptyAvatar:friend.friendPhotoURL} /></div>
              <div className="col-7">
 
                  {friend.fullName}

        
                   </div>
        
        
                </div>
        
            ):<div> Add some friends to begin chatting! </div>}
        </div>
    </div>
  )
}

export default FriendList
