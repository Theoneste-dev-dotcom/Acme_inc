// src/components/UsageChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const UsageChart = () => {
  const data = {
    labels: ['Jul 1', 'Jul 5', 'Jul 9', 'Jul 13', 'Jul 17', 'August', 'September', 'October'],
    datasets: [
      {
        label: 'Cumulative Daily Usage (USD)',
        data: [100, 200, 150, 300, 250,230, 260, 160 ],
        borderColor: '#4F46E5',
        fill: true,
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow w-[60vw] h-[50vh] mb-24 mt-20 p-6">
      <h2 className="text-xl font-semibold mb-4">Cumulative Daily Usage (USD)</h2>
      <Line data={data} />
    </div>
  );
};

export default UsageChart;
