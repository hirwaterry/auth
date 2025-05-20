import { useState, useEffect } from 'react';
import { register, login, logout, checkAuth } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const { isAuthenticated, user } = await checkAuth();
        setIsAuthenticated(isAuthenticated);
        setUser(user || null);
      } catch (err) {
        toast.error('Session expired. Please login again');
      } finally {
        setLoading(false);
      }
    };
    verifyAuth();
  }, []);

  const handleRegister = async (userData) => {
    try {
      const { user } = await register(userData);
      setUser(user);
      setIsAuthenticated(true);
      toast.success('Registration successful! Please login');
      navigate('/login');
    } catch (err) {
      toast.error(err.message || 'Registration failed');
      throw err;
    }
  };

  const handleLogin = async (userData) => {
    try {
      const { user } = await login(userData);
      setUser(user);
      setIsAuthenticated(true);
      toast.success(`Welcome back, ${user.username}!`);
      navigate('/dashboard');
    } catch (err) {
      toast.error('Invalid username or password');
      throw err;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setIsAuthenticated(false);
      toast.info('Logged out successfully');
      navigate('/login');
    } catch (err) {
      toast.error('Logout failed. Please try again');
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    register: handleRegister,
    login: handleLogin,
    logout: handleLogout,
  };
}