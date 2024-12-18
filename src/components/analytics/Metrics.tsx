// src/components/Metrics.js
import React from 'react';

const Metrics = () => {
  return (
    <div className=" grid-cols-2 gap-4 text-gray-500 w-[88%] flex-col flex">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Usage This Month</h3>
        <p className="text-xl font-medium">$152.97 / $1,000.00</p>
        <div className="w-full bg-gray-400 h-2 rounded-full mt-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '15%' }}></div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Credits Used</h3>
        <p className="text-xl font-medium">$598.37 / $5,000.00</p>
        <div className="w-[90%] bg-gray-200 h-2 rounded-full mt-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '10%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
