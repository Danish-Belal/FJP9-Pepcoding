import { Avatar } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { CircularProgress } from '@mui/material';
function DisplayComments({ postData }) {

    const [allComments, setAllComments] = useState(null);
    useEffect(() => {
        let tempArr = [];
        postData.comments.map(async (commentId) => {
            const docSnap = await getDoc(doc(db, 'comments', commentId));
            tempArr.push(docSnap.data());
        });
        setAllComments(tempArr);
        console.log('unicorn',tempArr);
    }, [postData]);

    return (
        <div>
            {
                allComments == null ? (<CircularProgress />) :
                    (
                        <>
                            {
                                allComments.map((commentObj) => {
                                    console.log("printing comments", commentObj);
                                    return (
                                        <div>
                                            <Avatar src={commentObj.userDP} />
                                            <p><span>{commentObj.userName}</span>{commentObj.text}</p>
                                        </div>
                                    )
                                })
                            }
                        </>
                    )
            }
        </div>
    )
}

export default DisplayComments