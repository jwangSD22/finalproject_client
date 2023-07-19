import React from "react";

function Friends({thisUserFriends}) {


  

  const buildFriends = () => thisUserFriends.map(user => {
return <div style={{padding:"7px"}} key={user._id}>{user.fullName}
{/*user.profilePhotoURL will be the URL */}
<div><button id ={user._id} onClick={(event)=>{removeFriend(event.target.id)}}>Remove Friend</button></div>
</div>
    })

  const removeFriend = () => {

  }


  return (
    <div> <div> <h2>FRIENDS</h2></div>
    <div>{buildFriends()}
    </div>
    </div>
  )

}

export default Friends
