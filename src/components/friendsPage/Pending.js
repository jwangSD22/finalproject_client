import emptyAvatar from '../../images/empty_avatar.png'
import axios from 'axios'
import React, {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import '../../pages/Friends.css'

function Pending ({data}){

    
    const navigate = useNavigate();
    const handleNav = (username) => {
        navigate(`/user/${username}`);window.location.reload()
      }  

    const generateFromStatus = (param) =>{
        //case pending -- 

        //case waiting --

        //case accepted --

        return <div>{param}</div>
    }

    return (
<div className="col-6 col-xs-4 col-lg-4 col-xl-3 col-xxl-3 d-flex flex-column my-2" key={data._id}>
<div className="friend-container shadow-sm" onClick={()=>{handleNav(data.username)}}>
<img className="friend-container-img" src={data.profilePhotoURL==='NO PROFILE PHOTO'?emptyAvatar:data.profilePhotoURL}/>
<div className="friend-name mt-auto"onClick={()=>{handleNav(data.username)}}>{data.fullName}</div>
{generateFromStatus(data.status)}


</div>
</div>
        )
}

export default Pending
