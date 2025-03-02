import React from 'react'
import { FaRegComment } from "react-icons/fa";

const Comments = ({comments,readOnly,pathname}) => {
  return (
    <>
      <div className='flex justify-center items-center group'>
        <FaRegComment />
        <span className='ml-2 text-sm text-gray-500'>{comments}</span></div>
    </>
  )
}

export default Comments
