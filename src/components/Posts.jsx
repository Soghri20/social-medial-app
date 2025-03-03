import React from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import ViewLikes from './ViewLikes'
import Comments from './Comments'
import Post from './Post'

const Posts = ({posts, numberOfLikes,toggleLike}) => {
 
  return (
    <>
     {posts?.map((post)=>{
      return <Post post={post} toggleLike={toggleLike}  numberOfLikes={ numberOfLikes} />
     })}
    </>
  ) 
}

export default Posts
