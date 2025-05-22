import React from 'react'
import { useAuth } from '../hooks/useAuth'

const Topbar = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <div className="h-16 bg-[#C7F9CC] flex items-center justify-end px-6 shadow-sm">
      {isAuthenticated ? (
        <div className="flex items-center space-x-4">
          <span className="text-gray-700 font-medium">
            Welcome, {user?.username}
          </span>
          <button 
            onClick={logout}
            className="px-4 py-2 bg-green-400 text-white rounded-md hover:bg-green-500 transition-colors"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">Please login</span>
        </div>
      )}
    </div>
  )
}

export default Topbar