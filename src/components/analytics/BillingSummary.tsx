// src/components/BillingSummary.js
import React from 'react';

const BillingSummary = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mt-4 text-gray-300 w-[70vw]">
      <h3 className="text-xl font-semibold text-gray-500">Billing Summary</h3>
      <ul className="mt-2">
        <li className='text-gray-500 text-xl'>Credits Remaining: <strong>$4,401.63</strong></li>
        <li className='text-gray-500 text-xl'>Monthly Quota Reset: <strong>Nov 1, 2024</strong></li>
        <li className='text-gray-500 text-xl'>Next Invoice: <strong>Oct 31, 2024</strong></li>
      </ul>
    </div>
  );
};

export default BillingSummary;
