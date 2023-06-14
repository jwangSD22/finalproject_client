import React, {useEffect,useState } from 'react'
import axios from 'axios'
import GenerateAvatarFromID from '../../helper/GenerateAvatarFromID'

function GenerateComment({commentID}) {

const [data,setData] = useState(null)


useEffect(()=>{

    const getCommentData = async () => {
        const response = await axios.get(`/api/comments/${commentID}`)
        console.log(response.data)
        setData(response.data)

    }

    commentID&&getCommentData()


},[commentID])

const getCommentData = async () => {
  const response = await axios.get(`/api/comments/${commentID}`)
  console.log(response)
  setData(response.data)
}



  return (
    data&&<div className='d-flex bg-white my-1 border'>

{<GenerateAvatarFromID userID={data.author._id} />}
<div className='d-flex flex-column'>
  <div><small>{data.author.fullName}</small></div>
  <div><h3>{data.message}</h3></div>
  <div><small>Like</small></div>
</div>
    </div>
  )
}

export default GenerateComment
