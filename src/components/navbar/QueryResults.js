import './queryresults.css'
import React,{useState} from 'react'
import emptyAvatar from '../../images/empty_avatar.png'
import {useNavigate} from 'react-router-dom'


function QueryResults({id,fullName,profilePhotoURL,username,setSearchValue,setFocus}) {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`/user/${username}`)
    setSearchValue('')
    setFocus(false)
  }


  return (

    <div onClick={onClickHandler} className='query-container container d-flex flex-row '>
        <div ><img src={profilePhotoURL==='NO PROFILE PHOTO'?emptyAvatar:profilePhotoURL} width="30px" height="30px"></img></div>
        <div >{fullName}</div>
        </div>
                
  
  )
}

export default QueryResults
