import React from 'react'

export default function Signup() {
  return (
    <>
    <h1 className='text-center text-3xl my-2 '>Sign Up</h1>
    <div className="flex justify-center">
    <div className='flex justify-center items-center my-10 border-2 border-slate-900 rounded-md p-4 w-80 ml-'>
      <form action="post">
        <div className='flex flex-col gap-2'>
          <input type="text" placeholder='Enter your name' className='border-2 border-slate-400 rounded-md p-2'/>
          <input type="email" placeholder='Enter your email' className='border-2 border-slate-400 rounded-md p-2'/>
          <input type="password" placeholder='Enter your password' className='border-2 border-slate-400 rounded-md p-2'/>
          <input type="password" placeholder='Confirm your password' className='border-2 border-slate-400 rounded-md p-2'/>
          <button className='bg-fuchsia-500 p-2 rounded-md'>Sign Up</button>
        </div>
       
      </form>
    </div>
    </div>
    </>
  )
}
