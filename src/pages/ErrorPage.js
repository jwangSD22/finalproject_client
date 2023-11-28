import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const [time, setTime] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    const decreaseTime = () => {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    };
    decreaseTime();
  }, [time]);

  //when counter hits 0 -- redirect to home
  useEffect(() => {
    if (time === 0) {
      navigate("/home");
    }
  }, [time]);

  return (
    <div>
      <h3>User does not exist - redirecting home in {time} seconds...</h3>
    </div>
  );
}

export default ErrorPage;
