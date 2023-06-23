import React, { useState, useEffect } from "react";
import FriendReqBtns from "./FriendReqBtns"
import emptyAvatar from '../../images/empty_avatar.png'
import axios from "axios";


function TopBanner({thisUserSameProfile,data,thisUsername,friendStatus,setFriendStatus}) {

    const [profilePhotoURL, setProfilePhotoURL] = useState(null);
    const [bgURL, setBgURL] = useState(null);

    useEffect(()=>{
        if(data){
            setProfilePhotoURL(data.profilePhotoURL);
            setBgURL(data.bgPhotoURL);
        }

    },[data])


    const updatePFP = async (event) => {
        const file = event.target.files[0];
        const imgFormData = new FormData();
        imgFormData.append("profilePhoto", file);
    
        //upload to server to get object key
        const response = await axios.post(`/api/users/imageUpload`, imgFormData);
        const key = response.data.objectKey;
    
        // update user in mongodb with new objectkey
    
        const updateResponse = await axios.put(`/api/users/${thisUsername}`, {
          pfpKey: key,
        });
    
        // get new URL to display on page
    
        if (updateResponse.status === 200) {
          const getPFP = await axios.get(`/api/users/pfp/${data._id}`);
          console.log(getPFP);
          setProfilePhotoURL(getPFP.data.profilePhotoURL);
        }
      };

      const updateBG = async (event) => {
        const file = event.target.files[0];
        const imgFormData = new FormData();
        imgFormData.append("bgPhoto", file);
    
        //upload to server to get object key
        const response = await axios.post(`/api/users/bgUpload`, imgFormData);
        const key = response.data.objectKey;
    
        // update user in mongodb with new objectkey
    
        const updateResponse = await axios.put(`/api/users/${thisUsername}`, {
          bgKey: key,
        });
    
        // get new URL to display on page
    
        if (updateResponse.status === 200) {
          const getBG = await axios.get(`/api/users/bg/${data._id}`);
          setBgURL(getBG.data.bgPhotoURL);
        }

        
      };

      const handlePFPupdateClick = () => {
        document.getElementById("pfp-upload").click();
      };
    
      const handleBGupdateClick = () => {
        document.getElementById("bg-upload").click();
      };
    

  return (<>
            {/*BG BANNER CONTAINER */}
            <div
            className="background-container container"
            style={{ width: "1250px", height: "500px" }}
          >
            <img src={bgURL || emptyAvatar} height="100%"></img>
            {thisUserSameProfile && (
              <>
                <label htmlFor="bg-upload" className="file-upload-label" />
                <div>
                  <input
                    id="bg-upload"
                    type="file"
                    style={{ display: "none" }}
                    onChange={updateBG}
                  />
                  <button
                    className="icon-button bg-offset"
                    onClick={handleBGupdateClick}
                  >
                    <i className="fas fa-upload"></i> Upload
                  </button>
                </div>
              </>
            )}
          </div>
  
          {/*PFP CONTAINER */}
  
          <div className="container d-flex flex-column-sm">
            <div className="col-2" style={{ height: "100px" }}>
              <img
                src={profilePhotoURL || emptyAvatar}
                width="auto"
                height="100%"
              ></img>
              {thisUserSameProfile && (
                <>
                  <label htmlFor="pfp-upload" className="file-upload-label" />
                  <div>
                    <input
                      id="pfp-upload"
                      type="file"
                      style={{ display: "none" }}
                      onChange={updatePFP}
                    />
                    <button
                      className="icon-button pfp-offset"
                      onClick={handlePFPupdateClick}
                    >
                      <i className="fas fa-upload"></i> Upload
                    </button>
                  </div>
                </>
              )}
            </div>
  
            {/*USER INFO */}
  
            <div className="col-8 d-flex flex-column mt-auto">
              <div>{data?.fullName}</div>
              <div>{data ? `${data.friends.length} Friends` : "0 Friends"}</div>
              <div>FRIEND ICON GENERATOR TOP 10</div>
            </div>
  
            {/*Friend Req INFO */}
  
  {!thisUserSameProfile&&<FriendReqBtns friendStatus={friendStatus} thisUsername={thisUsername} data={data} setFriendStatus={setFriendStatus}/>}
          </div>
          </>
  )
}

export default TopBanner