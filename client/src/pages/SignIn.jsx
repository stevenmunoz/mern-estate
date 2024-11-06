// Importing necessary modules and hooks from React, React Router, and Redux
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

// Define the SignIn component as the default export
export default function SignIn() {
  // useState hook to manage form data state
  const [formData, setFormData] = useState({});
  // useSelector hook to access loading and error state from the Redux store
  const { loading, error } = useSelector((state) => state.user);
  // useDispatch hook to dispatch actions to the Redux store
  const dispatch = useDispatch();
  // useNavigate hook to programmatically navigate to different routes
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleValidation = () => {
    if (!formData.email || !formData.password) {
      dispatch(signInFailure("Email and password are required"));
      return false;
    }
    return true;
  };

  // Define the handleSubmit function to handle form submission
  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    
    // Validate the form data
    if (!handleValidation()) {
      return;
    }
    
    try {
      // Dispatch the signInStart action to indicate the start of the sign-in process
      dispatch(signInStart());
      
      // Make a POST request to the sign-in API endpoint with the form data
      const res = await fetch('api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      // Parse the response data as JSON
      const data = await res.json();
      console.log(data);
      
      // Check if the sign-in was unsuccessful
      if (data.success === false) {
        // Dispatch the signInFailure action with the error message
        dispatch(signInFailure(data.message));
        return;
      }
      
      // Dispatch the signInSuccess action with the response data
      dispatch(signInSuccess(data));
      
      // Navigate to the home page upon successful sign-in
      navigate('/profile');
    } catch (error) {
      // Dispatch the signInFailure action with the error message in case of an exception
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80 uppercase'>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-700'> Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}