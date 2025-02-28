import React from 'react'
import { Link } from 'react-router'
import video from '../assets/videos/demo.mp4'

const Home = () => {
  return (
    <section className='w-full bg-white min-h-screen flex flex-col'>
    <nav className='flex items-center space-x-2 p-4'>
      SM clone
    </nav>
    <div className='container md:flex justify-center items-center px-4 md:px-6 flex-1'>
      <div className='flex flex-col items-center space-y-4 text-center p-4 md:w-1/2'>
        <h1 className='text-3xl md:text-5xl font-bold tracking-tighter'>
          A {' '}
          <span className="font-extrabold bg-gradient-to-tr from-orange-700 via-blue-500 to-green-600 bg-clip-text text-transparent text-center bg-[length:200%] animate-gradient">
             Community-Driven
          </span>

         {' '}Minimalist Social Platform for Friends
        </h1>
        <p>
          Protectedby {' '}
          <span className='text-blue-700 font-bold mt-2'>React  </span>and {' '}
          <span className='text-green-600 font-bold mt-2'>Supabase</span>
        </p>
        <button className=' bg-black rounded-md px-3 py-1 shadow-md text-white font-thin text-sm'>
          <Link to='/login'>Join our Community</Link>
        </button>
      </div>
      <div className='relative group overflow-hidden rounded-lg md:w-1/2 shadow-md border-gray-100 border-2 mt-2'>
        <div className='p-1'>
          <video className='h-full w-full rounded-lg' src={video}  autoPlay loop muted>
          </video>
        </div>
      </div>
    </div>
   </section>
  )
}

export default Home
