import React,{useState,useEffect} from 'react'

import emptyAvatar from '../../src/images/empty_avatar.png'
import axios from 'axios'
import config from  '../helper/config.js'
import './messenger.css'


function FriendList({friends,setUsername2,setChatConnected,setDisplayFriends,setRoomID,username1}) {



        //generated a list of friends each with an onclick handler

        //the onclick handler will setusername 2 so the specified name, and also setChatconnected

        //if chat is connected, and username2 is present, then it needs to remove username 2, and disconnect chat 





    const connectFriend = async (data) => {

      const username2 = data.username

      const findRoom = async () => {
        try {
        if (username1 && username2) {
          let response = await axios.post(`${config.backendServer}/api/chats`, {
            username2,
          });
          console.log(response.data.chatid)
          setRoomID(response.data.chatid);
          return response.data.chatid;
        }
      } catch (err) {
        if (err.response.status === 400) {
          console.log(err.response)
          return null;
        }
      }
    };

        setUsername2(data.username)
        setChatConnected(true)
        setDisplayFriends(false)
        await findRoom()
    }
    
    
  return (
    <div className="container-fluid">
              <div className=' row messenger-header p-2'>Contacts</div>

        <div className='row'>
            {friends&&friends.length?friends.map(friend=>
              <div className="friendInList border-bottom py-1 col-12 d-flex" key={friend._id} onClick={()=>{connectFriend(friend)}} >
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
