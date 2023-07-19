import React, { useState } from "react";
import GenerateAvatar from "../../helper/GenerateAvatar";
import axios from "axios";
import './home.css'

const CreatePost = ({ thisUser, setToggleNewPost, toggleNewPost,posts, setPosts }) => {
  const [tempImageURL, setTempImageURL] = useState("");
  const [postContent, setPostContent] = useState("");
  const [imgObjKey, setImgObjKey] = useState(null);

  async function handleImageUpload(event) {
    const file = event.target.files[0];
    setTempImageURL(URL.createObjectURL(file));

    const imgFormData = new FormData();
    imgFormData.append("files", file);

    try {
      const response = await axios.post("/api/posts/imageupload", imgFormData);
      setImgObjKey(response.data.s3key);


    } catch (error) {
      console.error(error);
    }
  }


  
  const handleImageRemove = () => {
    setTempImageURL("");
  };



  // Logic to handle post submission
  const handlePostSubmit = async () => {
      //conditionally add the imageKeyArray to the post only if there's an img. 
      let postObject = {
        postMessage:postContent
    }
    if(imgObjKey){
        postObject.imageKeyArray=[imgObjKey]
    }


    let response = await axios.post("/api/posts/", postObject);
    
    if(response.data){
      let temp = await axios.get(`/api/posts/${response.data}`)
      setPosts([temp.data,...posts])
      setToggleNewPost(!toggleNewPost);
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
 
        <div className="card-header d-flex align-items-center justify-content-between">
          <h5 className="mb-0">Create Post</h5>
          <button
            className="btn-close"
            onClick={() => {
              setToggleNewPost(!toggleNewPost);
            }}
            aria-label="Close"
          ></button>
        </div>
        <div className="card-body">
          <div className="d-flex align-items-start">
            {thisUser && <GenerateAvatar cssClassIdentifier={`create-post-pfp mx-2`} url={thisUser.profilePhotoURL} />}
            <div>
              <p className="mb-0">{`Posting as: ${
                thisUser && thisUser.fullName
              }`}</p>
            </div>
          </div>
          <textarea
            className="form-control my-3 border-0"
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
                className="btn-close position-absolute top-0 end-0 m-2"
                onClick={handleImageRemove}
                aria-label="Close"
              ></button>
            </div>
          )}
          <div className="d-grid">
            {!tempImageURL && (
              <>
                <label htmlFor="photo-upload" className="btn btn-primary">
                  Add Photo
                </label>
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  className="d-none"
                  onChange={handleImageUpload}
                />
              </>
            )}

            <button className="btn btn-success mt-3" onClick={handlePostSubmit} disabled={!postContent} >
              Post
            </button>
          </div>
        </div>

    </div>
    </div>
  );
};

export default CreatePost;
