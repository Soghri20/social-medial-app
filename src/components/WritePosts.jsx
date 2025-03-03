import React, { useState } from "react";
import { supabase } from "../utils/supabase"; // Ensure correct import path

const WritaPosts = ({  usering }) => {
  const [postContent, setPostContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  const handlePostSubmit = async () => {
    if (!postContent.trim()) {
      alert("Post content cannot be empty!");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("posts")
        .insert([
          {
            title: postContent,
            user_id: usering?.id, // Ensure user ID is passed correctly
          
          },
        ])
        .select();

      if (error) throw error;

      

      setPostContent(""); // Clear input after success
    } catch (error) {
      console.error("Error submitting post:", error);
    } finally {
      setLoading(false);
    }
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
        className="w-full py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Posting..." : "Submit Post"}
      </button>
    </div>
  );
};

export default WritaPosts;
