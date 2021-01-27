import React, { useState } from "react";
import "./blogMessage.css";
import { Button, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import ForumIcon from "@material-ui/icons/Forum";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
function BlogMessage({
  body,
  id,
  isPublic = true,
  handleChange,
  isMe,
  handleSubmit,
  handleShare,
  handleLike,
  handleComment,
  count=0
}) {
  const [showComment, setShowComment] = useState(false);
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState("");

  return isPublic ? (
    <div className="blogMessage">
      <div className="blogMessage__top">
        <p>{body}</p>
      </div>
      <div className="blogMessage__bottom">
        <IconButton onClick={() => handleLike(id, like, setLike)}>
          {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        {sessionStorage.getItem("user") === "true" && (
          <IconButton onClick={() => handleShare(id)}>
            <ShareIcon />
          </IconButton>
        )}
        <IconButton
          onClick={() => handleComment(id, showComment, setShowComment)}
        >
          <ForumIcon /><small style={{fontSize:"15px"}} >{count} comments </small>
        </IconButton>
      </div>
      {showComment && (
        <div className="blogMessage__bottonComment">
          <input
            onChange={(e) => handleChange(e, setComment)}
            type="text"
            value={comment}
            placeholder="Enter your Comment..."
          />
          <Button
            onClick={() => handleSubmit(id, comment, setComment)}
            variant="outlined"
          >
            <SendIcon />
          </Button>
        </div>
      )}
    </div>
  ) : isMe ? (
    <div className="blogMessage">
      <div className="blogMessage__top">
        <p>{body}</p>
      </div>
      <div className="blogMessage__bottom">
        <IconButton onClick={() => handleLike(id, like, setLike)}>
          {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        {sessionStorage.getItem("user") === "true" && (
          <IconButton onClick={() => handleShare(id)}>
            <ShareIcon />
          </IconButton>
        )}
        <IconButton
          onClick={() => handleComment(id, showComment, setShowComment)}
        >
          <ForumIcon /><small style={{fontSize:"15px"}} >{count} comments</small>
        </IconButton>
      </div>
      {showComment && (
        <div className="blogMessage__bottonComment">
          <input
            onChange={(e) => handleChange(e, setComment)}
            type="text"
            value={comment}
            placeholder="Enter your Comment..."
          />
          <Button
            onClick={() => handleSubmit(id, comment, setComment)}
            variant="outlined"
          >
            <SendIcon />
          </Button>
        </div>
      )}
    </div>
  ) : null;
}

export default BlogMessage;
