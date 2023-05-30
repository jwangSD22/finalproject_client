import './queryresults.css'

import React from 'react'
import emptyAvatar from '../../images/empty_avatar.png'
import {useNavigate} from 'react-router-dom'


function QueryResults({id,fullName,profilePhotoURL,username}) {
  const navigate = useNavigate();

  const onClickHandler = () => {
    console.log('clicked...')
    navigate(`/user/${username}`)
  }


  return (

    <div onClick={onClickHandler} className='query-container container d-flex flex-row '>
        <div ><img src={profilePhotoURL==='NO PROFILE PHOTO'?emptyAvatar:profilePhotoURL} width="30px" height="30px"></img></div>
        <div >{fullName}</div>
        </div>
                
  
  )
}

export default QueryResults
