import React, {useState, useRef} from 'react'
import {Typography, TextField, Button, Divider} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import useStyles from './styles'

import {commentPost} from '../../actions/posts'




const CommentSection = ({post}) =>{

    const classes = useStyles()
    const dispatch = useDispatch()
    const commentsRef = useRef()

    const user = JSON.parse(localStorage.getItem('profile'))
    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState('')

    const handleClick= async () =>{
        const finalComment = `${user.result.name}: ${comment}`
        //we can set it to a variable bc in the action we are returning data.comments
        const newComments = await dispatch(commentPost(finalComment, post._id))
        setComments(newComments)
        setComment('')

        commentsRef.current.scrollIntoView({behavior:'smooth'})
    }
  
    return (
        // <div style={{ padding: 5 }} className="App">
        // <h1>Comments</h1>
        // {comments.map((c, index) =>(
        //     <div key={index}>
        //     <Grid container wrap="nowrap" spacing={2}>
        //         <Grid item xs zeroMinWidth>
        //                 <div>
        //                     <h4 style={{ margin: 0, textAlign: "left" }}>{c.split(': ')[0]}</h4>
        //                     <p style={{ textAlign: "left" }}>
        //                     {c.split(":")[1]}{" "}
        //                     </p>
        //                 </div> 
        //         </Grid>
        //     </Grid>
        //     <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
        //     <div ref={commentsRef}/>
        //   </div>
        //   ))}
        // {user?.result?.name && (
        //             <div style={{width: '40%'}}>
        //                 <Typography gutterBottom variant="h6">Write a Comment</Typography>
        //                 <TextField fullWidth minRows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)}/>
        //                 <Button style={{marginTop: '10px'}} fullWidth disabled={!comment} variant="contained" color="primary" onClick={handleClick}>Comment</Button>
        //             </div>
        //         )}
        // </div>
        <div>
            <Typography gutterBottom variant="h6">Comments</Typography>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    {comments.map((c, index) =>(
                        <div>
                        <Typography key={index} gutterBottom variant="subtitle1">
                            <strong>{c.split(': ')[0]}</strong>
                            <br/>
                            {c.split(":")[1]}
                        </Typography>
                        <Divider style={{margin: '20px 0'}}/>
                        </div>
                    ))}
                    <div ref={commentsRef}/>
                </div>
            </div>
            <br/>
            {user?.result?.name && (
            <div style={{width: '100%'}}>
                <TextField fullWidth minRows={4} variant="outlined" label="Write a Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)}/>
                <Button style={{marginTop: '10px'}} fullWidth disabled={!comment} variant="contained" color="primary" onClick={handleClick}>Comment</Button>
            </div>
        )}
        </div>
        
    )
}

export default CommentSection