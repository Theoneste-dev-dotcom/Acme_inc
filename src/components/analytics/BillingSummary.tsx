// src/components/BillingSummary.js
import React from 'react';

const BillingSummary = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mt-4 text-gray-300 w-[75vw]">
      <h3 className="text-lg font-medium text-gray-400">Billing Summary</h3>
      <ul className="mt-2">
        <li>Credits Remaining: <strong>$4,401.63</strong></li>
        <li>Monthly Quota Reset: <strong>Nov 1, 2024</strong></li>
        <li>Next Invoice: <strong>Oct 31, 2024</strong></li>
      </ul>
    </div>
  );
};

export default BillingSummary;
