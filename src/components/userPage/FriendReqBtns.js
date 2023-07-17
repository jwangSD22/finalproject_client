import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CheckOutlined,UserDeleteOutlined, UserAddOutlined } from "@ant-design/icons";
import './friendreqbtns.css'

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
      const response = await axios.post(`/api/user/friendrequest`,{endUserID:data._id})
      setFriendStatus('pending')
    }
    catch(err)
    {
      console.log(err.response.data)
    }

  }

  const handleRemoveFriendRequest = async () => {
    try{
      const response = await axios.post(`/api/user/removefriendrequest`,{endUserID:data._id})
      setFriendStatus('')
    }
    catch(err)
    {
      console.log(err.response.data)
    }
  }

  const handleDeleteFriend = async () => {
    try{
      const response = await axios.post(`/api/user/removefriend`,{endUserID:data._id})
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
        <div className="d-flex justify-content-center justify-content-md-end">
          <button className="btn btn-sm btn-outline-primary mx-2 disabled"><span className="friend-req-btns"><CheckOutlined className="mx-1" />Friend</span></button>
          <button className="btn btn-sm btn-danger" onClick={handleDeleteFriend}><span className="friend-req-btns"><UserDeleteOutlined className="mx-1" />Unfriend</span></button>
        </div>
      )}
    if (friendStatus === "pending") {
      return (
        <div className="d-flex justify-content-center justify-content-md-end">
          <button className="btn btn-sm  btn-primary mx-2" onClick={handleRemoveFriendRequest}><span className="friend-req-btns"><UserDeleteOutlined className="mx-1" />Cancel Request</span></button>
          <button className="btn btn-sm  btn-secondary disabled"><span className="friend-req-btns"><UserAddOutlined className="mx-1" /> Add Friend</span></button>

        </div>
      )}
    else{
      return (
        <div className=" d-flex justify-content-center justify-content-md-end">
        <button className="btn btn-sm  btn-primary" onClick={handleSendFriendRequest}><span className="friend-req-btns"><UserAddOutlined className="mx-1" />Add Friend</span></button>
         </div>
      )
    }


      
    
  };

  return (
    <div className=" col-12 col-md-5 col-lg-4 col-xl-4 mt-auto">
     {generateButtons(friendStatus)}
    </div>
  );
}

export default FriendReqBtns;
