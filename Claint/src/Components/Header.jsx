import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
function Header() {
      const {currentUser } = useSelector((state) => state.user);
      console.log(currentUser)
  return (
      <header>
            <div className='bg-slate-400 flex justify-between items-center p-4'>
            <h1>Claint</h1>
            <nav>
                  <ul className='flex justify-between items-center gap-3 '>  
                        <Link to="/" className='hover:underline'>
                        <li className='hover:underline'>Home</li></Link>
                        <li className='hover:underline'><a href="/about">About</a></li>
                        <li className='hover:underline'><a href="/Sign-Up">Sign Up</a></li>
                        <Link to ='/profile'>
                       
                        {currentUser?<img className=' rounded-full w-10 h-10' src={currentUser.avatar} alt="profile" />:
                        <li className='hover:underline'>Sign In</li>}
                        </Link>
                  </ul>
            </nav>
            </div>
      </header>
        )
}

export default Header;