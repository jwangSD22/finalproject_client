import './searchbar.css'
import React,{useEffect,useState} from 'react'
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

const getQueryResults = () => {

    return (
        queryResults?queryResults.map(item=>
        <QueryResults 
            key={item._id} 
            fullName = {item.fullName} 
            profilePhotoURL={item.profilePhotoURL}
            />)
            :
            <div><p>Start typing to find friends!</p></div>
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
    
     setQueryResults(filteredResults)
}


}




  return (
    <div className="container-fluid" style={{position:'relative'}}>
    <Search
      className='search-field'  
      placeholder="input search text"
      value={searchValue}
      onChange={searchHandler}
      onFocus={()=>setFocus(true)}
      onBlur={()=>setFocus(false)}
      style={focus?{width: 250}:{width: 200}}
     />
     {focus&&<div className='resultBox animate__animated animate__fadeIn'>{getQueryResults()}</div>}
    </div>



  )
}

export default Searchbar