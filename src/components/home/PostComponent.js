import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../helper/config.js";
import GeneratePost from "../../helper/GeneratePost.js";

const PostComponent = ({ thisUser, posts, setPosts, allUsers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pfpHash, setPfpHash] = useState(new Map());

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${config.backendServer}/api/users/${thisUser.username}/homeposts`,
          {
            params: {
              page: currentPage,
              limit: 10,
            },
          }
        );
        const { data } = response;

        if (!maxPage) {
          setMaxPage(data.totalPages);
        }
        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    if (thisUser !== null) {
      fetchPosts();
    }
  }, [thisUser, currentPage]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (currentPage !== maxPage) {
      if (scrollHeight - scrollTop <= clientHeight + 70 && !loading) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container-fluid ">
      {posts.map((data) => (
        <GeneratePost
          key={data._id}
          data={data}
          thisUser={thisUser}
          allUsers={allUsers}
          pfpHash={pfpHash}
          setPfpHash={setPfpHash}
        />
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default PostComponent;
