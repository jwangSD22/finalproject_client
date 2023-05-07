import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MiniCarousel from "../component/MiniCarousel";

function NewPost() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [body, setBody] = useState("");
  const [images, setImages] = useState([]);
  const [carouselURLs, setCarouselURLs] = useState([]);
  const [finalPostKeys, setFinalPostKeys] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        let response = await axios.get("/api/users/loginstatus");
        console.log(response);

        if (response.status === 200) {
          setUser(response.data.user.jwtusername);
          setIsLoggedIn(true);
          return true;
        }
      } catch (err) {
        console.log(err);
        return navigate("/");
      }
    };
    checkLogin();
  }, []);

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleImageChange = async (event) => {
    console.log(event.target.files);
    const fileArray = event.target.files;
    setImages(fileArray);
    let tempArray = [];
    for (let file of fileArray) {
      let tempURL = URL.createObjectURL(file);
      tempArray.push(tempURL);
    }

    try {
      await updateCarouselURLs(tempArray);
    } catch (err) {
      console.log(err);
    }

    console.log(carouselURLs);
  };

  const updateCarouselURLs = async (tempArray) => {
    await new Promise((resolve) => {
      setCarouselURLs(tempArray, resolve);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await uploadPhotosToServer();
    } catch (err) {
      console.log(err);
    }

    try {
      const response = await axios.post("/api/posts", {
        author: user,
        postMessage: body,
        imageKeyArray: finalPostKeys,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadPhotosToServer = async () => {
    const photoFormData = new FormData();

    for (let i = 0; i < images.length; i++) {
      photoFormData.append("files", images[i]);
    }

    try {
      const response = await axios.post(
        "/api/posts/imageupload",
        photoFormData
      );
      setFinalPostKeys(response.data.finalObjectKeys);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          {" "}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="body">Body:</label>
              <textarea
                id="body"
                name="body"
                rows="5"
                cols="30"
                value={body}
                onChange={handleBodyChange}
              />
            </div>
            <div>
              <label htmlFor="images">Images:</label>
              <input
                type="file"
                id="images"
                name="images"
                multiple
                onChange={handleImageChange}
              />
            </div>

            <button type="submit">Submit</button>
          </form>
          <button onClick={uploadPhotosToServer}>TEST UPLOAD</button>
          <div>
            {carouselURLs.length ? (
              <MiniCarousel images={carouselURLs} />
            ) : null}
          </div>
        </div>
      ) : (
        <>LOGGING IN....</>
      )}
    </div>
  );
}

export default NewPost;
