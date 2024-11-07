import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../context/AuthContext';
import { Edit, Users } from 'lucide-react';

export default function Profile() {
  const { token, users } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/users/profile',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setCurrentUser(data.user);
      } catch (error) {
        console.error('Error fetching users:', error);
        // Handle error
      }
    };

    fetchUserProfile();
  }, [token]);
  const friends = users?.filter((u) => currentUser?.friends?.includes(u?.id));

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <div className='bg-white rounded-lg shadow'>
        <div className='h-32 bg-indigo-600 rounded-t-lg'></div>
        <div className='px-4 pb-4'>
          <div className='relative -top-16'>
            <img
              src={`http://localhost:5000/images/${currentUser?.image}`}
              alt={currentUser?.name}
              className='w-32 h-32 rounded-full border-4 border-white'
            />
            <button className='absolute bottom-0 right-0 p-2 bg-white rounded-full shadow hover:bg-gray-50'>
              <Edit className='w-5 h-5 text-gray-600' />
            </button>
          </div>
          <div className='-mt-12'>
            <h1 className='text-2xl font-bold'>{currentUser?.name}</h1>
            <p className='text-gray-500'>@{currentUser?.username}</p>
            <p className='mt-2'>{currentUser?.bio}</p>

            <div className='mt-4 flex items-center gap-2'>
              <Users className='w-5 h-5 text-indigo-600' />
              <span className='font-medium'>
                {currentUser?.friends?.length} friends
              </span>
            </div>

            <div className='mt-4 grid grid-cols-3 gap-2'>
              {friends.map((friend) => (
                <div key={friend?.id} className='text-center'>
                  <img
                    src={`http://localhost:5000/images/${friend?.image}`}
                    alt={friend?.name}
                    className='w-20 h-20 rounded-full mx-auto'
                  />
                  <p className='mt-1 font-medium'>{friend?.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
