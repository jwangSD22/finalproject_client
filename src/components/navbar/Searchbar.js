import './searchbar.css'
import React,{useEffect,useState,useRef} from 'react'
import { AudioOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import QueryResults from './QueryResults';

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);





function Searchbar({data}) {
const [focus,setFocus] = useState(false)
const [searchValue,setSearchValue] = useState('')
const [queryResults, setQueryResults] = useState(null)

const divRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setFocus(false)
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [focus]);

const getQueryResults = () => {

    return (
        queryResults?queryResults.map(item=>
        <QueryResults 
            key={item._id} 
            fullName = {item.fullName} 
            profilePhotoURL={item.profilePhotoURL}
            username = {item.username}
            setSearchValue = {setSearchValue}
            setFocus = {setFocus}
            />)
            :
            <div className='container d-flex align-items-center justify-content-center my-2'>Start typing to find friends!</div>
    )
}

const searchHandler = (e) => {
setSearchValue(e.target.value)

if(e.target.value===''){
setQueryResults(null)
}
else{
    const filteredResults = data.filter(item=>{
        const nameLowerCase = item.fullName.toLowerCase();
        return nameLowerCase.includes(e.target.value.toLowerCase())})
    
     setQueryResults(filteredResults.slice(0,9))
}


}




  return (
    <div ref={divRef} className="container" style={{position:'relative'}}>
    <Search
      className='search-field'  
      placeholder="input search text"
      value={searchValue}
      onChange={searchHandler}
      onFocus={()=>setFocus(true)}
      style={focus?{width: 280}:{width: 200}}
     />
     {focus&&<div className='resultBox animate__animated animate__fadeIn shadow'>{getQueryResults()}</div>}
    </div>



  )
}

export default Searchbar
