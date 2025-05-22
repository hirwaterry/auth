import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-[#C7F9CC] p-4">
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-green-400">CWSMS</h1>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-4">
        <Link 
          to="/dashboard" 
          className="block px-4 py-2 text-gray-700 hover:bg-green-400 hover:text-white rounded-md transition-colors"
        >
          Home
        </Link>
        <Link 
          to="/cars" 
          className="block px-4 py-2 text-gray-700 hover:bg-green-400 hover:text-white rounded-md transition-colors"
        >
          Cars
        </Link>
        <Link 
          to="/service" 
          className="block px-4 py-2 text-gray-700 hover:bg-green-400 hover:text-white rounded-md transition-colors"
        >
          Services
        </Link>
        <Link 
          to="/reports" 
          className="block px-4 py-2 text-gray-700 hover:bg-green-400 hover:text-white rounded-md transition-colors"
        >
          Reports
        </Link>

        <Link 
          to="/payment" 
          className="block px-4 py-2 text-gray-700 hover:bg-green-400 hover:text-white rounded-md transition-colors"
        >
          Payment
        </Link>

        <Link 
          to="/adduser" 
          className="block px-4 py-2 text-gray-700 hover:bg-green-400 hover:text-white rounded-md transition-colors"
        >
          Add User
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar