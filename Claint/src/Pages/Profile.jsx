import React from 'react'
import { useSelector} from 'react-redux';
import { useRef } from 'react';
import { useState } from 'react';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    password: ''
  });
  const updateFomData = (e) => {
    const { id, value } = e.target;
    //setFormData(prev => ({ ...prev, [id]: value }));
    setFormData({...formData, [id]: value });
    console.log(formData);
  }
  const checkUpdate = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Here you can add logic to upload the file to the server
      console.log('Selected file:', file);
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto '>
    <h1 className='text-3xl font-semibold text-center mt-2'  >Profile</h1>
    <input type='file' onChange={checkUpdate} className='mt-2 self-center w-1/2'hidden ref={fileInputRef} accept='image/*' />
    <form className='flex flex-col gap-2' >
    <img onClick={()=> fileInputRef.current.click()} className='cursor-pointer rounded-full w-24 h-24 object-cover self-center mt-2' src={currentUser.avatar} alt="profile" />
    <input
      type="text"
      id='name'
      value={formData.name}
  
      onChange={updateFomData}
      className='border border-gray-300 rounded-lg px-3 py-2 mt-2 w-1/2 self-center'/>

      <input
      type="email"
      id='email'
      value={formData.email}
     
      className='border border-gray-300 rounded-lg px-3 py-2 mt-2 w-1/2 self-center'/>
      <input
      type="password"
      id='password'
      value=''
     
      className='border border-gray-300 rounded-lg px-3 py-2 mt-2 w-1/2 self-center'/>
      <input type='submit' value='Update Profile' className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-1/2 self-center mt-2 cursor-pointer'/>
    </form>
    <div className='justify-between flex mt-3 '>
      <span className='text-red-600 font-semibold'>Delete Account</span>
      <span className='text-red-600 font-semibold'>sign out</span>
    </div>
    </div>

  )
}
