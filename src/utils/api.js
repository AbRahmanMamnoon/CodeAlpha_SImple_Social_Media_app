import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const createPost = async (newPost, token) => {
  console.log(newPost);
  try {
    const response = await instance.post('/posts', newPost, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const likePost = async (postId, token) => {
  // console.log(postId);
  try {
    await instance.post(`/posts/${postId}/like`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const commentOnPost = async (postId, comment, token) => {
  console.log(postId, comment);
  try {
    const response = await instance.post(
      `/posts/${postId}/comments`,
      {
        content: comment,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addFriend = async (friendId, token) => {
  try {
    await instance.post(`/users/friends/${friendId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const removeFriend = async (friendId, token) => {
  try {
    await instance.delete(`/users/friends/${friendId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};
