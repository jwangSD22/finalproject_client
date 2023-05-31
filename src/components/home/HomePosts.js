import React, {useState,useEffect} from 'react'
import axios from 'axios'
import GenerateAvatar from '../../helper/GenerateAvatar'







function HomePosts({username}) {
const [thisUser,setThisUser] = useState(null)
const [toggleNewPost, setToggleNewPost] = useState(false)
const [avatarComponent,setAvatarComponent] = useState(null)

useEffect(()=>{
  const getThisUser = async () => {
    let response = await axios.get(`/api/users/${username}`)
    setThisUser(response.data)
  }
  getThisUser()
},[username])



const formClickHandler = async () => {
console.log('booty')
}



const newPost = <div className="container d-flex align-items-center p-2">
    <GenerateAvatar url={thisUser.profilePhotoURL} />
  <div className='inputBox' onClick={formClickHandler}> What's on your mind? </div>
  </div>

  return (
    <div className="container mt-4 ">
      <div className="row">
      <div className="border">
        <div className='container col-10'>{newPost}</div>
      </div>

        <div> LIST OF ALL POSTS</div>
      </div>

    </div>
  )
}

export default HomePosts
