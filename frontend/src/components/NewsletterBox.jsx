import React from 'react'

const NewsletterBox = () => {

    return (
        <div className='text-center'>
            <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
            <p className='text-gray-400 mt-3'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe sit nam rerum esse, non quo quae ad, eveniet placeat ducimus quisquam, vel provident cum vitae adipisci fugit? Doloribus, perferendis quas?
            </p>
            <form action="">
                <input type="email" placeholder='Enter your email' className='w-full sn:flex-1 outline-none' />
                <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE NOW</button>
            </form>
        </div>
    )
}

export default NewsletterBox