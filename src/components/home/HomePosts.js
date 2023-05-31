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
    setAvatarComponent(<GenerateAvatar url={response.data.profilePhotoURL} />)
  }
  getThisUser()
},[username])



const formClickHandler = async () => {
console.log('booty')
}



const newPost = <div className="container d-flex justify-content-center">
  {avatarComponent}
  <div onClick={formClickHandler}> What's on your mind? </div>
  </div>

  return (
    <div className="container d-flex flex-column align-items-center mt-4">
        <div className='container-fluid row-sm-12 d-flex justify-content-center'>{newPost}</div>

        <div> LIST OF ALL POSTS</div>
    </div>
  )
}

export default HomePosts
