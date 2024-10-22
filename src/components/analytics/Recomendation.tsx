// src/components/Recommendations.js
import React from 'react';

const Recommendations = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mt-4 text-gray-300 w-[75vw]">
      <h3 className="text-lg font-medium text-gray-400">Recommendations</h3>
      <ul className="mt-2">
        <li>🔄 Switch to Annual Plan: Save 10% on monthly usage.</li>
        <li>⬆️ Upgrade API Tier: Unlock higher limits.</li>
      </ul>
    </div>
  );
};

export default Recommendations;
