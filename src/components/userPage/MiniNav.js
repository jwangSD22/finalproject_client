import React from 'react'
import './mininav.css'

function MiniNav({viewFriendsToggle,setViewFriendsToggle}) {


  return (
    <div className="container mini-nav-box">
    <div className="row" style={{borderTop:'solid 1px #E4E6E9',paddingTop:'10px'}} >
    <div className={`mini-nav-link ${viewFriendsToggle?null:'nav-link-on'} col-2 col-md-1 mx-2 my-1`} onClick={()=>{setViewFriendsToggle(false);}}>Posts</div>
    <div className={`mini-nav-link ${viewFriendsToggle?'nav-link-on':null} col-2 col-md-1 mx-2 my-1 ` }onClick={()=>{setViewFriendsToggle(true)}}>Friends</div>
    </div>


  </div>
  )
}

export default MiniNav
