import React, { useState } from 'react'

const Login = () => {

    const [currentState, setCurrentState] = useState("Sign Up")

    const onSubmitHandler = async (event) => {
        // Handle form submission logic here
        // e.g., send data to the server, validate input, etc.
        // console.log("Form submitted")
        event.preventDefault();
        
    }

    return (
        <form onSubmit={onSubmitHandler} action="" className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
            <div className="inline-flex items-center gap-2 mb-2 mt-10">
                <p className='prata-regular text-3xl'>{currentState}</p>
                <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
            </div>

            {currentState === 'Login' ? "" : <input type="text" placeholder='Full Name' className='border border-gray-800 py-2 px-3 w-full' /> }
            <input type="email" placeholder='Email Address' className='border border-gray-800 py-2 px-3 w-full' />
            <input type="password" placeholder='Password' className='border border-gray-800 py-2 px-3 w-full' required />

            <div className="w-full flex justify-between text-sm mt-[-8px]">
                <p className='cursor-pointer'>Forgot your password?</p>
                {currentState === "Login" ? 
                    <p className='cursor-pointer' onClick={() => setCurrentState("Sign Up")}>Create an account</p> 
                    : <p className='cursor-pointer' onClick={() => setCurrentState("Login")}>Already have an account?</p>}
            </div>

            <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === "Login" ? "Sign In": "Sign Up"}</button>
        </form>
    )
}

export default Login