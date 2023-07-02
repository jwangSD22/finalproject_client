import React,{useState,useEffect} from 'react'

import emptyAvatar from '../../src/images/empty_avatar.png'

function FriendList({friends,setUsername2,setChatConnected}) {

    useEffect(()=>{
        console.log(friends)

        //generated a list of friends each with an onclick handler

        //the onclick handler will setusername 2 so the specified name, and also setChatconnected

        //if chat is connected, and username2 is present, then it needs to remove username 2, and disconnect chat 




    },[])
    
  return (
    <div className="container-fluid">
        <div className='row'>
            {friends.map(friend=>
              <div className="col-12 bg-light border" >
              <div className="col-2"><img className='pfp-msger-preview' src={friend.friendPhotoURL==='NO PROFILE PHOTO'?emptyAvatar:friend.friendPhotoURL} /></div>
              <div className="col-7 d-flex flex-column">
                <div>
                  {friend.fullName}
                  </div>
        
                   </div>
        
        
                </div>
        
            )}
        </div>
    </div>
  )
}

export default FriendList
