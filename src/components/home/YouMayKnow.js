import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./home.css";
import GenerateAvatar from "../../helper/GenerateAvatar";

function YouMayKnow({ data, friends, username }) {
  const [nonFriends, setNonFriends] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    //friends is represented as an array - no friends, is empty array
    if (data && friends && username) {
      let hash = new Set();
      //create hash table to make filtering more efficient
      for (let friend of friends) {
        hash.add(friend.username);
      }
      //add self to be filtered out
      hash.add(username);

      //get first 10 results to display on main page
      let friendsFiltered = data
        .filter((user) => !hash.has(user.username))
        .slice(0, 10);
      setNonFriends(friendsFiltered);
    }
  }, [data, friends, username]);

  const linkHandler = (username) => {
    navigate(`/user/${username}`);
  };

  //generate each line
  let nonFriendsList =
    nonFriends &&
    nonFriends.map((user) => (
      <div
        key={user._id}
        className=" d-flex"
        onClick={() => {
          linkHandler(user.username);
        }}
      >
        <div className="ymk-listItem box-styling d-flex my-1">
          <GenerateAvatar url={user.profilePhotoURL} />
          <div className="mx-2">{user.fullName}</div>
        </div>
      </div>
    ));

  return (
    <div className="ymk d-none d-sm-flex flex-column mt-4">
      <div> People you may know</div>
      <div>{nonFriendsList}</div>
    </div>
  );
}

export default YouMayKnow;
