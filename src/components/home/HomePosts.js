import React, {useState,useEffect} from 'react'
import axios from 'axios'
import GenerateAvatar from '../../helper/GenerateAvatar'
import CreatePost from './CreatePost'






function HomePosts({username}) {
const [thisUser,setThisUser] = useState(null)
const [toggleNewPost, setToggleNewPost] = useState(false)

useEffect(()=>{
  const getThisUser = async () => {
    let response = await axios.get(`/api/users/${username}`)
    setThisUser(response.data)
  }
  getThisUser()
},[username])



const formClickHandler = () => {
setToggleNewPost(!toggleNewPost)
}



const newPost = <div className="container box-styling d-flex align-items-center justify-content-center p-2">
    {thisUser&&<GenerateAvatar url={thisUser.profilePhotoURL} />}
  <div className='inputBox box-styling' onClick={formClickHandler}> What's on your mind? </div>
  </div>

  return (
    <div className="container col-10 mt-4 ">
      {toggleNewPost && <div className="overlay" />}
      {toggleNewPost&&<CreatePost thisUser={thisUser} toggleNewPost={toggleNewPost} setToggleNewPost={setToggleNewPost} />}

      <div className="row">
   
        <div className='container col-10'>{newPost}</div>
 

        <div> LIST OF ALL POSTS</div>
      </div>

    </div>
  )
}

export default HomePosts
