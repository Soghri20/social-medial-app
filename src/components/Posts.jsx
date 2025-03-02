import React from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import ViewLikes from './ViewLikes'
import Comments from './Comments'

const Posts = () => {
  return (
    <div className='rounded-xl shadow-md overflow-hidden min-h-[9em]'>
        <div className='flex'>
            <div className='p-4 md:p-8 w-full '>
                <div className='flex items-center justify-start space-x-3'>
                    <img className='rounded-full'
                     alt='profile' height='40'
                      width='40'
                      src={"https://yt3.ggpht.com/yti/ANjgQV_rkIYfv8LTJvsYOH0KO1yTx5-LoXmj1Nz6asFBPT4fhcA=s88-c-k-c0x00ffffff-no-rj"} 
                      style={{aspectRatio:'40/40',objectFit:'cover'}} />
                      <div>
                        <div className='txt-sm md:text-lg font-semibold'>
                            <Link to={`/profile/otmane`}>@othmaneSg</Link>
                        </div>
                        <div className='text-xs text-start md:text-md text-gray-400'>
                            <Link to={`/profile/otmane`}>othmane soghri</Link>
                        </div>
                      </div>
                    
                </div>
                <div className='mt-4 text-gray-500 text-sm prose'>
                  <p className='text-3xl font-bold text-gray-900'>hello from hardcoded shiiit</p>
                </div>
                <div className='flex w-full  mt-6 justify-between items-center'>
                    <div className='flex space-x-4 text-gray-400'>
                    <ViewLikes likes={69} likedByUser={true} />
                    <Comments comments={55}/>
                    </div>
                    <div className='text-gray-400 text-sm'>12,NOV,2025</div>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Posts
