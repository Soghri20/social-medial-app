import React from 'react'
import { Outlet, useNavigate } from 'react-router'
import { Navigate } from 'react-router-dom'
import useAuthStatus from '../hooks/useAuthStatus'
import loader from '../assets/loader/loader.svg'
const PrivateRoute = () => {
    const {usering,loading} = useAuthStatus()
    const navigate=useNavigate()
    if (loading) {
        return <img src={loader} className='w-full h-full bg-gray-800 opacity-5' />
      }

  return usering!==null? <Outlet /> : navigate('/login')
}

export default PrivateRoute
