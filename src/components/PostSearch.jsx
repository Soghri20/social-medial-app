import React, { useEffect, useRef, useState } from 'react'
import loader from '../assets/loader/loader.svg'







const PostSearch = ({onSearchSubmit,isSearching}) => {

  const [query,setQuery]=useState('')
  const [fetching, setFetching] = useState(false); // Flag to track if fetch is in progress
 
  useEffect(() => {
    if(fetching) return 

    // Set a timeout to wait for 2 seconds after typing
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        onSearchSubmit(query)

      }
    }, 1000);

    // Cleanup timeout when query changes
    return () => clearTimeout(timeoutId);
  }, [query]);

    const onSubmit = async (e)=>{
        e.preventDefault()
        setFetching(true)
        if (query.trim()) {
          onSearchSubmit(query)
        }
    }
 
  return (
    <div className='flex justify-between items-center my-3 '>
      <h2 className='font-heading md:text-xl font-semibold w-7/12'>
      {query ? `Result for "${query}" ` :'All Posts'}
      </h2>
      <div className='w-1/12 flex justify-center'>  
       {isSearching && <img src={loader} />}
      </div>
      <form
     //
      className="w-4/12 flex"
      onSubmit={onSubmit}
    >
        <input type='text' name='query' className='border outline-none shadow-sm border-gray-100 px-2 py-0.5 rounded-md' value={query} onChange={(e)=>setQuery(e.target.value)} placeholder='Search posts...' />
      </form>
    </div>
  )
}

export default PostSearch
