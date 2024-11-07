import React, { useEffect, createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { addFriend, removeFriend } from '../utils/api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for user data and token in local storage on component mount
    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
        fetchUsers(storedToken);
      }
    } catch (error) {
      console.error('Error retrieving user data from local storage:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          username,
          password,
        }
      );
      const newUser = {
        id: response.data.user._id,
        username: response.data.user.username,
        name: response.data.user.name,
        image: response.data.user.image,
        bio: response.data.user.bio,
        friends: response.data.user.friends,
      };

      setUser(newUser);
      setToken(response.data.token);

      // Store user data in local storage
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', response.data.token);
      navigate('/');

      fetchUsers();
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Invalid username or password');
    }
  };

  const register = async (username, name, password, image, navigate) => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('name', name);
      formData.append('password', password);
      formData.append('image', image);

      await axios.post('http://localhost:5000/api/auth/register', formData);
      navigate('/login');
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const fetchUsers = async (storedToken) => {
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      const data = await response.json();
      setUsers(data.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        setUsers,
        token,
        login,
        register,
        logout,
        loading,
        navigate,
      }}
    >
      {!loading && children}
      <ToastContainer />
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
