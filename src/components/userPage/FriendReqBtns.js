import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function FriendReqBtns({
  thisUserSameProfile,
  friendStatus,
  setFriendStatus,
  data,
}) {

  const {username} = useParams()


  //**if friend status is empty -- that means we are not friends, and should be able to send a request

  //need to capture:
  //** */ we are ALREADY FRIENDS, option to UNFRIEND
  //**friend status can be 'accepted' or 'waiting' based on their info
  ////*** */ need to check friend status

  // MYUSER previously sent a request to THEIRUSER and is waiting for a response
  //// need to update friendstatus , and for a change on this module so the button changes
  ////// should i add an option to cancel the friend request???
  //

  // dont have to capture that this person is waiting to accept or deny a friend request because that means
  // this would be the same user

  const handleSendFriendRequest = async () => {
    try{
      const response = await axios.post(`/api/user/friendrequest`,{userIDEnd:data._id})
      setFriendStatus('pending')
    }
    catch(err)
    {
      console.log(err.response.data)
    }

  }

  const handleRemoveFriendRequest = async () => {
    try{
      const response = await axios.post(`/api/user/removefriendrequest`,{userIDEnd:data._id})
      setFriendStatus('')
    }
    catch(err)
    {
      console.log(err.response.data)
    }
  }


  const generateButtons = (friendStatus) => {
    if (friendStatus === "accepted") {
      return (
        <>
          <button className="btn btn-primary">Already friends</button>
          <button>Option to unfriend</button>
        </>
      )}
    if (friendStatus === "pending") {
      return (
        <>
          <button className="btn btn-primary">WAITING FOR RESPONSE</button>
          <button className="btn btn-primary" onClick={handleRemoveFriendRequest}>Option to cancel request?</button>

        </>
      )}
    else{
      return (
        <>
        <button className="btn btn-primary" onClick={handleSendFriendRequest}>send friend request</button>
         </>
      )
    }


      
    
  };

  return (
    <div className="col-2 mt-auto">
     {generateButtons(friendStatus)}
    </div>
  );
}

export default FriendReqBtns;
