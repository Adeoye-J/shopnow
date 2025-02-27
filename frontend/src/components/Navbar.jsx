import React, { useContext, useState } from 'react'
import {assets} from "../assets/assets"
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()
    const {setShowSearch} = useContext(ShopContext)

    return (
        <div className='flex items-center justify-between py-5 font-medium'>
            
            <Link to={"/"}><img src={assets.logo} className='w-36' alt="Logo" /></Link>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/' className='flex flex-col items-center gap-1' end>
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1' end>
                    <p>COLLECTION</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1' end>
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1' end>
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>

            <div className="flex items-center gap-6">
                <img onClick={() => {setShowSearch(true); navigate("/collection")}} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
                
                <div className="group relative">
                    <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
                    <div className="group-hover:block hidden absolute drop-down-menu right-0 shadow-md pt-4 rounded-lg">
                        <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                            <p className='cursor-pointer hover:text-black'>My Profile</p>
                            <p className='cursor-pointer hover:text-black'>Orders</p>
                            <p className='cursor-pointer hover:text-black'>Logout</p>
                        </div>
                    </div>
                </div>

                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5 cursor-pointer' alt="" />
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center">3</div>
                </Link>

                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
            </div>
            {/* Side bar menu for smaller screen */}
            <div className={`absolute top-0 left-0 bottom-0 overflow-hidden w-full h-full bg-white transition-all z-50 ${visible ? 'block' : 'hidden'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
                        <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
                        <p>Back</p>
                    </div>
                    {/* <ul className='text-sm text-gray-700'> */}
                        <NavLink onClick={() => setVisible(false)} to='/' className='py-2 pl-6 border' end>HOME</NavLink>
                        <NavLink onClick={() => setVisible(false)} to='/collection' className='py-2 pl-6 border' end>COLLECTION</NavLink>
                        <NavLink onClick={() => setVisible(false)} to='/about' className='py-2 pl-6 border' end>ABOUT</NavLink>
                        <NavLink onClick={() => setVisible(false)} to='/contact' className='py-2 pl-6 border' end>CONTACT</NavLink>
                    {/* </ul> */}
                </div>
            </div>
        </div>
    )
}

export default Navbar