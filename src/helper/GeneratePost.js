import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GenerateAvatar from "./GenerateAvatar";
import { LikeOutlined, LikeFilled, SendOutlined } from "@ant-design/icons";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import "./generatePost.css";
import GenerateComment from "../components/comments/GenerateComment";

function GeneratePost({ data, thisUser, allUsers,pfpHash,setPfpHash }) {
  const [post, setPost] = useState('');
  const [message, setMessage] = useState("");
  const [editComment, setEditComment] = useState(false);
  const [toggleCommentList, setToggleCommentList] = useState(false);
  const [userLiked, setUserLiked] = useState(false);
  const [imageURLs, setImageURLs] = useState([]);
  const [comments, setComments] = useState([]);
  const [date,setDate] = useState('')
  const textareaRef = useRef(null);
  const divRef = useRef(null);
  const postRef = useRef(null)

  const navigate = useNavigate()


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
      setDate(format(parseISO(response.data.timestamp),`MMMM d, yyyy 'at' hh:mm a`))
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

  useEffect(() => {
    post &&
      setComments(
        [...post.comments]
          .reverse()
          .map((item) => <GenerateComment key={item} commentID={item} pfpHash={pfpHash} setPfpHash={setPfpHash} thisUser={thisUser} />)
      );
  }, [post,post.comments]);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const toggleLike = async () => {
    const response = axios.put(`/api/posts/${post._id}/togglelike`);
    setUserLiked(!userLiked);

    if (post.likes.indexOf(thisUser._id) > -1) {
      post.likes.splice(post.likes.indexOf(thisUser._id), 1);
      post.numberOfLikes--;
    } else {
      post.likes.unshift(thisUser._id);
      post.numberOfLikes++;
    }

  };

  const commentSubmitHandler = async () => {
    if (message.length > 0) {
      const response = await axios.post(`/api/posts/${post._id}/newcomment`, {
        message: message,
      });
      setMessage("");
      post.numberOfComments++;
      post.comments = [...post.comments, response.data._id];
    }
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (message.length > 0) {
        const response = await axios.post(`/api/posts/${post._id}/newcomment`, {
          message: message,
        });
        setMessage("");
        post.numberOfComments++;
        post.comments = [...post.comments, response.data._id];
      }
    }
  };

  const editCommentHandler = () => {
    setEditComment(!editComment)

    if(editComment===false){
      const windowHeight = window.innerHeight;
      const divBottomPosition = postRef.current.getBoundingClientRect().bottom;
      const scrollOffset = divBottomPosition - windowHeight / 2;
  
      window.scrollTo({
        top: window.scrollY + scrollOffset,
        behavior: 'smooth'
      });  
    }

  }

  const toggleCommentListHandler = () => {
    setToggleCommentList(!toggleCommentList);

    if(toggleCommentList===false){
      setEditComment(true);
      setTimeout(()=>{ const windowHeight = window.innerHeight;
        const divBottomPosition = postRef.current.getBoundingClientRect().bottom;
        const scrollOffset = divBottomPosition - windowHeight / 2;
    
        window.scrollTo({
          top: window.scrollY + scrollOffset,
          behavior: 'smooth'
        });  },500)
     
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
        <div>{`${fullNameArray[0]}, ${fullNameArray[1]} and ${fullNameArray.length>3?fullNameArray.length-2:''} others...`}</div>
      );
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    const div = divRef.current;
    if (textarea && div) {
      textarea.style.height = "auto"; // Reset the height to calculate the new height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set the new height of the textarea
      div.style.height = `${textarea.scrollHeight + 15}px`; // Set the height of the surrounding div
    }
  }, [message]);

  const handleNav = (username) => {
    navigate(`/user/${username}`);window.location.reload()
  }



  return (
    post && (
      <div ref={postRef} className=" bg-white my-4 p-2 rounded shadow-sm border">
        {/*post header*/}
        <div className="header d-flex">
          <div className="header-pfp" onClick={()=>handleNav(post.username)} >
            <GenerateAvatar cssClassIdentifier={`gen-post-pfp mx-2`} url={post.authorAvatar} />
          </div >
          <div className="d-flex flex-column">
            <div className="post-header-name" onClick={()=>handleNav(post.username)}>{post.fullName}</div>
            <div><small className="text-muted">{date}</small></div>
          </div>
        </div>


        <div className="my-4 mx-1">
        {/*post message*/}
        <div className="d-flex mb-2">
          <div>{post.postMessage}</div>
        </div>

        {/*post image conditionally rendered*/}
        <div className="image-container d-flex justify-content-center" >
          {imageURLs.length > 0 &&
            imageURLs.map((data) => (
              <img
                key={data}
                src={data}
                style={{ maxWidth:"100%", width: "100%", maxHeight:'500px',objectFit: "contain" }}
              ></img>
            ))}
        </div>

        </div>

        {/*LIKE COUNT AND COMMENT COUNT */}

        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center"> {post.likes.length>0&&<LikeFilled style={{ fontSize: "15px", color: "#2078F4" }} />}<small className="mx-1">{post.likes.length>0&&generateLikeSnippet()}</small></div>

          <div className="d-none d-sm-flex"><small>{post.numberOfComments} Comments </small></div>
        </div>

        {/*like/comment section*/}
        <hr className="hr" />
        <div className="row justify-content-center align-items-center" style={{height:'35px'}}>
          <div className="post-button col-5 mx-2" onClick={toggleLike}>
            {userLiked ? (
              <LikeFilled style={{ fontSize: "23px", color: "#2078F4" }} />
            ) : (
              <LikeOutlined style={{ fontSize: "23px", color: "black" }} />
            )}
            <span className={`mx-2 ${userLiked?'post-liked':null}`}> Like </span>
          </div>

          <div className="post-button col-5 mx-2" onClick={editCommentHandler}>
           
              <span>Comment</span>
   
          </div>
        </div>
        <hr className="hr" />

        {post.comments.length > 1 && (
          <div onClick={()=>{toggleCommentListHandler()}}>
            {toggleCommentList
              ? "Close comment list"
              : `View previous ${post.numberOfComments - 1} comments`}
          </div>
        )}

        <div>{toggleCommentList ? comments : comments[0]}</div>

        {editComment && (
          <div className="d-flex align-items-center animate__animated animate__fadeIn">
            <GenerateAvatar cssClassIdentifier={`gen-post-pfp mx-2`} url={thisUser.profilePhotoURL} />
            <div ref={divRef} className="bubble flex-grow-1">
              <textarea
                ref={textareaRef}
                className="edit-message"
                placeholder="Write a comment..."
                value={message}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              ></textarea>
            </div>
            <div className="arrowOutline">
              <SendOutlined
                className="mx-2"
                onClick={commentSubmitHandler}
                style={{
                  color: "white",
                  fontSize: "25px",
                }}
              />
            </div>
          </div>
        )}

        {/* Render other post details */}
      </div>
    )
  );
}

export default GeneratePost;
