import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className='flex bg-[#C7F9CC] p-4 text-gray-500 h justify-between items-center transition duration-300'>
      <div className='w-1/4'></div>
      
      <div className='flex justify-center space-x-8 w-2/4'>
        <Link className='hover:text-gray-900' to="/">Home</Link>
        <Link className='hover:text-gray-900' to="/about">How it works</Link>
        <Link className='hover:text-gray-900' to="/contact">Contact</Link>
      </div>

      <div className='flex justify-end space-x-4 w-1/4'>
        {isAuthenticated ? (
          <>
            <span className="text-gray-900">Hi, {user?.username}</span>
            <button onClick={logout} className='hover:text-gray-900'>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className='hover:text-gray-900' to="/login">Login</Link>
            <Link className='hover:text-gray-900' to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;