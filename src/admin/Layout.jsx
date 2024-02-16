import React from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Layout = () => {

    const { auth } = useSelector(state => state.admin)

    return auth
        ? <>
            <Sidebar />
            {/* <Navbar /> */}
            <div className='ml-48'>
                <Outlet />
            </div>
        </>
        : <Navigate to="/admin-login" />
}

export default Layout