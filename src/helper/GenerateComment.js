import React, {useEffect,useState } from 'react'
import axios from 'axios'
import GenerateAvatarFromID from './GenerateAvatarFromID'

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
    data&&<div>

{<GenerateAvatarFromID userID={data.author._id} />}
{data.message}
    </div>
  )
}

export default GenerateComment
