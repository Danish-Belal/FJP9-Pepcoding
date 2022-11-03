import React, { useId, useState } from 'react'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button';
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import {v4 as uuidv4} from 'uuid';
function Comment({userData,postData}) {
    console.log("in comment.js",postData);
    console.log("in comment.js 123",userData);
    const [comment,setComment]=useState('');
    const handleComment=async ()=>{
        let uid=uuidv4();
        const obj={
            text:comment,
            userDP:userData.profilePhoto,
            userName:userData.fullName,
            commentId:uid,
            postId:postData.postId
        }
        await setDoc(doc(db,'comments',uid),obj);
        await updateDoc(doc(db,'posts',postData.postId),{
            comments:arrayUnion(uid)
        });
        setComment('');
    }
    return (
        <div style={{ width: '100%' }}>
            <TextField id="outlined-basic" label="Add Comment" variant="outlined" value={comment} onChange={(e)=>setComment(e.target.value)} sx={{width:'70%'}}/>
            <Button variant='contained' onClick={handleComment}>Post</Button>
        </div>
    )
}

export default Comment