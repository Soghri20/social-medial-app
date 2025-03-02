import React, { useEffect, useState } from 'react'
import { CgMenuRightAlt } from "react-icons/cg";
import { TfiClose } from "react-icons/tfi";
import { Link, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { TiTabsOutline } from "react-icons/ti";
import PostSearch from '../components/PostSearch';
import Posts from '../components/Posts';
import ViewLikes from '../components/ViewLikes';
import WritaPosts from '../components/WritePosts';



const HomePage = () => {
    const [activeTab, setActiveTab] = useState("view");
    const [search,setSearch]=useState('')
    const [isSearching,setIsSearching]=useState(true)
   
    const handleSearchSubmit = (query) => {
      console.log('home',query)
    };

    
  return (
   <div className='w-full max-w-xl px-4 flex-col mx-auto'>
     <div className="flex border shadow-md rounded-md p-1 border-gray-300 mt-10">
        <button
          onClick={() => setActiveTab("view")}
          className={`flex-1 py-2 text-center ${
            activeTab === "view"
              ? "border-2 rounded-md bg-gray-800 text-white font-semibold"
              : "text-gray-500"
          }`}
        >
          View Post
        </button>
        <button
          onClick={() => setActiveTab("write")}
          className={`flex-1 py-2 text-center ${
            activeTab === "write"
              ? "border-b-2 rounded-md bg-gray-800 text-white font-semibold"
              : "text-gray-500"
          }`}
        >
          Write Post
        </button>
      </div>
      <div className="p-4">
        {activeTab === "view" && (
          <div>
            <h2 className="text-lg font-semibold">View Posts</h2>
            <PostSearch onSearchSubmit={handleSearchSubmit} isSearching={isSearching} />
            <Posts />
          </div>
        )}
        {activeTab === "write" && (
          <div>
            <WritaPosts />
          </div>
        )}
        </div>

   </div>
  )
}

export default HomePage
