import React,{useState,useEffect} from 'react'
import emptyAvatar from '../../images/empty_avatar.png'
import {useNavigate} from 'react-router-dom'
import './home.css'

function YouMayKnow({data,friends,username}) {

const [nonFriends,setNonFriends] = useState(null)

const navigate = useNavigate()

useEffect(() => {
    //friends is represented as an array - no friends, is empty array
if(data&&friends&&username){
    let hash = new Set();
//create hash table to make filtering more efficient 
for(let friend of friends){
    hash.add(friend.username)
}
//add self to be filtered out
hash.add(username)
let friendsFiltered = data.filter(user => !hash.has(user.username)).slice(0,10)
setNonFriends(friendsFiltered)
}
}, [data,friends,username])

let inlineImgStyling = {
    width:"30px",
    height:"30px",
    borderRadius:"50%"
}

const linkHandler = (username) => {

    navigate(`/user/${username}`)
}


//generate each line 
let nonFriendsList = nonFriends&&nonFriends.map(user=>
<div key={user._id} className='ymk-listItem d-flex my-3' onClick={()=>{linkHandler(user.username)}}>
    <div className='mx-2'><img style={inlineImgStyling} src={user.profilePhotoURL==='NO PROFILE PHOTO'?emptyAvatar:user.profilePhotoURL} alt="profilePhoto"></img></div>
    <div>{user.fullName}</div>
    </div>
)






    


  return (
    <div className='ymk d-none d-sm-flex flex-column mt-4'>
<div> People you may know</div>
<div>{nonFriendsList}</div>
    </div>
  )
}

export default YouMayKnow
