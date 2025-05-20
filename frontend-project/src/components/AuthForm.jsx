import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthForm({ type, onSubmit }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(type === 'register' ? formData : {
        username: formData.username,
        password: formData.password,
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-indigo-dye mb-6">
        {type === 'login' ? 'Login' : 'Register'}
      </h2>
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-indigo-dye mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-moonstone rounded focus:outline-none focus:ring-2 focus:ring-picton-blue"
            required
          />
        </div>

        {type === 'register' && (
          <div>
            <label className="block text-indigo-dye mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-moonstone rounded focus:outline-none focus:ring-2 focus:ring-picton-blue"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-indigo-dye mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-moonstone rounded focus:outline-none focus:ring-2 focus:ring-picton-blue"
            required
            minLength="6"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-moonstone hover:bg-picton-blue text-white py-2 px-4 rounded transition"
        >
          {type === 'login' ? 'Login' : 'Register'}
        </button>
      </form>

      <div className="mt-4 text-center">
        {type === 'login' ? (
          <p className="text-indigo-dye">
            Don't have an account?{' '}
            <a href="/register" className="text-picton-blue hover:underline">
              Register
            </a>
          </p>
        ) : (
          <p className="text-indigo-dye">
            Already have an account?{' '}
            <a href="/login" className="text-picton-blue hover:underline">
              Login
            </a>
          </p>
        )}
      </div>
    </div>
  );
}