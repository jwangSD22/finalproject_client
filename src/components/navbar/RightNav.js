import React, {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Tooltip} from 'react-tooltip'
import axios from 'axios'
import config from '../../helper/config.js'
import { HomeOutlined,MessageOutlined,TeamOutlined,LogoutOutlined, SettingOutlined } from '@ant-design/icons'
import GenerateAvatar from '../../helper/GenerateAvatar.js'
import './navbar.css'


function RightNav({username, collapseState,setMessengerOn}) {

    const navigate = useNavigate()

    const [thisUser,setThisUser] = useState(null)

useEffect(()=>{
    const getThisUserInfo = async () => {

        let response = await axios.get(`${config.backendServer}/api/users/${username}`)

        setThisUser(response.data)

    }

    username&&getThisUserInfo()

},[username])

if(!thisUser){
    return (
        <div>Loading...</div>
    )
}

const handleLogout = () => {

    localStorage.removeItem('jwt')

    navigate('/')
    window.location.reload();

  }

const handleUserNav = () => {
  navigate(`/user/${thisUser.username}`)
  window.location.reload();

}

// thisUser.profilePhotoURL==='NO PROFILE PHOTO'?emptyAvatar:thisUser.profilePhotoURL


  return (
    <div className="dropleft show" >
    <a className="btn dropdown-toggle animate__animated animate__fadeInRight" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" data-boundary="viewport" aria-haspopup="true" aria-expanded="false" data-tooltip-id="right-tooltip" data-tooltip-content="Your profile" data-tooltip-place="bottom">
    <GenerateAvatar cssClassIdentifier={`nav-pfp`} url={thisUser.profilePhotoURL} />    
    </a>
  
    <div className="dropdown-menu"  aria-labelledby="dropdownMenuLink">

      <div className="right-nav-drop  dropdown-item d-flex" onClick={handleUserNav}>
      <GenerateAvatar cssClassIdentifier={`nav-pfp`} url={thisUser.profilePhotoURL} />    
<div className="mx-2">{thisUser.fullName}</div></div>


      {/* this version of the module with collapState true will include more menu items */}
        {collapseState&&<>
{/* Home */}

<div className='right-nav-drop  dropdown-item d-flex align-items-center' onClick={()=>{navigate('/home')}} >
      <HomeOutlined className='mx-2'/>  
        <div>Home</div>
      </div>
{/* Friends */}
<div className='right-nav-drop  dropdown-item d-flex align-items-center' onClick={()=>{navigate('/friends')}}>
      <TeamOutlined className='mx-2'/>  
        <div>Friends</div>
      </div>
{/* Messenger */}
<div className='right-nav-drop  dropdown-item d-flex align-items-center' onClick={()=>{setMessengerOn(true)}}>
      <MessageOutlined className='mx-2'/>  
        <div>Messenger</div>
      </div>
        </>}


      <hr />
      {/* Settings */}
      <div className='right-nav-drop  dropdown-item d-flex align-items-center' >
      <SettingOutlined className='mx-2'/>  
        <div>Settings</div>
      </div>
      {/* Logout */}
      <div className='right-nav-drop  dropdown-item d-flex align-items-center'  onClick={handleLogout}>
      <LogoutOutlined className='mx-2' />
        <div>Logout</div>
      </div>
    </div>

    <Tooltip style={{fontSize:'11px', paddingTop:'3px', paddingBottom:'3px', opacity:'80%'}} delayShow = '400' noArrow='true' id="right-tooltip" />

  </div>
  
  )
}

export default RightNav
