import './queryresults.css'
import React from 'react'
import emptyAvatar from '../../images/empty_avatar.png'
import {useNavigate} from 'react-router-dom'


function QueryResults({id,fullName,profilePhotoURL,username,setSearchValue,setFocus}) {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`/user/${username}`)
    setSearchValue('')
    setFocus(false)
    window.location.reload();
  }


  return (

    <div onClick={onClickHandler} className='query-container container d-flex flex-row my-2'>
        <div ><img src={profilePhotoURL==='NO PROFILE PHOTO'?emptyAvatar:profilePhotoURL} alt='profile pic' width="30px" height="30px"></img></div>
        <div className='mx-2 d-flex align-items-center'  >{fullName}</div>
        </div>
                
  
  )
}

export default QueryResults
