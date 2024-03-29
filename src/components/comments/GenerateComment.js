import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GenerateAvatarFromID from "../../helper/GenerateAvatarFromID.js";
import { formatDistanceToNow } from "date-fns";
import { LikeFilled } from "@ant-design/icons";
import "./generatecomment.css";
import config from "../../helper/config.js";

function GenerateComment({
  commentID,
  pfpHash,
  setPfpHash,
  thisUser,
  newCommentTog,
}) {
  const [data, setData] = useState(null);
  const [date, setDate] = useState("");
  const [likes, setLikes] = useState(null);
  const [userLiked, setUserLiked] = useState(false);
  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();

  // retrieve comment data
  useEffect(() => {
    const getCommentData = async () => {
      const response = await axios.get(
        `${config.backendServer}/api/comments/${commentID}`
      );
      setData(response.data);
    };
    commentID && getCommentData();
  }, [newCommentTog, toggle, commentID]);

  // set like counter and if logged in user is one of the likes
  useEffect(() => {
    if (data) {
      setLikes(data.numberOfLikes);
      setDate(
        formatDistanceToNow(new Date(data.timestamp), { addSuffix: true })
      );

      if (data.likes.indexOf(thisUser._id) >= 0) {
        setUserLiked(true);
      } else {
        setUserLiked(false);
      }
    }
  }, [data, thisUser]);

  //toggles like status with backend
  const handleLike = async () => {
    await axios.put(
      `${config.backendServer}/api/comments/${commentID}/togglelike`
    );
    setToggle(!toggle);
  };

  const handleNav = (username) => {
    navigate(`/user/${username}`);
    window.location.reload();
  };

  return (
    data && (
      <div className="d-flex bg-white my-1">
        <div className="my-3">
          <GenerateAvatarFromID
            userID={data.author._id}
            pfpHash={pfpHash}
            setPfpHash={setPfpHash}
          />
        </div>
        <div className="d-flex flex-column" style={{ minWidth: "200px" }}>
          <div className="bg-light p-2 mt-2 rounded">
            <div onClick={() => handleNav(data.author.username)}>
              <small className="comment-user-name">
                {data.author.fullName}
              </small>
            </div>
            <div className="d-flex flex-grow-1">{data.message}</div>
          </div>

          <div className="d-flex justify-content-between my-1">
            <div>
              <small
                className={userLiked ? "likeButton btnLiked" : "likeButton"}
                onClick={handleLike}
              >
                Like
              </small>
              <small className="mx-2 text-muted">{date}</small>
            </div>
            {likes > 0 ? (
              <LikeCounter likes={likes} setLikes={setLikes} />
            ) : null}
          </div>
        </div>
      </div>
    )
  );
}

function LikeCounter({ likes, setLikes }) {
  return (
    <div className="likeContainer mx-2 d-flex align-items-center justify-content-center">
      <div className="likesLogo">
        <LikeFilled style={{ color: "white", fontSize: "12px" }} />
      </div>
      <div className="likeCounter">{likes}</div>
    </div>
  );
}

export default GenerateComment;
