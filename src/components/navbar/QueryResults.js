import React from 'react'
import emptyAvatar from '../../images/empty_avatar.png'

function QueryResults({id,fullName,profilePhotoURL}) {
  return (
    <div className='d-flex flex-row'>
        <div><img src={profilePhotoURL==='NO PROFILE PHOTO'?emptyAvatar:profilePhotoURL} width="30px" height="30px"></img></div>
        <div>{fullName}</div>
        </div>
  )
}

export default QueryResults