import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const Service = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/packages')
      .then(res => setServices(res.data))
      .catch(() => setServices([]));
  }, []);

  return (

    <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Topbar />
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-green-700">Available Services</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-green-400 text-white">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Price (RWF)</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, idx) => (
              <tr
                key={service._id}
                className={idx % 2 === 0 ? 'bg-green-100' : 'bg-green-300'}
              >
                <td className="px-4 py-2 font-semibold">{service.name}</td>
                <td className="px-4 py-2">{service.description}</td>
                <td className="px-4 py-2">{service.price.toLocaleString()}</td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No services available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Service;