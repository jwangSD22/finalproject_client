import React from 'react'
import emptyAvatar from '../images/empty_avatar.png'

function GenerateAvatar({url,cssClassIdentifier}) 
{

let activeURL = null
if(url!=='NO PROFILE PHOTO'){
activeURL=url
}




  return (
<img className={cssClassIdentifier} src={activeURL||emptyAvatar} />  )
}

export default GenerateAvatar
