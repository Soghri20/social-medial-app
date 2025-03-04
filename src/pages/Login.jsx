import React from 'react'
import { Link } from 'react-router'
import { FcGoogle } from "react-icons/fc";
import { supabase } from '../utils/supabase';


const Login = () => {
  
    const handleGoogleSignIn = async () => {
      const {user, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: "https://sm-ashy.vercel.app//home-page", // Optional: You can specify a redirect URL here.
        },
      });
      console.log(user)

  
      if (error) console.error('Erreur de connexion :', error.message);
    };
  
  return (
    <section className='w-full bg-white min-h-screen flex flex-col'>
    <nav className='flex items-center space-x-2 p-4'>
       SM clone
    </nav>
    <div className='container mt-24 flex flex-col justify-center items-center px-4 md:px-6 flex-1'>
      <div className='flex flex-col items-center space-y-4 text-center p-4 md:w-1/2'>
        <h1 className='text-3xl md:text-5xl font-bold tracking-tighter'>
         Login in using  {' '}
          <span className=" px-1 font-extrabold bg-gradient-to-tr from-orange-700 via-blue-500 to-green-600 bg-clip-text text-transparent text-center bg-[length:200%] animate-gradient">
            Google
          </span>

         {' '} and discover more
        </h1>
        <p>
         Our posts and commtents are powered by Markdown
        </p>
     
      </div>
      <div className='relative group overflow-hidden rounded-lg md:w-1/2 shadow-md border-gray-100 border-2 mt-2'>
      <div className="p-1 bg-gradient-to-tr from-orange-700 via-blue-500 to-green-600 bg-[length:200%] animate-gradient rounded-md">
        <button onClick={handleGoogleSignIn} className="bg-black flex justify-center shadow-lg rounded-md px-3 py-1 shadow-md flex items-center  text-white font-thin text-sm w-full">
        <FcGoogle className='mr-2' />
         <p className='text-lg' >Google</p>
       </button>
      </div>

      </div>
    </div>
   </section>
  )
}

export default Login
