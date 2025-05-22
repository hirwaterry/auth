import React, { useEffect, useState } from 'react';
import api from '../services/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const Reports = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState('');

  const fetchReport = async () => {
    try {
      setLoading(true);
      const formattedDate = date.toISOString().split('T')[0];
      const { data } = await api.get(`/reports/daily?date=${formattedDate}`);
      setReportData(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching report:', err);
      setError('Failed to load report. Please try again.');
      setReportData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [date]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const calculateTotal = () => {
    return reportData.reduce((sum, item) => sum + (item.payment?.amountPaid || 0), 0);
  };

  return (
    <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Topbar />
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Daily Reports</h2>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Select Date:</label>
          <DatePicker
            selected={date}
            onChange={handleDateChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </div>

      {error && !loading && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      )}

      {!loading && reportData.length === 0 && (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <p className="text-gray-600">No records found for selected date.</p>
        </div>
      )}

      {!loading && reportData.length > 0 && (
        <div className="space-y-6">
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plate Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (RWF)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reportData.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {new Date(item.serviceDate).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {item.car?.plateNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {item.package?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {item.package?.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {item.payment?.amountPaid?.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-green-800">Daily Summary</h3>
              <p className="text-xl font-bold text-green-800">
                Total: {calculateTotal().toLocaleString()} RWF
              </p>
            </div>
            <div className="mt-2 text-sm text-green-700">
              {reportData.length} services on {date.toLocaleDateString()}
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

export default Reports;
