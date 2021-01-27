import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./blog.css";
import BlogMessage from "./BlogMessage";
import {
  ClientToServerGetRequest,
  ClientToServerBridge,
  GenerateLinkForPost,
} from "./fetch";
function Blog() {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      let postsCollection = await ClientToServerGetRequest({
        endpoint: "/posts",
      });
      if (postsCollection?.length > 0) {
        setPosts(postsCollection?.map((post) => post));
      }
    };
    fetchPost();
  }, []);

  const handleComment = (id, value, setValue) => {
    if (sessionStorage.getItem("user") === "true") {
      setValue(!value);
    } else {
      alert("For Comment & Like Please Sign In");
      history.push("/auth");
    }
  };

  const handleLike = (id, value, setValue) => {
    if (sessionStorage.getItem("user") === "true") {
      setValue(!value);
    } else {
      alert("For Comment & Like Please Sign In");
      history.push("/auth");
    }
  };

  const handleSubmit = async (id, value, setValue) => {
    if (value !== "") {
      let user = JSON.parse(sessionStorage.getItem("user-details"));
      await ClientToServerBridge({
        endpoint: "/addComment",
        body: { comment: value, id: id, user: user },
      });
      setValue("");
    }
  };
  const handleChange = (e, setValue) => {
    setValue(e.target.value);
  };
  const handleShare = (id) => {
    let link = GenerateLinkForPost({ id: id });
    alert(`for Share Post --->>>> ${link}`);
  };

  return (
    <div className="blog">
      {posts?.map((post) => (
        <BlogMessage
          id={post.uuid}
          handleComment={handleComment}
          key={post.uuid}
          isPublic={post.public}
          handleChange={handleChange}
          body={post.body}
          isMe={
            sessionStorage.getItem("user") === "true" &&
            JSON.parse(sessionStorage.getItem("user-details"))["email"] ===
              post?.user?.email
              ? true
              : false
          }
          handleShare={handleShare}
          handleSubmit={handleSubmit}
          handleLike={handleLike}
          count={post?.comments?.length}
        />
      ))}
    </div>
  );
}

export default Blog;
