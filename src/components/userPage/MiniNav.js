import React from 'react'

function MiniNav({viewFriendsToggle,setViewFriendsToggle}) {

  //set an event listener for any back-navigation attempt if current status of viewfriendstoggle is true. instead of navigating back in the history, force setViewFriendsToggle to false, and reload window




  const style ={
    position:'relative',
    zIndex:'-1'
  }

  return (
    <div className="container mini-nav-box" style={style}>
    <div className="row " style={style}>
    <div className="mini-nav-link col-2 col-md-1 mx-2 bg-success" onClick={()=>{setViewFriendsToggle(false);window.location.reload()}}>LINK TO Posts</div>
    <div className="mini-nav-link col-2 col-md-1 mx-2 bg-danger" onClick={()=>{setViewFriendsToggle(true)}}>LINK TO FRIENDS</div>
    </div>


  </div>
  )
}

export default MiniNav
