import React, {useEffect,useState} from 'react'
import axios from 'axios'

function GeneratePost({data}) {
  const [post,setPost] = useState(null)

  useEffect(()=> {

    const getPostData = async () => {
      const response = await axios.get(`/api/posts/${data._id}`)
      setPost(response.data)
    } 
    getPostData()


  },[])

  return (
    post&&<div className='container bg-light'>
    <p>{post.fullName}</p>
    {/* <p>{post.authorAvatar}</p> */}
    <p>{post.postMessage}</p>
    <p>{post.timestamp}</p>
    <p>Likes: {post.numberOfLikes}</p>
    <p>Comments: {post.numberOfComments}</p>

    {/* Render other post details */}
  </div>
  )
}

export default GeneratePost
