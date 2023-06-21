import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'

function FriendReqBtns( {thisUserSameProfile,friendStatus,setFriendStatus,data}) {

  //if thisusersame prfoile is true -- this should not even generate// maybe this is something i can 
  //generate from the parent level 

  //if friend status is empty -- that means we are not friends, and should be able to send a request 

  //need to capture:
  // we are ALREADY FRIENDS, option to UNFRIEND
  //friend status can be 'accepted' or 'waiting' based on their info
  //// need to check friend status

  // MYUSER previously sent a request to THEIRUSER and is waiting for a response
  //// need to update friendstatus , and for a change on this module so the button changes
  ////// should i add an option to cancel the friend request???
  //
  
  // dont have to capture that this person is waiting to accept or deny a friend request because that means
  // this would be the same user

  const [status,setStatus] = useState('')
  const {username} = useParams()

  useEffect(()=>{setStatus(friendStatus);console.log('CHANGED PROFILE')},[friendStatus])
 
  


  return (
    <div className='col-2 mt-auto'>
      {
        status==='accepted'?<button className='btn btn-primary'>Already friends</button>:<button className='btn btn-primary'>send friend request</button>

      }
      
      </div>
  )
}

export default FriendReqBtns
