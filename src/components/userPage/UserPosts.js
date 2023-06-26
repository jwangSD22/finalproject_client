import React, {useState,useEffect} from 'react'
import axios from 'axios'
import GenerateAvatar from '../../helper/GenerateAvatar'
import CreatePost from '../home/CreatePost'
import PostComponentUser from './PostComponentUser'
import { useParams } from 'react-router-dom'

function UserPosts({thisUsername,allData}) {
  {
    const [thisUser,setThisUser] = useState(null)
    const [toggleNewPost, setToggleNewPost] = useState(false)
    const [posts, setPosts] = useState([]);
    const [triggerPostDataRefresh, setTriggerPostDataRefresh] = useState(false)
    const [sameUser, setSameUser] = useState(false)

    const {username} = useParams()
    
    
    useEffect(()=>{
      const getThisUser = async () => {
        let response = await axios.get(`/api/users/${thisUsername}`)
        setThisUser(response.data)
        if(response.data.username===username){
          setSameUser(true)
        }
        else{
          setSameUser(false)
        }
      }

    
      thisUsername&&getThisUser()&&setPosts([])

    
    },[thisUsername,username])
    
    
    
    const formClickHandler = () => {
    setToggleNewPost(!toggleNewPost)
    }
    
    
    
    const newPost = <div className="container box-styling d-flex  align-items-center justify-content-center p-2">
        {thisUser&&<GenerateAvatar url={thisUser.profilePhotoURL} />}
      <div className='inputBox box-styling flex-grow-1' onClick={formClickHandler}> What's on your mind? </div>
      </div>
    
      return (

        <div className="mt-4 ">
          {/*hidden div for creating a new post */}
          {toggleNewPost && <div className="overlay" />}
          {toggleNewPost&&<CreatePost thisUser={thisUser} toggleNewPost={toggleNewPost} setToggleNewPost={setToggleNewPost} posts={posts} setPosts={setPosts} />}
    
          <div className="row">
       
            <div className='container-fluid text-center border rounded shadow-sm'>{sameUser&&newPost}</div>
     
    
           <PostComponentUser thisUser={thisUser} posts={posts} setPosts={setPosts} triggerPostDataRefresh={triggerPostDataRefresh} allData={allData}/> 
          </div>
    
        </div>
      )
    }
}

export default UserPosts
