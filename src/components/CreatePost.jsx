import React, { useState } from 'react';
import { FaUpload, FaFileAlt, FaRegImage } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function CreatePost({ user, token, onPost }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim() && !image) return;

    try {
      const formData = new FormData();
      formData.append('content', content.trim());
      formData.append('image', image);

      onPost(formData);
      setContent('');
      setImage(null);
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      setImage(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white rounded-lg shadow-lg p-6 mb-4'
    >
      <div className='flex items-start gap-4'>
        <img
          src={`http://localhost:5000/images/${user.image}`}
          alt='user-image'
          className='w-12 h-12 rounded-full object-cover'
        />
        <div className='flex-1'>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className='w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
            rows={3}
          />
          {image && (
            <div className='mt-4'>
              <img
                src={URL.createObjectURL(image)}
                alt='Preview'
                className='max-h-60 rounded-lg'
              />
            </div>
          )}
          <div className='mt-4 flex justify-between items-center'>
            <div className='flex items-center gap-4'>
              <div className='relative overflow-hidden rounded-sm'>
                <label
                  htmlFor='image'
                  className='flex items-center gap-2 text-indigo-500 hover:bg-indigo-700 rounded-sm transition-colors duration-300'
                >
                  <div className='cursor-pointer'>
                    <FaRegImage className='w-7 h-7' />
                  </div>
                  <div className='cursor-pointer'>
                    <span>upload image</span>
                  </div>
                </label>
                <input
                  type='file'
                  id='image'
                  name='image'
                  onChange={handleImageChange}
                  className='absolute inset-0 z-10 opacity-0 cursor-pointer'
                />
                {image && (
                  <div className='flex items-center gap-2 bg-gray-100 px-5 py-1 rounded-sm text-sm mt-2 cursor-pointer'>
                    <FaFileAlt className='w-5 h-5 text-gray-500' />
                    <span className='truncate'>{image.name}</span>
                  </div>
                )}
              </div>
            </div>
            <button
              type='submit'
              className='px-5 py-1 bg-indigo-600 text-white rounded-sm hover:bg-indigo-700 flex items-center gap-2 transition-colors duration-300'
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

CreatePost.propTypes = {
  onPost: PropTypes.func.isRequired,
};
