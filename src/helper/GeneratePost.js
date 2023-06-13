import React, {useEffect,useState,useRef} from 'react'
import axios from 'axios'
import GenerateAvatar from './GenerateAvatar'
import { LikeOutlined, LikeFilled } from '@ant-design/icons'
import './generatePost.css'

function GeneratePost({data,thisUser}) {
  const [post,setPost] = useState(null)
  const [message,setMessage] = useState('')
  const [editComment, setEditComment] = useState(false)
  const [toggleCommentList, setToggleCommentList] = useState(false)
  const [userLiked,setUserLiked] = useState(false)
  const textareaRef = useRef(null);
  const divRef = useRef(null);

  useEffect(()=> {

    const getPostData = async () => {
      const response = await axios.get(`/api/posts/${data._id}`)
      setPost(response.data)
    } 
    getPostData()


  },[])

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    const div = divRef.current;
    if (textarea && div) {
      textarea.style.height = 'auto'; // Reset the height to calculate the new height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set the new height of the textarea
      div.style.height = `${textarea.scrollHeight}px`; // Set the height of the surrounding div
    }
  }, [message]);

  return (
    post&&<div className='container-fluid bg-light my-4 p-2 rounded shadow-sm'>
    <div className='header d-flex'>
      <div><GenerateAvatar url={post.authorAvatar}/></div>
      <div className='d-flex flex-column'>
      <div>{post.fullName}</div>
      <div>{post.timestamp}</div>
      </div>
    </div>

    <div className='d-flex'>
      <div>{post.postMessage}</div>
    </div>

    <hr className='hr' />
    <div className='d-flex justify-content-around'>
    <div>
      {userLiked?<LikeFilled style={{fontSize:'16px',}}/>:<LikeOutlined style={{fontSize:'25px',color:'red'}}/>}
      <button>LIKE</button>
      
      </div>
    <div><button onClick={()=>setEditComment(!editComment)}> Comment </button></div>
    </div>
    <hr className='hr' />
    <div>BUTTON TO OPEN AND CLOSE REST OF COMMENTS</div>
   <p> COMMENTS MAP GOES HERE </p>
   {editComment&&
   <div className='d-flex '>
   <GenerateAvatar url={thisUser.profilePhotoURL} />
  <div ref={divRef} className='bubble flex-grow-1'><textarea ref={textareaRef} className='edit-message' placeholder='Write a comment...' value={message} onChange={handleChange}></textarea>
</div>
   </div>
}



    {/* Render other post details */}
  </div>
  )
}

export default GeneratePost
