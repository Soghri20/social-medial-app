import React, { useState } from 'react'

const WritaPosts = () => {


    const [postContent, setPostContent] = useState('');
  
    const handlePostChange = (e) => {
      setPostContent(e.target.value);
    };
  
    const handlePostSubmit = () => {
      // Here you can handle submitting the post, for example sending it to an API
      console.log('Post submitted:', postContent);
    };
  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Write a Post</h2>
      
      <textarea
        value={postContent}
        onChange={handlePostChange}
        placeholder="Write your post here..."
        className="w-full h-40 p-2 border-2 border-gray-300 rounded-md resize-none mb-4"
      />

      <button
        onClick={handlePostSubmit}
        className="w-full py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition"
      >
        Submit Post
      </button>
    </div>
  )
}

export default WritaPosts
