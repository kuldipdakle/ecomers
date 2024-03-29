import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { publicRoutes } from '../public/publicRoute'
import { useDispatch, useSelector } from 'react-redux'

import { invalidate } from '../redux/slices/publicSlice'
import { toast } from 'react-toastify'
import { logout } from '../redux/slices/userSlice'
import { getCartItems } from '../redux/actions/userActions'

const Navbar = () => {
    const dispatch = useDispatch()

    // const { cartAdded } = useSelector(state => state.public)
    const { cart, auth, cartAdded, orderPlaced } = useSelector(state => state.user)
    useEffect(() => {
        dispatch(getCartItems())
    }, [])
    useEffect(() => {
        if (cartAdded) {
            dispatch(getCartItems())
            // toast.success("Product Add Success")
            dispatch(invalidate())
        }
    }, [cartAdded, orderPlaced])
    return <>
        <div className="navbar bg-base-100 gap-8">
            <div className="">
                <a className="btn btn-ghost normal-case text-xl">Amazon Pro+</a>
            </div>
            <div className=" gap-4 w-full  ">
                <div className="form-control  w-full">
                    <input type="text" placeholder="Search" className="input input-bordered  " />
                </div>

                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            <span className="badge badge-sm indicator-item">
                                {cart && cart.length}
                            </span>
                        </div>
                    </label>
                    <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                        <div className="card-body">
                            <span className="font-bold text-lg">{cart && cart.length} Items</span>
                            <span className="text-info">Subtotal: $ <span className='font-bold'>{cart && cart.reduce((sum, item) => sum + (item.qty * item.price), 0)}</span></span>
                            <div className="card-actions">
                                <Link to="/cart" className="btn btn-primary btn-block">View cart</Link>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    auth && <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost ">
                            <div className="w-10 ">
                                {auth.name}
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <Link to="/user/account" className="justify-between">
                                    Account
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a onClick={e => dispatch(logout())}>Logout</a></li>
                        </ul>
                    </div>
                }
            </div>
        </div>
        <div className=' bg-slate-200 p-4 flex justify-evenly'>

            {
                auth
                    ? publicRoutes
                        .filter(item => item.label !== "login" && item.label !== "register")
                        .map(({ path, show, label }) => show && <>
                            <Link className='' to={path}>{label} </Link>
                        </>)
                    : publicRoutes.map(({ path, show, label }) => show && <>
                        <Link className='' to={path}>{label} </Link>
                    </>)
            }

        </div>
    </>
}

export default Navbar