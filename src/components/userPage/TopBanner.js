import React, { useState, useEffect } from "react";
import FriendReqBtns from "./FriendReqBtns"
import emptyAvatar from '../../images/empty_avatar.png'
import emptyBG from '../../images/empty_bg.png'
import axios from "axios";
import { CameraOutlined } from "@ant-design/icons";
import FriendIcons from "./FriendIcons";
import './topbanner.css'



function TopBanner({thisUserSameProfile,data,thisUsername,friendStatus,setFriendStatus,friends,setViewFriendsToggle}) {

    const [profilePhotoURL, setProfilePhotoURL] = useState(null);
    const [bgURL, setBgURL] = useState(null);
    const [icons, setIcons] = useState([])

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
        if(thisUserSameProfile){
          document.getElementById("pfp-upload").click();
        }
        else{
          return
        }
      };
    
      const handleBGupdateClick = () => {
        document.getElementById("bg-upload").click();
      };

      const iconStyle = {
        fontSize:'24px',
      }
    

  return (<>
            {/*BG BANNER CONTAINER */}
            <div className="container-sm">
            <div className='background-container' style={{height:'500px'}}>
                <img className="background-image"  src={bgURL || emptyBG}></img>
                {thisUserSameProfile && 
                  (<>
                    <label htmlFor="bg-upload" className="file-upload-label" />
                    <div onClick={handleBGupdateClick} >
                      <input
                        id="bg-upload"
                        type="file"
                        style={{ display: "none" }}
                        onChange={updateBG}
                      />
                      <button
                        className="icon-button bg-offset"
                        
                      >
                        <CameraOutlined style={iconStyle} />
                      </button>
                    </div>
                  </>)
                }
            </div>
          </div>
  
          {/*PFP CONTAINER */}
  
          <div className="container flex-column-sm">
            <div className="row">
              <div className="col-12 col-md-3 col-lg-3 col-xl-2" style={{ height: "175px" }}>
                <div className="pfp-container d-flex justify-content-center justify-content-md-start">
                  <button onClick={handlePFPupdateClick} className="pfp-button">
                  <img
                    src={profilePhotoURL || emptyAvatar}
                    className="pfp"
                  ></img>
                  </button>
                </div>
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
                          <CameraOutlined style={iconStyle} />
                      </button>
                    </div>
                  </>
                )}
              </div>
              {/*USER INFO */}
              <div className="banner-info-container col-12 col-md-4 col-lg-5 col-xl-6 d-flex flex-column mt-auto align-items-center align-items-md-start">
                <div>{data?.fullName}</div>
                <div>{<span className="friends-counter" onClick={()=>{setViewFriendsToggle(true)}}>{data ? `${data.friends.length} Friends` : "0 Friends"}</span>}</div>
                <FriendIcons friends={friends}/>
              </div>
              {/*Friend Req INFO */}
                
                {!thisUserSameProfile&&<FriendReqBtns friendStatus={friendStatus} thisUsername={thisUsername} data={data} setFriendStatus={setFriendStatus}/>}
            </div>
          </div>
          </>
  )
}

export default TopBanner
