import React, {useState,useEffect} from 'react'
import './friendcontainer.css'
import GenerateAvatar from '../../helper/GenerateAvatar'
//need to add logic to calculate mutual friends 

//state of myFriends will be a dictionary to calculate mutual friends.

// need to add logic to generate the status button that shows up 


// map thru each friend, and need to do work on each item, 
// grab full name 
// create reference link to their profile
// calculate mutual friends by iterating thru the item's friend array x-reffing the dictionary
// figure out the status of the relationship of my friends to their friends
// generate their photo -- the URL link will be under friends."friendPhotoURL"




function FriendContainer({friends,myFriends,theirFriends}) {
  return (
<>

  <div className="header my-2"><h2>ALL FRIENDS</h2></div>

  <div className="row ">

  {friends.map(item=>
  
  <div key={item._id} className='col-10 col-lg-6 container my-sm-3 my-1 '>
    <div className='bg-light border'>
      <div className="row">
      <div className='responsive-pfp-img-cont col-2 my-2'>
        {/* this component uses classname -> responsive-pfp-img */}
        <GenerateAvatar cssClassIdentifier={'responsive-pfp-img'} url={item.friendPhotoURL} />
      </div>
      <div className='col-4 d-flex flex-column justify-content-center'>
      <div>{item.fullName}</div>
      <div>mutual friends</div>
      </div>
      <div className='hiddendiv col-3' />
      <div className='status col-3 d-none d-md-flex align-items-center '>STATUS</div>
      </div>
    </div>



  </div>
  
  
  )}

  </div>
</>
  )
}

export default FriendContainer
