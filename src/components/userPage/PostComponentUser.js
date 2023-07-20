import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../helper/config.js'
import GeneratePost from '../../helper/GeneratePost';
import { useParams } from 'react-router-dom';



function PostComponentUser({thisUser,posts,setPosts,allData}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage,setMaxPage] = useState(null)
    const [loading, setLoading] = useState(false);
    const [pfpHash, setPfpHash] = useState(new Map())
    const [postsLoaded,setPostsLoaded] = useState(false)

    const { username } = useParams();

 
  
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${config.backendServer}/api/users/${username}/posts`, {
            //have to use params for this from react router dom
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
  
      if(thisUser!==null&&postsLoaded===false){
        fetchPosts()
        setPostsLoaded(true)
      }

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
      <>
        {posts.map((data) => (
<GeneratePost key={data._id} data={data} thisUser={thisUser} allUsers={allData} pfpHash={pfpHash} setPfpHash={setPfpHash}/>
        ))}
        {loading && <p>Loading...</p>}
      </>
    );
}

export default PostComponentUser
