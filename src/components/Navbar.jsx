import React, { useState } from 'react'
import { CgMenuRightAlt } from 'react-icons/cg'
import { TfiClose } from 'react-icons/tfi'
import { Link } from 'react-router-dom'

const Navbar = () => {
        const [isOpen,setIsOpen]=useState(false)
    
  return (
   
      <section>
        <nav className='sticky top-2 z-50 flex w-full items-center justify-between p-4 border-b border-zinc-200 flex-wrap md:flex-nowrap'>
            <p > SM clone </p>
            <button onClick={()=>setIsOpen(!isOpen)} className='bg-white md:hidden'>
                {isOpen ?    <TfiClose />:<CgMenuRightAlt />}
            </button>
            <div className={`flex md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 ${isOpen ? 'flex-col order-last w-full md:w-auto':'hidden md:flex'}`}>
             <Link className='font-semibold'>
                @othmaneSg
             </Link>   
             <img className="rounded-full" style={{aspectRatio:'35/35',objectFit:'cover'}} width='35' height='35' src={"https://yt3.ggpht.com/yti/ANjgQV_rkIYfv8LTJvsYOH0KO1yTx5-LoXmj1Nz6asFBPT4fhcA=s88-c-k-c0x00ffffff-no-rj"} alt="Profile" />
            <button className='bg-black flex justify-center shadow-lg rounded-md px-3 py-1 shadow-md flex items-center  text-white font-thin text-sm w-full'>Log out</button>
            </div>
        </nav>
    </section>
    
  )
}

export default Navbar
