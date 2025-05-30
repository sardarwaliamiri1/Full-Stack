import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom'
import SignInwithGoogle from '../Components/SignInwithGoogle';

function SignUpForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar:''
  });
  const naviGate= useNavigate();
  const [errors, setErrors] = useState({});
  const [Submitbtn, setSubmitBtn] = useState('Submit');

  const handleChange = (e) => {
    const { name, value } = e.target;
   
   // setFormData(prev=>({...prev,  [name]: value }));
    setFormData(prev => ({ ...prev, [e.target.name] : e.target.value }));
                                                                                                                                                       

  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    if (!formData.avatar) {
      newErrors.avatar = "Avatar link is required"; } 
    
    else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };
 

  const handleSubmit = async(e) => {
    e.preventDefault();
    setSubmitBtn('Submitting...');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitBtn('Submit');
      
    } else {
      const res= await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setErrors({});
      if (data.success === false) {
        alert(data.message);
        setSubmitBtn('Submit');
      }
      else{
      setSubmitBtn('Submit');
      setFormData({
        name: '',
        email: '',
        password: ''
      
      });
      naviGate('/Sign-In')
    }
    }
  };

  return (
    <>
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
    <form 
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </div>
      <div className="mb-6">
        <label className="block mb-1 font-medium">Avatar Link</label>
        <input
          type="text"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.avatar && <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>}
      </div>
      

      <button
          type="submit"
          className={`w-full hover:opacity-40 ${
            Submitbtn === "submiting..." ? "bg-red-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          } text-white font-semibold py-3 px-4 rounded`}
          disabled={Submitbtn === "submiting..."}
        >
          {Submitbtn}
</button>
      <SignInwithGoogle />
    </form>
    
    <Link to="/sign-in" className='  flex gap-4'>
    <p > have an account</p>
      <span className='text-blue-600 hover:underline'>Sing In</span>

    </Link>
    </div>
    </>
    
  );
}

export default SignUpForm;