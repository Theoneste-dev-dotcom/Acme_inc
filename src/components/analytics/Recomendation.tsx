// src/components/Recommendations.js
import React from 'react';

const Recommendations = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mt-4 text-gray-300 w-[88%]">
      <h3 className="text-xl font-semibold text-gray-500">Recommendations</h3>
      <ul className="mt-2">
        <li className='text-gray-500 text-xl'>🔄 Switch to Annual Plan: Save 10% on monthly usage.</li>
        <li className='text-gray-500 text-xl'>⬆️ Upgrade API Tier: Unlock higher limits.</li>
      </ul>
    </div>
  );
};

export default Recommendations;
