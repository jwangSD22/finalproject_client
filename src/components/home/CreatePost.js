import React, { useState } from "react";
import GenerateAvatar from "../../helper/GenerateAvatar.js";
import axios from "axios";
import config from "../../helper/config.js";
import Compressor from "compressorjs";
import { FileImageOutlined } from "@ant-design/icons";
import "./home.css";

const CreatePost = ({
  thisUser,
  setToggleNewPost,
  toggleNewPost,
  posts,
  setPosts,
  textareaRef
}) => {
  const [tempImageURL, setTempImageURL] = useState("");
  const [postContent, setPostContent] = useState("");
  const [imgObjKey, setImgObjKey] = useState(null);

  async function handleImageUpload(event) {
    const file = event.target.files[0];

    //compress image file 
    new Compressor(file, {
      quality: 0.8, // Set the desired image quality (0 to 1)
      maxHeight: 500, // Set the maximum height of the resized image
      async success(file) {

        setTempImageURL(URL.createObjectURL(file));
        const imgFormData = new FormData();
        imgFormData.append("files", file);

        try {
          const response = await axios.post(
            `${config.backendServer}/api/posts/imageupload`,
            imgFormData
          );
          console.log(response.data.s3key);
          setImgObjKey(response.data.s3key);
        } catch (error) {
          setImgObjKey(false);
          console.error(error);
        }
      },
      error(err) {
        // Handle any errors that occur during compression
        setImgObjKey(false);
        console.error("Error during image compression:", err.message);
      },
    });
  }

  const handleImageRemove = () => {
    setTempImageURL("");
    setImgObjKey(null);
  };

  // Logic to handle post submission
  const handlePostSubmit = async () => {
    //conditionally add the imageKeyArray to the post only if there's an img.
    let postObject = {
      postMessage: postContent,
    };
    if (imgObjKey) {
      postObject.imageKeyArray = [imgObjKey];
    }

    if (imgObjKey !== false) {
      let response = await axios.post(
        `${config.backendServer}/api/posts/`,
        postObject
      );

      if (response.data) {
        let temp = await axios.get(
          `${config.backendServer}/api/posts/${response.data}`
        );
        setPosts([temp.data, ...posts]);
        setToggleNewPost(!toggleNewPost);
      }
    } else {
      console.log("Error uploading image - retry image submission");
    }
  };

  const tempImgStyling = {
    maxHeight: "500px",
    maxWidth: "100%",
    width: "auto",
    height: "auto",
    objectFit: "contain",
  };

  return (
    <div className="container-fluid my-4">
      <div className="create-post bg-white rounded p-2">

        <div className="row justify-content-between mb-2">
          <div className="empty-div col-2"></div>
          <div className="col-8 d-flex justify-content-center mt-2"> <span className="create-post-tag mb-2">Create post</span> </div>
          <div className="col-2 d-flex justify-content-end align-items-center"><button className="btn-close mx-3" onClick={() => {setToggleNewPost(!toggleNewPost);}}aria-label="Close"/></div>
       <hr className="my-0" />
        </div>

          <div className="d-flex align-items-center">
            {thisUser && (
              <GenerateAvatar
                cssClassIdentifier={`create-post-pfp mx-2`}
                url={thisUser.profilePhotoURL}
              />
            )}
            <div>
              <div className="text-muted"><small>posting as:</small></div>
              <div>{`${thisUser && thisUser.fullName}`}</div>
            </div>
          </div>
          <textarea
            className="form-control my-2 border-0"
            ref={textareaRef}
            rows="4"
            style={{
              resize: "none",
              outline: "none",
              boxShadow: "none",
              WebkitBoxShadow: "none",
            }}
            placeholder="What's on your mind"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          ></textarea>
          {tempImageURL && (
            <div className="card my-3">
              <img
                className="card-img-top"
                style={tempImgStyling}
                src={tempImageURL}
                alt="Post-img"
              />
              <button
                className="btn-close bg-white position-absolute top-0 end-0 m-2"
                onClick={handleImageRemove}
                aria-label="Close"
              ></button>
            </div>
          )}
          <div className="d-grid">
            {!tempImageURL && (
              <label htmlFor="photo-upload">
                <div className="add-img-btn container d-flex justify-content-center align-items-center border py-2 rounded" >
                <FileImageOutlined className="mx-2" style={{fontSize:'25px',color:'#2078F4'}} />
                
                  Add a photo to your post
            
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  className="d-none"
                  onChange={handleImageUpload}
                />
              </div>
              </label>
            )}

            <button
              className={`btn mt-3 ${(postContent.length>0)?'bg-primary text-white':null}`}
              onClick={handlePostSubmit}
              disabled={!postContent}
            >
              Post
            </button>
          </div>

      </div>
    </div>
  );
};

export default CreatePost;
