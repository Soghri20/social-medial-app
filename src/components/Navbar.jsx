import React, { useState } from 'react'
import { CgMenuRightAlt } from 'react-icons/cg'
import { TfiClose } from 'react-icons/tfi'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabase'
import useAuthStatus from '../hooks/useAuthStatus'

const Navbar = () => {
        const [isOpen,setIsOpen]=useState(false)
        const navigate=useNavigate()
        const {usering}=useAuthStatus()
        console.log(usering)
        const signOut = async () => {
          const { error } = await supabase.auth.signOut();
        
          if (error) {
            console.error('Erreur lors de la déconnexion:', error);
          } else {
            console.log('Utilisateur déconnecté');
            // Optionnel: Rediriger vers la page d'accueil ou une autre page après déconnexion
              navigate('/login')
          }
        };
    
  return (
   
      <section>
        <nav className='sticky top-2 z-50 flex w-full items-center justify-between p-4 border-b border-zinc-200 flex-wrap md:flex-nowrap'>
            <p > SM clone </p>
            <button onClick={()=>setIsOpen(!isOpen)} className='bg-white md:hidden'>
                {isOpen ?    <TfiClose />:<CgMenuRightAlt />}
            </button>
            <div className={`flex md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 ${isOpen ? 'flex-col order-last w-full md:w-auto':'hidden md:flex'}`}>
             <Link className='font-semibold' to={`/profile/${usering?.id}`}>
                @{usering?.email}
             </Link>   
             <img className="rounded-full" style={{aspectRatio:'35/35',objectFit:'cover'}} width='35' height='35' src={usering?.identities[0]?.identity_data?.avatar_url} alt="Profile" />
            <button onClick={signOut} className='bg-black flex justify-center shadow-lg rounded-md px-3 py-1 shadow-md flex items-center  text-white font-thin text-sm w-full'>Log out</button>
            </div>
        </nav>
    </section>
    
  )
}

export default Navbar
