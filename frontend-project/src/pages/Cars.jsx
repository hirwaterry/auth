import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const sizeOptions = ['Small', 'Medium', 'Large', 'SUV', 'Truck'];

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    plateNumber: '',
    type: '',
    size: '',
    driverName: '',
    phoneNumber: ''
  });
  const [error, setError] = useState('');

  // Fetch cars from backend
  const fetchCars = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/cars');
      setCars(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching cars:', err);
      setError('Failed to load cars. Please try again.');
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'plateNumber' ? value.toUpperCase() : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    
    // Validate phone number
    if (!/^[0-9]{10}$/.test(form.phoneNumber)) {
      setError('Phone number must be 10 digits');
      return;
    }

    try {
      const { data } = await api.post('/cars', form);
      setCars(prev => [data, ...prev]);
      setShowModal(false);
      setForm({
        plateNumber: '',
        type: '',
        size: '',
        driverName: '',
        phoneNumber: ''
      });
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.message ||
        'Failed to add car. Please try again.'
      );
    }
  };

  return (

    <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Topbar />
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Car Management</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          onClick={() => setShowModal(true)}
        >
          Add New Car
        </button>
      </div>

      {error && !loading && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      )}

      
      {!loading && cars.length === 0 && (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <p className="text-gray-600">No cars found. Add your first car!</p>
        </div>
      )}

      
      {!loading && cars.length > 0 && (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plate Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cars.map((car) => (
                <tr key={car._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {car.plateNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {car.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${car.size === 'Small' ? 'bg-blue-100 text-blue-800' : 
                        car.size === 'Large' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'}`}>
                      {car.size}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {car.driverName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {car.phoneNumber}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Car Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-semibold">Add New Car</h3>
              <button
                onClick={() => { setShowModal(false); setError(''); }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="plateNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  License Plate Number *
                </label>
                <input
                  id="plateNumber"
                  type="text"
                  name="plateNumber"
                  value={form.plateNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  required
                  autoFocus
                  placeholder="RAA123A"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Car Type *
                </label>
                <input
                  id="type"
                  type="text"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  required
                  placeholder="e.g. Sedan, SUV"
                />
              </div>

              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                  Car Size *
                </label>
                <select
                  id="size"
                  name="size"
                  value={form.size}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  required
                >
                  <option value="">Select size</option>
                  {sizeOptions.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="driverName" className="block text-sm font-medium text-gray-700 mb-1">
                  Driver Name *
                </label>
                <input
                  id="driverName"
                  type="text"
                  name="driverName"
                  value={form.driverName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    className="block w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    placeholder="e.g. 0789896004"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Enter your 10-digit phone number (e.g. 0789896004)</p>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setError(''); }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Save Car
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

export default Cars;