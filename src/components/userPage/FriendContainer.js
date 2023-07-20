import React from "react";
import "./friendcontainer.css";
import GenerateAvatar from "../../helper/GenerateAvatar";
import { useNavigate } from "react-router-dom";
import FriendStatus from "./FriendStatus";
//need to add logic to calculate mutual friends

//state of myFriends will be a dictionary to calculate mutual friends.

// need to add logic to generate the status button that shows up

// map thru each friend, and need to do work on each item,
// grab full name
// create reference link to their profile
// calculate mutual friends by iterating thru the item's friend array x-reffing the dictionary
// figure out the status of the relationship of my friends to their friends
// generate their photo -- the URL link will be under friends."friendPhotoURL"

function FriendContainer({ friends, myFriends,myData}) {
  const navigate = useNavigate()

  const calculateMutual = (friendInMap) => {
    //refers back to myFriends hashtable

    let counter = 0;
    if (friendInMap.friends.length > 0) {
      for (let i = 0; i < friendInMap.friends.length; i++) {
        let id = friendInMap.friends[i].friend;

        if (myFriends.hasOwnProperty(id)) {
          counter += 1;
        }
      }
    }

    return counter;
  };

  const handleNav = (username) => {
    navigate(`/user/${username}`);window.location.reload()
  }


  return (
    <div className="user-page-friend-container container bg-white  border shadow-sm ">
      <div className="header mt-3">
        <h3>ALL FRIENDS</h3>
      </div>

      <div className="row ">
        {friends.map((item) => (
          <div
            key={item._id}
            className="col-12 col-lg-6 container my-sm-3 my-1 "
          >
            <div className="bg-light border">
              <div className="row">
                <div className="responsive-pfp-img-cont col-2 my-2" onClick={()=>handleNav(item.username)}>
                  {/* this component uses classname -> responsive-pfp-img */}
                  <GenerateAvatar
                    cssClassIdentifier={"responsive-pfp-img mx-2"}
                    url={item.friendPhotoURL}
                  />
                </div>
                <div className="col-6 d-flex flex-column justify-content-center">
                  <div className="friend-container-username" onClick={()=>handleNav(item.username)}>{item.fullName}</div>
                  <div>{calculateMutual(item)} mutual friends</div>

                  {/* this is in a map, need to dynamically generate this when it is created , so use effect doens't make sense here. */}
                </div>
                <div className="status col-4 d-none d-md-flex align-items-center justify-content-end px-4">
                  <FriendStatus friend={item} myFriends={myFriends} myData={myData}/>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FriendContainer;
