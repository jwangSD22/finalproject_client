import React, {useState,useEffect,useRef} from 'react'

import axios from 'axios'
import config from '../../helper/config.js'
import GenerateAvatar from '../../helper/GenerateAvatar.js'
import CreatePost from '../home/CreatePost.js'
import PostComponentUser from './PostComponentUser.js'
import { useParams } from 'react-router-dom'
import './userposts.css'

function UserPosts({thisUsername,allData}) {
  {
    const [thisUser,setThisUser] = useState(null)
    const [toggleNewPost, setToggleNewPost] = useState(false)
    const [posts, setPosts] = useState([]);
    const [triggerPostDataRefresh, setTriggerPostDataRefresh] = useState(false)
    const [sameUser, setSameUser] = useState(false)
    const textareaRef = useRef(null)

    const {username} = useParams()
    
    
    useEffect(()=>{
      const getThisUser = async () => {
        let response = await axios.get(`${config.backendServer}/api/users/${thisUsername}`)
        setThisUser(response.data)
        if(response.data.username===username){
          setSameUser(true)
        }
        else{
          setSameUser(false)
        }
      }

      thisUsername&&getThisUser()

      setPosts([])

    
    },[thisUsername,username])

    useEffect(()=>{
      console.log('triggered my effect')
      if(textareaRef.current){
        textareaRef.current.focus()
      }
    },[toggleNewPost])
    
    
    
    const formClickHandler = () => {
      
            window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });  

    setToggleNewPost(!toggleNewPost)


    }
    
    
    
    const newPost = <div className="container box-styling d-flex  align-items-center justify-content-center p-2">
        {thisUser&&<GenerateAvatar cssClassIdentifier={`user-post-pfp mx-2`} url={thisUser.profilePhotoURL} />}
      <div className='inputBox box-styling flex-grow-1' onClick={formClickHandler}> What's on your mind? </div>
      </div>
    
      return (

        <div className={`${sameUser&&'mt-4'}`}>
          {/*hidden div for creating a new post */}
          {toggleNewPost && <div className="overlay" />}
          {toggleNewPost&&<CreatePost thisUser={thisUser} toggleNewPost={toggleNewPost} setToggleNewPost={setToggleNewPost} posts={posts} setPosts={setPosts} textareaRef={textareaRef} />}
    
          <div className="row">
       
            {sameUser&&<div className=' text-center border rounded shadow-sm'>{newPost}</div>}
     
    
           <PostComponentUser thisUser={thisUser} posts={posts} setPosts={setPosts} triggerPostDataRefresh={triggerPostDataRefresh} allData={allData}/> 
          </div>
    
        </div>
      )
    }
}

export default UserPosts
