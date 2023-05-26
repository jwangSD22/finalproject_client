import React,{useEffect,useState} from 'react'
import './navbar.css'
import avatar from '../../images/empty_avatar.png'
import {Tooltip} from 'react-tooltip'
import {HomeOutlined,MessageOutlined,TeamOutlined} from '@ant-design/icons'


const Navbar = () => {
 const [path,setPath] = useState(null)
 const [query,setQuery] = useState(null)

 //sets current path to alter css for center icons
  useEffect(()=> {
    setPath(window.location.pathname)
  },[path])


  return (

    <nav className='container-fluid d-flex justify-content-between bg-light'>

      {/* start-elements brand logo and search bar */}
<div className="left-nav container d-flex justify-content-start">
<a className="navbar-brand me-2 mb-1 d-flex align-items-center" href="#">
            <img
              src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
              height="20"
              alt="MDB Logo"
              loading="lazy"
              style={{ marginTop: '2px' }}
            />
          </a>
          {/* Search form */}
          <form className="input-group w-auto my-auto d-none d-sm-flex">
            <input
              autoComplete="off"
              type="search"
              className="form-control rounded"
              placeholder="Search"
              style={{ minWidth: '125px' }}
            />

          </form>
</div>

      {/* CENTER NAVIGATION */}
<div className="center-nav container d-flex justify-content-center align-items-end">
          {/* home */}
          <a className="navbar-brand me-2 mb-1 d-flex align-items-center" href="/home">
          <HomeOutlined className={path==='/home'?'current-path mx-2':'friends-icon mx-2'}/>
          </a>
          {/* friends */}
          <a className="navbar-brand me-2 mb-1 d-flex align-items-center" href="/friends">
          <TeamOutlined className={path==='/friends'?'current-path mx-2':'friends-icon mx-2'} />
          </a>
          {/* messenger */}
          <a className="navbar-brand me-2 mb-1 d-flex align-items-center" href="#">
          <MessageOutlined className='messenger-icon mx-2' />
          </a>
</div>

      {/* settings menu and profile page */}
<div className="end-nav container d-flex justify-content-end">RIGHT</div>
    </nav>


  );
}


export default Navbar
