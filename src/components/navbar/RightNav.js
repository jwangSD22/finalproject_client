import React, {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import emptyAvatar from '../../images/empty_avatar.png'
import {Tooltip} from 'react-tooltip'
import axios from 'axios'
import { HomeOutlined,MessageOutlined,TeamOutlined,LogoutOutlined, SettingOutlined } from '@ant-design/icons'


function RightNav({username, collapseState}) {

    const navigate = useNavigate()

    const [thisUser,setThisUser] = useState(null)

useEffect(()=>{
    const getThisUserInfo = async () => {

        let response = await axios.get(`/api/users/${username}`)

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

    window.location.reload();

  }

const photoURL = '';

// thisUser.profilePhotoURL==='NO PROFILE PHOTO'?emptyAvatar:thisUser.profilePhotoURL


  return (
    <div className="dropleft show" >
    <a className="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" data-offset="50,50" aria-haspopup="true" aria-expanded="false" data-tooltip-id="right-tooltip" data-tooltip-content="Your profile" data-tooltip-place="bottom">
    <img  src={photoURL} width="40px" height="40px" style={{borderRadius:'50%',border:'solid 2px black'}}></img>
    </a>
  
    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">

      <div className="right-nav-drop  dropdown-item d-flex" >
      <img  src={photoURL} width="30px" height="30px" style={{borderRadius:'50%',border:'solid 1px black'}}></img>
<div className="mx-2">{thisUser.fullName}</div></div>


      {/* this version of the module with collapState true will include more menu items */}
        {collapseState&&<>
{/* Home */}
<div className='right-nav-drop  dropdown-item d-flex align-items-center' >
      <HomeOutlined className='mx-2'/>  
        <div>Home</div>
      </div>
{/* Friends */}
<div className='right-nav-drop  dropdown-item d-flex align-items-center' >
      <TeamOutlined className='mx-2'/>  
        <div>Friends</div>
      </div>
{/* Messenger */}
<div className='right-nav-drop  dropdown-item d-flex align-items-center' >
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
