import React from 'react'

function MiniNav({viewFriendsToggle,setViewFriendsToggle}) {




  const style ={
    position:'relative',
    zIndex:'-1'
  }

  return (
    <div className="container mini-nav-box" style={style}>
    <div className="row " style={style}>
    <div className="mini-nav-link col-2 col-md-1 mx-2 bg-success" onClick={()=>{setViewFriendsToggle(false)}}>LINK TO Posts</div>
    <div className="mini-nav-link col-2 col-md-1 mx-2 bg-danger" onClick={()=>{setViewFriendsToggle(true)}}>LINK TO FRIENDS</div>
    </div>


  </div>
  )
}

export default MiniNav
