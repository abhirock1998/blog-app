import { Button, MenuItem, Select } from "@material-ui/core";
import React, { useState } from "react";
import { ClientToServerBridge } from "./fetch";
import "./post.css";
import { HttpValidation } from "./validation";

function Post() {
  const [isPublic, setPublic] = useState("0");
  const [post, setPost] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      (post["body"] !== "" && post["body"] !== undefined) ||
      (HttpValidation(post["attach"]) && post["attach"] !== undefined)
    ) {
      ClientToServerBridge({
        endpoint: "/publish",
        body: {
          user: JSON.parse(sessionStorage.getItem("user-details")),
          body: post["body"],
          attach: post["attach"],
          public: isPublic === "0" ? true : false,
        },
      });
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setPost((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSelect = (e) => {
    const { value } = e.target;
    setPublic(value !== "0" ? false : true);
  };

  return (
    <div className="post">
      <div className="post__text">
        <textarea
          onChange={handleChange}
          name="body"
          placeholder="type your post here"
        ></textarea>
        <input
          onChange={handleChange}
          name="attach"
          type="text"
          placeholder="https valid url"
        />
      </div>
      <Select
        name="public"
        onChange={handleSelect}
        value={isPublic}
        variant="outlined"
      >
        <MenuItem value="0">True</MenuItem>
        <MenuItem value="1">False</MenuItem>
      </Select>
      <Button onClick={handleSubmit} variant="outlined">
        Submit
      </Button>
    </div>
  );
}

export default Post;
