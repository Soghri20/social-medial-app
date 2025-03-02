import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";


const ViewLikes = ({likes,likedByUser}) => {
  return (
   <Link className='flex justify-center items-center group'>
    {likedByUser ?  <FcLikePlaceholder />:<FcLike />}
    <span className={`ml-2 text-sm group-hover:text-blue-400 ${likedByUser ? 'text-blue-700':'text-gray-500'}`}>{likes}</span>
   </Link>
  )
}

export default ViewLikes
