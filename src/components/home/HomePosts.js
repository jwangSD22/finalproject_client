import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import GenerateAvatar from "../../helper/GenerateAvatar.js";
import CreatePost from "./CreatePost.js";
import PostComponent from "./PostComponent.js";
import config from "../../helper/config.js";
import "./home.css";

function HomePosts({ username, allUsers }) {
  const [thisUser, setThisUser] = useState(null);
  const [toggleNewPost, setToggleNewPost] = useState(false);
  const [posts, setPosts] = useState([]);
  const textareaRef = useRef(null);

  useEffect(() => {
    const getThisUser = async () => {
      let response = await axios.get(
        `${config.backendServer}/api/users/${username}`
      );
      setThisUser(response.data);
    };

    username && getThisUser();
  }, [username]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [toggleNewPost]);

  const formClickHandler = () => {
    setToggleNewPost(!toggleNewPost);
  };

  const newPost = (
    <div className="container box-styling d-flex bg-white border shadow-sm  align-items-center justify-content-center p-2">
      {thisUser && (
        <GenerateAvatar
          cssClassIdentifier={`create-post-pfp mx-2`}
          url={thisUser.profilePhotoURL}
        />
      )}
      <div
        className="inputBox box-styling flex-grow-1"
        onClick={formClickHandler}
      >
        {" "}
        What's on your mind?{" "}
      </div>
    </div>
  );

  return (
    <div className="mt-4 ">
      {toggleNewPost && <div className="overlay" />}
      {toggleNewPost && (
        <CreatePost
          thisUser={thisUser}
          toggleNewPost={toggleNewPost}
          setToggleNewPost={setToggleNewPost}
          posts={posts}
          setPosts={setPosts}
          textareaRef={textareaRef}
        />
      )}

      <div className="row">
        <div className="container-fluid text-center">{newPost}</div>

        <PostComponent
          thisUser={thisUser}
          posts={posts}
          setPosts={setPosts}
          allUsers={allUsers}
        />
      </div>
    </div>
  );
}

export default HomePosts;
