import React from 'react'
import './mininav.css'

function MiniNav({viewFriendsToggle,setViewFriendsToggle}) {

  //set an event listener for any back-navigation attempt if current status of viewfriendstoggle is true. instead of navigating back in the history, force setViewFriendsToggle to false, and reload window






  return (
    <div className="container mini-nav-box">
    <div className="row" style={{borderTop:'solid 1px #E4E6E9',paddingTop:'10px'}} >
    <div className="mini-nav-link col-2 col-md-1 mx-2 bg-success" onClick={()=>{setViewFriendsToggle(false);window.location.reload()}}>Posts</div>
    <div className="mini-nav-link col-2 col-md-1 mx-2 bg-danger" onClick={()=>{setViewFriendsToggle(true)}}>FRIENDS</div>
    </div>


  </div>
  )
}

export default MiniNav
