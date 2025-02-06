import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

                <div className="">
                    <img src={assets.logo} className="mb-5 w-32" alt='' />
                    <p className='w-full md:w-2/3 text-gray-600'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ab animi laborum odit ducimus eaque praesentium quos accusantium veritatis, error saepe quia corporis temporibus nostrum impedit, reprehenderit debitis officiis distinctio!
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <p className='font-semibold'>ABOUT US</p>
                    <p className='text-gray-400'>About Us</p>
                    <p className='text-gray-400'>Contact Us</p>
                    <p className='text-gray-400'>Careers</p>
                </div>
                <div className="flex flex-col gap-4">
                    <p className='font-semibold'>HELP</p>
                    <p className='text-gray-400'>Payments</p>
                    <p className='text-gray-400'>Shipping</p>
                    <p className='text-gray-400'>Cancellation & Returns</p>
                </div>
                <div className="flex flex-col gap-4">
                    <p className='font-semibold'>POLICY</p>
                    <p className='text-gray-400'>Return Policy</p>
                    <p className='text-gray-400'>Terms Of Use</p>
                    <p className='text-gray-400'>Security</p>
                </div>
            </div>
        </div>
    )
}

export default Footer