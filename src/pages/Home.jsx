import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createPost,
  likePost,
  commentOnPost,
  addFriend,
  removeFriend,
} from '../utils/api';
import { useAuth } from '../context/AuthContext';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
import FriendList from '../components/FriendList';

export default function Home() {
  const { user, token, users, setUsers } = useAuth();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  // Fetch data from the API in useEffect
  useEffect(() => {
    fetchPosts();
  }, [token, users]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setPosts(data.data.posts);
    } catch (error) {
      console.error('Error fetching users:', error);
      // Handle error
    }
  };

  const handleCreatePost = async (newPost) => {
    try {
      const createdPost = await createPost(newPost, token);
      setPosts([createdPost, ...posts]);
    } catch (error) {
      console.error('Error creating post:', error);
      // Handle error
    }
  };

  const handleLike = async (event, postId) => {
    try {
      await likePost(postId, token);
      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
      // Handle error
    }
  };

  const handleComment = async (postId, comment) => {
    try {
      const newComment = await commentOnPost(postId, comment, token);
      fetchPosts();
    } catch (error) {
      console.error('Error commenting on post:', error);
      // Handle error
    }
  };

  const handleAddFriend = async (friendId) => {
    try {
      await addFriend(friendId, token);
      fetchPosts();
    } catch (error) {
      console.error('Error adding friend:', error);
      // Handle error
    }
  };

  const handleRemoveFriend = async (friendId) => {
    try {
      await removeFriend(friendId, token);
      fetchPosts();
    } catch (error) {
      console.error('Error removing friend:', error);
      // Handle error
    }
  };

  if (!user) navigate('./Login');

  return (
    <div className='max-w-6xl mx-auto px-4 py-6'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='md:col-span-2 space-y-4'>
          <CreatePost user={user} token={token} onPost={handleCreatePost} />
          {posts.map((post) => (
            <Post
              user={user}
              token={token}
              key={post.id}
              post={post}
              onLike={handleLike}
              onComment={handleComment}
            />
          ))}
        </div>
        <div>
          <FriendList
            users={users}
            onAddFriend={handleAddFriend}
            onRemoveFriend={handleRemoveFriend}
          />
        </div>
      </div>
    </div>
  );
}
