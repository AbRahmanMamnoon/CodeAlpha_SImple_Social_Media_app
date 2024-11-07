import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Heart, MessageCircle, Send } from 'lucide-react';

export default function Post({ user, token, post, onLike, onComment }) {
  const [comment, setComment] = useState('');
  const [liked, setLiked] = useState(false);

  return (
    <div className='bg-white rounded-lg shadow mb-4'>
      <div className='p-4'>
        <div className='flex items-center gap-3 mb-4'>
          <img
            src={`http://localhost:5000/images/${post.userId.image}`}
            alt=''
            className='w-10 h-10 rounded-full'
          />
          <div>
            <h3 className='font-medium'>{post.userId.name}</h3>
            <p className='text-sm text-gray-500'>
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <p className='mb-4'>{post.content}</p>

        <img
          className='w-full sm:w-[700px] sm:h-[400px] object-cover rounded-lg mb-4'
          src={`http://localhost:5000/images/${post.image}`}
          alt='post-image'
        />

        <div className='flex items-center gap-4 mb-4'>
          <button
            onClick={(event) => onLike(event, post._id)}
            className={`flex items-center gap-1 ${
              liked ? 'text-red-500' : 'text-gray-500'
            }`}
          >
            <Heart className={`w-5 h-5`} />
            {post.likes.length}
          </button>
          <div className='flex items-center gap-1 text-gray-500'>
            <MessageCircle className='w-5 h-5' />
            {post.comments.length}
          </div>
        </div>

        <div className='border-t pt-4'>
          {post.comments.map((comment) => (
            <div key={comment.id} className='flex gap-3 mb-3'>
              <img
                src={`http://localhost:5000/images/${comment.userId.image}`}
                alt=''
                className='w-8 h-8 rounded-full'
              />
              <div className='bg-gray-100 p-2 rounded-lg flex-1'>
                <p className='font-medium'>{comment.userId.name}</p>
                <p>{comment.content}</p>
              </div>
            </div>
          ))}

          <form
            onSubmit={(event) => {
              event.preventDefault();
              onComment(post._id, comment);
              setComment('');
            }}
            className='flex gap-2 mt-4'
          >
            <input
              type='text'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Write a comment...'
              className='flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500'
            />
            <button
              type='submit'
              className='p-3 bg-white text-black hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors duration-300'
            >
              <Send className='w-5 h-5' />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userId: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string,
    likes: PropTypes.arrayOf(PropTypes.string).isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        userId: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          image: PropTypes.string.isRequired,
        }).isRequired,
        content: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
      })
    ).isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onLike: PropTypes.func.isRequired,
  onComment: PropTypes.func.isRequired,
};
