import React, { useState, useEffect } from "react";
import axios from "axios";
import emptyAvatar from '../../src/images/empty_avatar.png'
import './messenger.css'
import formatTimestamp from '../helper/formatTimestampMessenger'


//data={data} setUsername2={setUsername2} chatConnected={chatConnected} setChatConnected={setChatConnected}

function MainPreview({setUsername2,chatConnected,setChatConnected,setRoomID,username1}) {
  const [previewData, setPreviewData] = useState([]);


  //this should happen everytime this component mounts, in order to update any new messages.
  useEffect(() => {
    const getPreview = async () => {
      const response = await axios.get("/api/chats/user");
      setPreviewData(response.data);
    };

    getPreview();

  },[]);




  return (
    <>
      <div className="previewField"> 

      {previewData.length?previewData.map(data=><GeneratePreview key={data._id} data={data} setUsername2={setUsername2} chatConnected={chatConnected} setChatConnected={setChatConnected} setRoomID={setRoomID} username1={username1}/>):<div>NO MESSAGES YET</div>}

       </div>
    </>
  );
}



function GeneratePreview ({data,setUsername2,setChatConnected,setRoomID,username1}) {

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

  const handleConnectFromPreview = async () => {


    const username2 = data.partnerUsername

    const findRoom = async () => {
      try {
      if (username1 && username2) {
        let response = await axios.post("/api/chats", {
          username2,
        });
        setRoomID(response.data.chatid);
        return response.data.chatid;
      }
    } catch (err) {
      if (err.response.status === 400) {
        console.log(err.response)
        return null;
      }
    }
  };


    setUsername2(data.partnerUsername);
    setChatConnected(true);

    await findRoom();

  }




  return (
  <div className="container border msger-preview-container" onClick={handleConnectFromPreview}>
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
