import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.trim() && name.trim() && password.trim() && image) {
      try {
        await register(
          username.trim(),
          name.trim(),
          password.trim(),
          image,
          navigate
        );

        // Reset the form fields
        setUsername('');
        setName('');
        setPassword('');
        setImage(null);
      } catch (error) {
        console.error('Error registering:', error);
        toast.error('Error registering');
      }
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Register to SocialApp
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Fill in the form to create an account
          </p>
        </div>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <input
                type='text'
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='appearance-none rounded-t-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Username'
              />
            </div>
            <div>
              <input
                type='text'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Name'
              />
            </div>
            <div>
              <input
                type='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='appearance-none rounded-b-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Password'
              />
            </div>
            <div>
              <input
                type='file'
                required
                onChange={handleImageChange}
                className='appearance-none rounded-b-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Register
            </button>
          </div>
        </form>
        <div className='flex justify-center'>
          <a href='./login' className='text-indigo-600 hover:text-indigo-500'>
            Already have an account? Log in
          </a>
        </div>
      </div>
    </div>
  );
}
