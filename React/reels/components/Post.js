import { Avatar, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'
import AddCommentIcon from '@mui/icons-material/AddComment';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Comment from './Comment';
function Post({ postData, userData }) {
  console.log("yolo", postData);
  const [like, setLike] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (postData.likes.includes(userData.uid)) {
      setLike(true);
    }
    else setLike(false);
  }, [postData])

  const handleLike = async () => {
    if (like) {
      await updateDoc(doc(db, "posts", postData.postId), {
        likes: arrayRemove(userData.uid)
      });
    }
    else {
      await updateDoc(doc(db, "posts", postData.postId), {
        likes: arrayUnion(userData.uid)
      });
    }
  }

  return (
    <div className="post-container">
      <video src={postData.postURL} />
      <div className="videos-info">
        <div className="avatar-container">
          <Avatar alt="Remy Sharp" src={postData.profilePhotoURL} />
          <p style={{ color: "white" }}>{postData.profileName}</p>
        </div>
        <div className="post-like" style={like ? { color: "red" } : { color: "white" }}>
          <FavoriteIcon onClick={handleLike} />
          <p style={{ color: "white" }}>{postData.likes.length}</p>
          <AddCommentIcon onClick={handleClickOpen} />
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
            maxWidth='md'
          >
            <div className='modal-container'>
              <div className='video-modal'>
                <video src={postData.postURL} />
              </div>
              <div className='comments-modal'>
                <Card className='card1'></Card>
                <Card className='card2'>
                  <Typography sx={{display:"flex"}}>
                    {postData.likes.length==0?'Be the first one to like this post':`Liked by ${postData.likes.length} users`}
                  </Typography>
                  <div className='post-like2'>
                    <FavoriteIcon style={like?{color:"red"}:{color:"black"}} onClick={handleLike}/>
                    <Comment userData={userData} postData={postData}/>
                  </div>
                </Card>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default Post
