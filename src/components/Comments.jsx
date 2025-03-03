import React from 'react'
import { FaRegComment } from "react-icons/fa";
import CommentsPopup from './CommentSection';

const Comments = ({comments,onClose,openComments,showComment,userId,postId}) => {
  return (
    <>
      <div className='flex justify-center items-center group' onClick={openComments}>
        <FaRegComment />
        <span className='ml-2 text-sm text-gray-500'>{comments}</span></div>
        {showComment ? <CommentsPopup onClose={onClose} userId={userId} postId={postId} /> : null}

    </>
  )
}

export default Comments
