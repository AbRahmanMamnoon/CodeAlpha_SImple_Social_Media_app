import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { User, UserMinus, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function FriendList({ users, onAddFriend, onRemoveFriend }) {
  const { token } = useAuth();
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
        setCurrentUser(data.user);
      } catch (error) {
        console.error('Error fetching users:', error);
        // Handle error
      }
    };

    fetchUserProfile();
  }, [token]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-white rounded-lg shadow p-4'>
      <div className='flex items-center gap-2 mb-4'>
        <User className='w-5 h-5 text-indigo-600' />
        <h2 className='text-lg font-semibold'>People</h2>
      </div>
      <div className='space-y-4'>
        {users?.map((user) => (
          <div key={user?._id} className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <img
                src={`http://localhost:5000/images/${user?.image}`}
                alt={user?.name}
                className='w-10 h-10 rounded-full'
              />
              <div>
                <h3 className='font-medium'>{user?.name}</h3>
                <p className='text-sm text-gray-500'>@{user?.username}</p>
              </div>
            </div>
            {currentUser.friends[0]?._id == user?._id ? (
              <button
                onClick={() => onRemoveFriend(user?._id)}
                className='p-2 text-red-500 hover:bg-red-50 rounded-full'
              >
                <UserMinus className='w-5 h-5' />
              </button>
            ) : (
              <button
                onClick={() => onAddFriend(user?._id)}
                className='p-2 text-indigo-600 hover:bg-indigo-50 rounded-full'
              >
                <UserPlus className='w-5 h-5' />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

FriendList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAddFriend: PropTypes.func.isRequired,
  onRemoveFriend: PropTypes.func.isRequired,
};
