import React, {useState,useEffect} from 'react'

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
<div className='container border rounded my-4'>

  <div className="header my-2"><h2>ALL FRIENDS</h2></div>

  <div className="row">

  {friends.map(item=><div key={item._id}>{item.fullName}</div>)}

  </div>
</div>
  )
}

export default FriendContainer
