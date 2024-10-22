// src/components/Dashboard.js
"use client"
import React from 'react';
import UsageChart from '@/components/analytics/ChatJs';
import Metrics from '@/components/analytics/Metrics';
import BillingSummary from '@/components/analytics/BillingSummary';
import Recommendations from '@/components/analytics/Recomendation';


const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8 pl-40 ">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-400 mb-2">Good evening, Chris</h1>
        <p className="text-gray-600">Here is your usage overview for this month.</p>
      </header>

      <UsageChart />
      <Metrics />
      <BillingSummary />
      <Recommendations />
    </div>
  );
};

export default Dashboard;
