import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import {db} from '../firebase'
function Post({postData, userData}) {

  const[like,setLike]=useState(false);

  useEffect(()=>{
    if(postData.likes.includes(userData.uid)){
      setLike(true);
    }
    else setLike(false);
  },[postData])

  const handleLike=async()=>{
    if(like){
      await updateDoc(doc(db, "posts", postData.postId), {
        likes:arrayRemove(userData.uid)
      });
    }
    else{
      await updateDoc(doc(db, "posts", postData.postId), {
        likes:arrayUnion(userData.uid)
      });
    }
  }

  return (
    <div className="post-container">
          <video src={postData.postURL} />
      <div className="videos-info">
        <div className="avatar-container">
                  <Avatar alt="Remy Sharp" src={postData.profilePhotoURL} />
                  <p style={{color:"white"}}>{ postData.profileName}</p>
        </div>
        <div className="post-like" style={like ? {color:"red"}:{color:"white"}}>
          <FavoriteIcon onClick={handleLike}/>
                  <p style={{color:"white"}}>{ postData.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Post
