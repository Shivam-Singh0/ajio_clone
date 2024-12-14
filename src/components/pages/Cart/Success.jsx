import React from 'react';
import { Link } from 'react-router-dom';
import { FaRupeeSign } from 'react-icons/fa'; // Import a dollar sign icon

const Success = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        {/* Icon at the top */}
        <div className="flex justify-center items-center mb-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100">
            <FaRupeeSign className="text-green-500 text-2xl" />
          </div>
        </div>
        {/* Payment Successful Message */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Payment Successful</h2>
        <p className="text-gray-600 mb-6">Thank you for your payment!</p>
        {/* Continue Shopping Button */}
        <Link
          to={'/'}
          className="inline-block px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Success;
