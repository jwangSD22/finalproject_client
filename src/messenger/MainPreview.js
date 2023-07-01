import React, { useState, useEffect } from "react";
import axios from "axios";
import emptyAvatar from '../../src/images/empty_avatar.png'
import './messenger.css'
import {format,isToday,isThisWeek } from 'date-fns'

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  if (isToday(date)) {
    return format(date, 'p'); // Format time (e.g., 10:30 AM)
  }

  if (isThisWeek(date)) {
    return format(date, 'EEE'); // Format day abbreviation (e.g., Mon, Tue)
  }

  return format(date, 'MMM d'); // Format month abbreviation and date (e.g., Jan 15)
}


function MainPreview() {
  const [previewData, setPreviewData] = useState([]);


  //this should happen everytime this component mounts, in order to update any new messages.
  useEffect(() => {
    const getPreview = async () => {
      const response = await axios.get("/api/chats/user");
      setPreviewData(response.data);
   
      console.log(response.data)
    };
    getPreview();

  },[]);




  return (
    <>
      <div className="previewField"> 

      {previewData.length?previewData.map(data=><GeneratePreview data={data}/>):<div>NO MESSAGES YET</div>}

       </div>
    </>
  );
}



function GeneratePreview ({data}) {

  const [pfp,setPfp] = useState(null)

  useEffect(()=>{
    const getPfp = async () => {
      const response = await axios.get(`/api/users/pfp/${data.partnerID}`)
      if(response.data.profilePhotoURL!=='NO PROFILE PHOTO'){
        setPfp(response.data.profilePhotoURL)
      }
    }
    getPfp()
  },[data])

  const handlePreviewClick = () => {
    console.log(data.partnerID)
  }

  return (
  <div className="container border" onClick={handlePreviewClick}>
  <div className="row my-2">
  <div className="col-2"><img className='pfp-msger-preview' src={pfp?pfp:emptyAvatar} /></div>
  <div className="col-7 d-flex flex-column">
    <div>
      {data.partnerFullName}
      </div>
      <div>
      {data.preview.message}
      </div>
      
       </div>

  <div className="col-3">
    {formatTimestamp(data.preview.timestamp)}
  </div>
 
  </div>
    </div>

  )
}

export default MainPreview;
