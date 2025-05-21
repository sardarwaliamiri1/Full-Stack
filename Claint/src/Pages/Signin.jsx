import React, { useState } from 'react';
import { Link } from 'react-router-dom'

function SignUpForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

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
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };
 

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitBtn('Submitting...');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Form submitted:", formData);
      alert("Successfully signed up!");
      setSubmitBtn('Submit');
      setFormData({
        name: '',
        email: '',
        password: ''
      });
    }
  };

  return (
    <>
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>

      

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

      <button
          type="submit"
          className={`w-full ${
            Submitbtn === "submiting..." ? "bg-red-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          } text-white font-semibold py-2 px-4 rounded`}
          disabled={Submitbtn === "submiting..."}
        >
          {Submitbtn}
</button>
    </form>
    

    </>
    
  );
}

export default SignUpForm;