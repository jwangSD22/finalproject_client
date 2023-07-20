import React, { useState } from "react";
import axios from "axios";
import config from '../../helper/config.js'
import SuccessContainer from "./SuccessContainer";

const Registration = ({ showRegistration, setShowRegistration }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDOB] = useState("");
  const [passError, setPassError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [success,setSuccess] = useState(false)

  let formData = {
    fullName: `${firstName} ${lastName}`,
    username: username,
    password: password,
    email: email,
    dateOfBirth: dob,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //handle username length restrictions
    if (username.length < 6 || username.length > 32) {
      return setUsernameError("Username must be between 6-32 characters");
    } else {
      setUsernameError(null);
    }
    //handle password and confirmpassword matching
    if (password !== confirmPassword) {
      return;
    }
    //handle password length restrictions
    if (password.length < 6 || password.length > 32) {
      return setPassError("Password must be between 6-32 characters");
    } else {
      setPassError(null);
    }

    //first check with API if user already exists in DB and post error message accordingly
    try {
      const findUser = await axios.post(`${config.backendServer}/api/user/`, {
        username: username,
        email: email,
      });
      if (findUser.data.usernameError) {
        return setUsernameError(findUser.data.usernameError);
      }
      if (findUser.data.emailError) {
        return setEmailError(findUser.data.emailError);
      } else {
        setUsernameError(null);
        setEmailError(null);
      }
    } catch (err) {
      console.log(err);
    }

    //handle registration
    try {
      axios
        .post(`${config.backendServer}/api/users`, formData)
        .then((response) => {
          if(response.data.success){
            setSuccess(true);
          };
        })
        .catch((error) => {
          if (error.response.status === 400) {
            console.log(error.response);
          }
        });
    } catch (err) {
      console.log(err);
    }

    console.log("Registration form submitted");
  };

  const handleUsernameChange = (e) => {
    if (e.target.value.length === 0) {
      setUsernameError(null);
    }
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    if (e.target.value.length === 0) {
      setEmailError(null);
    }
    setEmail(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setPassError("Passwords do not match");
    } else {
      setPassError(null);
    }
    if (e.target.value.length === 0) {
      setPassError(null);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className=" d-flex align-items-center justify-content-center">
        {success&&<SuccessContainer setShowRegistration = {setShowRegistration} />}
          <div className="registration-box bg-white">
         
            <div className="d-flex justify-content-center">
              <div className="reg-box-header d-flex flex-column">
                <h1>Register new user</h1>
                <h4 style={{ color: "gray" }}>It's quick and easy!</h4>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="username">Username</label>
                {usernameError && (
                  <div className="usernameError text-danger">
                    <em>{usernameError}</em>
                  </div>
                )}
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="email">Email</label>
                {emailError && (
                  <div className="emailError text-danger">
                    <em>{emailError}</em>
                  </div>
                )}
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <div className="d-flex justify-content-between ">
                  <label htmlFor="password">Password</label>
                  {passError && (
                    <div className="passError text-danger ">
                      <em>{passError}</em>
                    </div>
                  )}
                </div>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  id="dob"
                  value={dob}
                  onChange={(e) => setDOB(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary mb-2">
                Register
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setShowRegistration(!showRegistration);
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
