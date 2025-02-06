import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <div className='text-center'>
            <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
            <p className='text-gray-400 mt-3'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe sit nam rerum esse, non quo quae ad, eveniet placeat ducimus quisquam, vel provident cum vitae adipisci fugit? Doloribus, perferendis quas?
            </p>
            <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 mx-auto flex items-center gap-3 my-6 border pl-3'>
                <input type="email" placeholder='Enter your email' className='w-full sn:flex-1 outline-none' required />
                <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
            </form>
        </div>
    )
}

export default NewsletterBox