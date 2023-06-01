import React, { useState, useEffect } from 'react';
import axios from 'axios';



const PostComponent = ({thisUser,posts,setPosts}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage,setMaxPage] = useState(null)
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`/api/users/${thisUser.username}/homeposts`, {
            params: {
              page: currentPage,
              limit: 10
            }
          });
          const { data } = response;
          if(!maxPage){
            setMaxPage(data.totalPages)
          }
          setPosts((prevPosts) => [...prevPosts, ...data.posts]);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching posts:', error);
          setLoading(false);
        }
      };
  
      fetchPosts();
    }, [thisUser,currentPage]);
  
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
     
        if(currentPage!==maxPage){
            if (scrollHeight - scrollTop === clientHeight && !loading) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    }
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    return (
      <div>
        <h1>Posts</h1>
        {posts.map((post) => (
          <div key={post._id}>
            <h3>{post.author}</h3>
            <h3>{post.author}</h3>

            <h3>{post.author}</h3>

            <h3>{post.author}</h3>

            <h3>{post.author}</h3>

            <h3>{post.author}</h3>

            <h3>{post.author}</h3>


 
            <p>{post.postMessage}</p>
            {/* Render other post details */}
          </div>
        ))}
        {loading && <p>Loading...</p>}
      </div>
    );
  };
  
  export default PostComponent;
