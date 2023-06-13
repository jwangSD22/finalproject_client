import React, {useState,useEffect} from 'react'
import axios from 'axios'
import GenerateAvatar from '../../helper/GenerateAvatar'
import CreatePost from './CreatePost'
import PostComponent from './PostComponent'
import './home.css'






function HomePosts({username,allUsers}) {
const [thisUser,setThisUser] = useState(null)
const [toggleNewPost, setToggleNewPost] = useState(false)
const [posts, setPosts] = useState([]);
const [triggerPostDataRefresh, setTriggerPostDataRefresh] = useState(false)


useEffect(()=>{
  const getThisUser = async () => {
    let response = await axios.get(`/api/users/${username}`)
    setThisUser(response.data)
  }

  username&&getThisUser()

},[username])



const formClickHandler = () => {
setToggleNewPost(!toggleNewPost)
}



const newPost = <div className="container box-styling d-flex  align-items-center justify-content-center p-2">
    {thisUser&&<GenerateAvatar url={thisUser.profilePhotoURL} />}
  <div className='inputBox box-styling flex-grow-1' onClick={formClickHandler}> What's on your mind? </div>
  </div>

  return (
    <div className="mt-4 ">
      {toggleNewPost && <div className="overlay" />}
      {toggleNewPost&&<CreatePost thisUser={thisUser} toggleNewPost={toggleNewPost} setToggleNewPost={setToggleNewPost} posts={posts} setPosts={setPosts} />}

      <div className="row">
   
        <div className='container-fluid text-center'>{newPost}</div>
 

       <PostComponent thisUser={thisUser} posts={posts} setPosts={setPosts} triggerPostDataRefresh={triggerPostDataRefresh} allUsers={allUsers}/> 
      </div>

    </div>
  )
}

export default HomePosts
