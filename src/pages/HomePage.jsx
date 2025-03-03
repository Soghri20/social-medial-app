import React, { useEffect, useState } from 'react'
import { CgMenuRightAlt } from "react-icons/cg";
import { TfiClose } from "react-icons/tfi";
import { data, Link, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { TiTabsOutline } from "react-icons/ti";
import PostSearch from '../components/PostSearch';
import Posts from '../components/Posts';
import ViewLikes from '../components/ViewLikes';
import WritaPosts from '../components/WritePosts';
import useAuthStatus from '../hooks/useAuthStatus';
import { supabase } from '../utils/supabase';


const useBottomDetection = (callback) => {
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        callback(); // Appelle la fonction lorsque le bas est atteint
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback]);
}; 
const HomePage = () => {

    const [activeTab, setActiveTab] = useState("view");
    const [search,setSearch]=useState('')
    const [isSearching,setIsSearching]=useState(false)
    const {usering,loading}=useAuthStatus()
    const [posts, setPosts] = useState(null);
    const [likedPosts, setLikedPosts] = useState([]);
    const [userId, setUserId] = useState(''); 
    const [loader,setLoader]=useState(false)
    const [numberOfLikes,setNumberOfLikes]=useState(0)
    const [lastFetched,setLastFetched]=useState(null)
    const [query,setQuery]=useState('')

    
   
    
    

    const handleSearchSubmit = async (e) => {
      setIsSearching(true)
      setQuery(e.target.value)
      try{
        if(search===''){
         getAllPosts()
        }else if(search){
          let { data: posts, error } = await supabase.from('posts').select('*')
          .ilike("title", `%${query}%`);
          setPosts(posts)
        }  
      }catch(error){
        console.los(error)
      }finally{
        setIsSearching(false)
      }
    };

   
    const getLikedPosts = async (userId) => {
      const { data, error } = await supabase
        .from('likes')
        .select('*')
        .eq('user_id', userId);
      if (error) {
        console.error('Erreur lors de la récupération des posts aimés:', error);
      } else {
        const likes =data.map(like => like.post_id)
        setLikedPosts(likes)
      }
        
    };
    // const getAllPosts = async () => {
     
    //   let query = supabase.from("posts").select("*").order("created_at", { ascending: false }).limit(5);

    //   if (query) {
        
    //     query = query.ilike("title", `%${search}%`); // Case-insensitive search
    //   }
  
    //   const { data, error } = await query;
  
    //   if (error) {
    //     console.error('Erreur lors de la récupération des posts:', error);
    //   } else {
    //     setPosts(data);
    //     const lastOne= data.length-1
    //     setLastFetched(lastOne)
    //   }
    // };




    const getAllPosts = async (searchQuery = "") => {
      setLoader(true);
  
      let query = supabase.from("posts").select("*").order("created_at", { ascending: false }).limit(5);
  
      if (searchQuery.trim()) {
        query = query.ilike("title", `%${searchQuery}%`); // Case-insensitive search
      }
  
      const { data, error } = await query;
  
      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data);
        setPosts(data);
           const lastOne= data.length-1
            setLastFetched(lastOne)
       
      }
      setLoader(false);
    };
    const fetchingMore = async () =>{
      if (loader) return; // Prevent multiple requests
    
    try {
      const start = lastFetched + 1;
      const end = start + 2; // Fetch 3 more listings
      
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false }) // Keep newest first
        .range(start, end); // Fetch next set of listings
  
      if (error) throw error;
  
      if (data && data.length > 0) {
        setPosts((prevListings) => [...prevListings, ...data]); // Append new data
        setLastFetched(end); // Update last fetched index
      }
  
    } catch (error) {
      console.error("Error fetching more listings:", error);
    } finally {
      setLoader(false);
    }
  
    }
    useBottomDetection(() => {
      fetchingMore()
    });

    
  
      useEffect(() => {
        setLoader(true)

        if(!loading){
          // Récupérer l'ID de l'utilisateur (par exemple via Supabase Auth)
          const userId = usering?.id;  // Remplacez par l'ID de l'utilisateur authentifié
          setUserId(userId);
        }
        // Récupérer les posts et les posts aimés par l'utilisateur
        getAllPosts(query);
        if (userId) {
        // getLikedPosts(userId);  // Utilisation de await ici
        
        }
        setLoader(false)
        
        
       
      }, [usering,query]);
      useEffect(() => {
        const subscription = supabase
          .channel('posts')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'posts' },
            (payload) => {
              
              if (payload.eventType === 'INSERT') {
                setPosts((prevPosts) => [payload.new, ...prevPosts]); // Add new post
              } else if (payload.eventType === 'UPDATE') {
                setPosts((prevPosts) =>
                  prevPosts.map((post) =>
                    post.id === payload.new.id ? payload.new : post
                  )
                );
              } else if (payload.eventType === 'DELETE') {
                setPosts((prevPosts) =>
                  prevPosts.filter((post) => post.id !== payload.old.id)
                );
              }
            }
          )
          .subscribe();
    
        return () => {
          supabase.removeChannel(subscription); // Cleanup on unmount
        };
      }, []);


  if(loader) return 'loading ...'
    
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
         
            <div className='flex justify-between items-center my-3 '>
               <h2 className='font-heading md:text-xl font-semibold w-7/12'>{query ? `Result for "${query}" ` :'All Posts'}</h2>
                     <div className='w-1/12 flex justify-center'>  
                       {isSearching && <img src={loader} />}
                     </div>
                     <div  className="w-4/12 flex">
                       <input type='text' name='query' className='border outline-none shadow-sm border-gray-100 px-2 py-0.5 rounded-md' value={query} onChange={(e)=>setQuery(e.target.value)} placeholder='Search posts...' />
                     </div>
            </div>
            {(posts !==null  && likedPosts !==null) ? <Posts posts={posts}  /> : <h1>loading</h1>}

          </div>
        )}
        {activeTab === "write" && (
          <div>
            <WritaPosts usering={usering} />
          </div>
        )}
        </div>

   </div>
  )
}

export default HomePage
