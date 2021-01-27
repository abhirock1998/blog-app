import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDataLayerValue } from "./data-layer";
import "./header.css";
import Post from "./Post";

function Header({ user, showDetails = false }) {
  const history = useHistory();
  const [showPost, setShowPost] = useState(false);

  const [, dispatch] = useDataLayerValue();
  const userOut = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("user-details");
    dispatch({
      type: "SET-USER",
      isUser: false,
    });
    history.replace("/");
  };

  const handlePostDisplay = () => {
    if (sessionStorage.getItem("user") === "true") {
      setShowPost(!showPost);
    } else {
      alert("For Comment & Like Please Sign In");
      history.replace("/auth");
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("user") === "true") {
      dispatch({
        type: "SET-USER",
        isUser: true,
      });
    }
  }, [dispatch]);

  return (
    <>
      <div className="header">
        <div className="header__left">
          <Link to="/">
            <h3>Blog Website</h3>
          </Link>
        </div>
        <Button onClick={handlePostDisplay} variant="outlined">
          Make a Post
        </Button>
        {showDetails ? (
          <div className="header__right">
            <p>
             
              <Button onClick={userOut} variant="outlined">
                Sign Out
              </Button>
            </p>
          </div>
        ) : null}
      </div>
      {showPost && <Post />}
    </>
  );
}

export default Header;
