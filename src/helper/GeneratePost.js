import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import GenerateAvatar from "./GenerateAvatar";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import "./generatePost.css";

function GeneratePost({ data, thisUser, allUsers }) {
  const [post, setPost] = useState(null);
  const [message, setMessage] = useState("");
  const [editComment, setEditComment] = useState(false);
  const [toggleCommentList, setToggleCommentList] = useState(false);
  const [userLiked, setUserLiked] = useState(false);
  const [imageURLs, setImageURLs] = useState([]);
  const [likesList, setLikesList] = useState([]);
  const textareaRef = useRef(null);
  const divRef = useRef(null);

  useEffect(() => {
    const getPostData = async () => {
      const response = await axios.get(`/api/posts/${data._id}`);
      setPost(response.data);
      if (response.data.imageURLs.length > 0) {
        setImageURLs(response.data.imageURLs);
      }
      if (response.data.likes.indexOf(thisUser._id) > -1) {
        setUserLiked(true);
      }
    };

    getPostData();
  }, []);

  useEffect(() => {
    if (post && post.likes.indexOf(thisUser._id) > -1) {
      setUserLiked(true);
    } else {
      setUserLiked(false);
    }
  }, [post]);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const toggleLike = async () => {
    const response = axios.put(`/api/posts/${post._id}/togglelike`);
    setUserLiked(!userLiked);

    if (post.likes[0] === thisUser._id) {
      post.likes.shift();
      post.numberOfLikes--
    } else {
      post.likes.unshift(thisUser._id);
      post.numberOfLikes++
    }
  };

  const generateLikeSnippet = (param) => {
    const likesHash = {};
    for (let item of post.likes) {
      if (!likesHash[item]) {
        likesHash[item] = true;
      }
    }
    for (let item of allUsers) {
      if (likesHash[item._id]) {
        likesHash[item._id] = item.fullName;
      }
    }

    let fullNameArray = Object.values(likesHash);

    if (param) {
      return fullNameArray;
    }

    if (fullNameArray.length === 1) {
      return <div>{`${fullNameArray[0]}`}</div>;
    }
    if (fullNameArray.length === 2) {
      return <div>{`${fullNameArray[0]} and ${fullNameArray[1]}`}</div>;
    } else {
      return (
        <div>{`${fullNameArray[0]}, ${fullNameArray[1]} and others...`}</div>
      );
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    const div = divRef.current;
    if (textarea && div) {
      textarea.style.height = "auto"; // Reset the height to calculate the new height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set the new height of the textarea
      div.style.height = `${textarea.scrollHeight}px`; // Set the height of the surrounding div
    }
  }, [message]);


  return (
    post && (
      <div className="container-fluid bg-light my-4 p-2 rounded shadow-sm">
        {/*post header*/}
        <div className="header d-flex">
          <div>
            <GenerateAvatar url={post.authorAvatar} />
          </div>
          <div className="d-flex flex-column">
            <div>{post.fullName}</div>
            <div>{post.timestamp}</div>
          </div>
        </div>

        {/*post message*/}

        <div className="d-flex">
          <div>{post.postMessage}</div>
        </div>

        {/*post image conditionally rendered*/}
        <div className="d-flex justify-content-center">
          {imageURLs.length > 0 &&
            imageURLs.map((data) => (
              <img
                key={data}
                src={data}
                style={{ width: "auto", objectFit: "contain" }}
              ></img>
            ))}
        </div>

        {/*LIKE COUNT AND COMMENT COUNT */}

        <div className="d-flex justify-content-between">
          <div> {post.likes.length && generateLikeSnippet()}</div>

          <div>{post.numberOfComments} Comments </div>
        </div>

        {/*like/comment section*/}
        <hr className="hr" />
        <div className="d-flex justify-content-around">
          <div>
            {userLiked ? (
              <LikeFilled style={{ fontSize: "23px", color: "green" }} />
            ) : (
              <LikeOutlined style={{ fontSize: "23px", color: "red" }} />
            )}
            <button onClick={toggleLike}>LIKE</button>
          </div>

          <div>
            <button onClick={() => setEditComment(!editComment)}>
              {" "}
              Comment{" "}
            </button>
          </div>
        </div>
        <hr className="hr" />
        <div>BUTTON TO OPEN AND CLOSE REST OF COMMENTS</div>
        <p> COMMENTS MAP GOES HERE </p>
        {editComment && (
          <div className="d-flex ">
            <GenerateAvatar url={thisUser.profilePhotoURL} />
            <div ref={divRef} className="bubble flex-grow-1">
              <textarea
                ref={textareaRef}
                className="edit-message"
                placeholder="Write a comment..."
                value={message}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        )}

        {/* Render other post details */}
      </div>
    )
  );
}

export default GeneratePost;
