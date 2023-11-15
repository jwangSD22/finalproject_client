import React, { useState, useEffect } from "react";
import FriendReqBtns from "./FriendReqBtns.js";
import emptyAvatar from "../../images/empty_avatar.png";
import emptyBG from "../../images/empty_bg.png";
import axios from "axios";
import config from "../../helper/config.js";
import { CameraOutlined } from "@ant-design/icons";
import FriendIcons from "./FriendIcons.js";
import Compressor from "compressorjs";
import "./topbanner.css";

function TopBanner({
  thisUserSameProfile,
  data,
  thisUsername,
  friendStatus,
  setFriendStatus,
  friends,
  setViewFriendsToggle,
}) {
  const [profilePhotoURL, setProfilePhotoURL] = useState(null);
  const [bgURL, setBgURL] = useState(null);

  useEffect(() => {
    if (data) {
      setProfilePhotoURL(data.profilePhotoURL);
      setBgURL(data.bgPhotoURL);
    }
  }, [data]);

  const updatePFP = async (event) => {
    const file = event.target.files[0];

    new Compressor(file, {
      quality: 0.8, // Set the desired image quality (0 to 1)
      maxHeight: 500, // Set the maximum height of the resized image
      maxWidth: 500,
      async success(file) {

        const imgFormData = new FormData();
        imgFormData.append("profilePhoto", file);

        //upload to server to get object key
        const response = await axios.post(
          `${config.backendServer}/api/users/imageUpload`,
          imgFormData
        );
        const key = response.data.objectKey;

        // update user in mongodb with new objectkey

        const updateResponse = await axios.put(
          `${config.backendServer}/api/users/${thisUsername}`,
          {
            pfpKey: key,
          }
        );

        // get new URL to display on page

        if (updateResponse.status === 200) {
          const getPFP = await axios.get(
            `${config.backendServer}/api/users/pfp/${data._id}`
          );
          setProfilePhotoURL(getPFP.data.profilePhotoURL);
        }
      }
      ,
      error(err) {
        // Handle any errors that occur during compression
        console.error("Error during image compression:", err.message);
      },
    });
  };

  const updateBG = async (event) => {
    const file = event.target.files[0];

    new Compressor(file, {
      quality: 0.7, // Set the desired image quality (0 to 1)

      async success(file) {
        // The compressed and resized image is available as 'result' here
        // You can now send it to your backend or perform further actions

        const imgFormData = new FormData();
        imgFormData.append("bgPhoto", file);

        //upload to server to get object key
        const response = await axios.post(
          `${config.backendServer}/api/users/bgUpload`,
          imgFormData
        );
        const key = response.data.objectKey;

        // update user in mongodb with new objectkey

        const updateResponse = await axios.put(
          `${config.backendServer}/api/users/${thisUsername}`,
          {
            bgKey: key,
          }
        );

        // get new URL to display on page

        if (updateResponse.status === 200) {
          const getBG = await axios.get(
            `${config.backendServer}/api/users/bg/${data._id}`
          );
          setBgURL(getBG.data.bgPhotoURL);
        }
      },
      error(err) {
        // Handle any errors that occur during compression
        console.error("Error during image compression:", err.message);
      },
    });
  };

  const handlePFPupdateClick = () => {
    if (thisUserSameProfile) {
      document.getElementById("pfp-upload").click();
    } else {
      return;
    }
  };

  const handleBGupdateClick = () => {
    document.getElementById("bg-upload").click();
  };

  const iconStyle = {
    fontSize: "24px",
  };

  return (
    <>
      {/*BG BANNER CONTAINER */}
      <div className="container-sm">
        <div className="background-container" style={{ height: "500px" }}>
          <img className="background-image" src={bgURL || emptyBG}></img>
          {thisUserSameProfile && (
            <>
              <label htmlFor="bg-upload" className="file-upload-label" />
              <div onClick={handleBGupdateClick}>
                <input
                  id="bg-upload"
                  type="file"
                  style={{ display: "none" }}
                  onChange={updateBG}
                />
                <button className="icon-button bg-offset">
                  <CameraOutlined style={iconStyle} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/*PFP CONTAINER */}

      <div className="container flex-column-sm">
        <div className="row">
          <div
            className="col-12 col-md-3 col-lg-3 col-xl-2"
            style={{ height: "175px" }}
          >
            <div className="pfp-container d-flex justify-content-center justify-content-md-start">
              <button onClick={handlePFPupdateClick} className="pfp-button">
                <img src={profilePhotoURL || emptyAvatar} className="pfp"></img>
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
            <div>
              {
                <span
                  className="friends-counter"
                  onClick={() => {
                    setViewFriendsToggle(true);
                  }}
                >
                  {data ? `${data.friends.length} Friends` : "0 Friends"}
                </span>
              }
            </div>
            <FriendIcons friends={friends} />
          </div>
          {/*Friend Req INFO */}

          {!thisUserSameProfile && (
            <FriendReqBtns
              friendStatus={friendStatus}
              thisUsername={thisUsername}
              data={data}
              setFriendStatus={setFriendStatus}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default TopBanner;
