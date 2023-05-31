import React from 'react'
import emptyAvatar from '../images/empty_avatar.png'

function GenerateAvatar({url}) 
{

let activeURL = null
if(url!=='NO PROFILE PHOTO'){
activeURL=url
}

let style = {
    border:'solid 1px black',
    width:'35px',
    height:'35px',
    borderRadius:'50%'
}


  return (
<img className="mx-2" style={style} src={activeURL||emptyAvatar} />  )
}

export default GenerateAvatar
