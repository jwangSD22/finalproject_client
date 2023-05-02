import React, { useState } from 'react';
import axios from 'axios';

const SignupPage = () => {
  const [profilePhoto,setProfilePhoto] = useState(null)
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    email: '',
    dateOfBirth: '',
    aboutMe: '',
    profilePhotoUrl: ''
  });
  
  const[tempImageUrl,setTempImageUrl] = useState(null)

  async function handleProfilePhotoChange (event) {
    const file = event.target.files[0]
    const fileName = file.name
    setProfilePhoto(file);
    setTempImageUrl(URL.createObjectURL(file))

    const formData = new FormData();
    formData.append('profilePhoto', file);

    try{
      const response = await axios.post('/api/users/imageUpload',formData);
      console.log(response.data)
    }
    catch(error){
      console.error(error)
    }

  }



  async function handleProfilePhotoUpload() {
    const formData = new FormData();
    formData.append('profilePhoto', profilePhoto);

    try {
      const response = await axios.post('/api/users/imageUpload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Profile photo uploaded:', response.data);
      // Update state or trigger some other action upon successful upload
    } catch (error) {
      console.error('Error uploading profile photo:', error);
      // Handle error, e.g. display error message to user
    }
  }

  



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('submission')

    axios.post('/api/users', formData)
    .then(response=>{
      console.log(response.status)
    })
    .catch(error=>{
      if(error.response.status === 400){
        console.log(error.response)
      }
    })


  };

  return (

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
  {/* ...other form inputs */}
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupPage;