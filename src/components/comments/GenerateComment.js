import React, {useEffect,useState } from 'react'
import axios from 'axios'
import GenerateAvatarFromID from '../../helper/GenerateAvatarFromID'
import { formatDistanceToNow } from 'date-fns'


function GenerateComment({commentID,pfpHash,setPfpHash}) {

const [data,setData] = useState(null)
const [date,setDate] = useState('')




useEffect(()=>{

    const getCommentData = async () => {
        const response = await axios.get(`/api/comments/${commentID}`)
        setData(response.data)
        setDate(formatDistanceToNow(new Date(response.data.timestamp), { addSuffix: true }))


    }

    commentID&&getCommentData()


},[commentID])







  return (
    data&&<div className='d-flex bg-white my-1 border'>

{<GenerateAvatarFromID userID={data.author._id} pfpHash={pfpHash} setPfpHash={setPfpHash}/>}
<div className='d-flex flex-column'>
  <div><small>{data.author.fullName}</small></div>
  <div><h3>{data.message}</h3></div>
  <div className='d-flex'><small className='mx-1'>Like</small>
        <small className='mx-1 text-muted'>{date}</small>
  </div>
</div>
    </div>
  )
}

export default GenerateComment
