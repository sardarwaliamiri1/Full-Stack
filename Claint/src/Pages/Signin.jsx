import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {loginStart, loginFailure,loginSuccess} from '../redux/user.js'
import { set } from 'mongoose';
import SignInwithGoogle from '../Components/SignInwithGoogle.jsx';

function SignUpForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const{serverSideError, isSubmitting}= useSelector(state=>(state.user));
  const [errors, setErrors] = useState({});
  //const [isSubmitting, setIsSubmitting] = useState(false);
 // const [Submitbtn, setSubmitBtn] = useState('Sign In');
  const [serverError, setServerError] = useState();
  const dispatch = useDispatch();
  const naviGate= useNavigate();
  const data={}
  const handleChange = (e) => {
    const { name, value } = e.target;
   
   // setFormData(prev=>({...prev,  [name]: value }));
    setFormData(prev => ({ ...prev, [e.target.name] : e.target.value }));
                                                                                                                                                       

  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) {
      newErrors.password = "Password is required";
    } 
    return newErrors;
  };
 

  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch(loginStart());
    //setIsSubmitting(true);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
          try{
          const res= await fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          console.log(`this is data response ${data.message}`);
          
          if (data.success) {
          dispatch(loginSuccess(data.userWithoutPassword));
          setFormData({
            name: '',
            email: '',
            password: ''
          })
          naviGate('/')
        }

        else{

        dispatch(loginFailure(data.message));
        console.log(`this is after data failer ${data.message}`);
        
        //setServerError(data.message) 
        
        }


          }
        catch{
        dispatch(loginFailure("Server Error conection error"));
        //setServerError('Server Error conection error') 
      }

     

      
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md w-full mt-6 max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>

      

      <div className="mb-4">
        
        <input placeholder='Email'
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-lg border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" 
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div className="mb-6">
        <input placeholder='Password'
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border rounded-lg border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </div>

      <button
          type="submit"
          className={`w-full hover:opacity-40 ${
            "bg-blue-500 hover:bg-blue-600"
          } text-white font-semibold py-3 px-4 rounded`}
          disabled={isSubmitting}
        >
          {isSubmitting? "Signing In..." : "Sign In"}
</button>
          <SignInwithGoogle />
    </form>
    {serverSideError && <p className="text-red-500 text-lg mt-1">{serverSideError}</p>}

    
    
   
    </div>
    
  );
}

export default SignUpForm;