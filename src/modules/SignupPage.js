import React, { useState } from 'react';
import axios from 'axios';
import config from '../helper/config'

// Set token to the header
const token = localStorage.getItem('jwt');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;


const SignupPage = () => {
  // const [profilePhoto,setProfilePhoto] = useState(null)
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    email: '',
    dateOfBirth: '',
    aboutMe: '',
    profilePhotoKey: ''
  });
  
  const[tempImageUrl,setTempImageUrl] = useState(null)


//handles display of image after selection, and also sending to s3 bucket
  async function handleProfilePhotoChange (event) {
    const file = event.target.files[0]
    // setProfilePhoto(file);
    setTempImageUrl(URL.createObjectURL(file))

    const imgFormData = new FormData();
    imgFormData.append('profilePhoto', file);

    try{
        const response = await axios.post(`${config.backendServer}/api/users/imageUpload`,imgFormData)
        setFormData({...formData,profilePhotoKey:response.data.objectKey})

    }
    catch(error){
      console.error(error)
    }

  }


//handles all input changes in INPUT fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };



//handles logic for submitting to mongoDB
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submission')

    axios.post(`${config.backendServer}/api/users`, formData)
    .then(response=>{
      console.log(response.data.token)
      localStorage.setItem('jwt',response.data.token)
    })
    .catch(error=>{
      if(error.response.status === 400){
        console.log(error.response)
      }
    })


  };

  return (
  <div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="fullName">Full Name:</label>
      <input
        type="text"
        id="fullName"
        name="fullName"
        value={formData.fullName}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="password">Password:</label>
   
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="dateOfBirth">Date of Birth:</label>
      <input
        type="date"
        id="dateOfBirth"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="aboutMe">About Me:</label>
      <textarea
        id="aboutMe"
        name="aboutMe"
        value={formData.aboutMe}
        onChange={handleInputChange}
        maxLength="500"
      />

      <label htmlFor="profilePhotoUrl">Profile Photo</label>

      <div >
      <input type="file" onChange={handleProfilePhotoChange} />

     {tempImageUrl && <img src={tempImageUrl} alt="Profile" style={{ maxWidth: '200px', maxHeight: '200px' }} />} {/* show selected photo */}
 
      </div>

      {/* <div>
        <button onClick={()=>console.log(formData)}>
          CHECK FORM DATA
        </button>
      </div> */}

      <button type="submit">Sign Up</button>
    </form>
    </div>
  );
};

export default SignupPage;
