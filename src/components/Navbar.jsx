import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon } from 'lucide-react';
import logoImage from '../assetes/logo.webp';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className='bg-white shadow-md'>
      <div className='max-w-6xl mx-auto px-4 py-3'>
        <div className='flex justify-between items-center'>
          <Link to='/'>
            <img
              src={logoImage}
              alt='Logo'
              className='w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain rounded-full shadow-md hover:shadow-lg transition-shadow duration-300'
            />
          </Link>
          {user && (
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2'>
                <img
                  src={`http://localhost:5000/images/${user.image}`}
                  alt={user.name}
                  className='w-8 h-8 rounded-full'
                />
                <span className='font-medium'>{user.name}</span>
              </div>
              <Link
                to='/profile'
                className='p-2 hover:bg-gray-100 rounded-full'
              >
                <UserIcon className='w-5 h-5' />
              </Link>
              <button
                onClick={logout}
                className='p-2 hover:bg-gray-100 rounded-full text-red-500'
              >
                <LogOut className='w-5 h-5' />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
