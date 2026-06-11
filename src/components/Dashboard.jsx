import React from 'react';
import { calculateTotalFootprint, getScoreCategory } from '../utils/storage';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

const Dashboard = ({ data }) => {
  const total = calculateTotalFootprint(data.footprint);
  const score = getScoreCategory(total);

  const doughnutData = {
    labels: ['Transport', 'Energy', 'Food', 'Shopping'],
    datasets: [
      {
        data: [data.footprint.transport, data.footprint.energy, data.footprint.food, data.footprint.shopping],
        backgroundColor: ['#0077b6', '#52b788', '#2d6a4f', '#40916c'],
        borderColor: ['#fff', '#fff', '#fff', '#fff'],
        borderWidth: 2,
        hoverOffset: 10
      },
    ],
  };

  const lineData = {
    labels: data.history.map(h => h.date),
    datasets: [
      {
        label: 'Total CO2 (kg)',
        data: data.history.map(h => h.total),
        borderColor: '#2d6a4f',
        backgroundColor: 'rgba(45, 106, 79, 0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="glass-card flex justify-between items-center">
        <div>
          <h2>Your Weekly Carbon Footprint</h2>
          <p>This is a snapshot of your current estimated emissions.</p>
        </div>
        <div className="text-center">
          <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--primary-green)' }}>
            {total} <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>kg CO2</span>
          </div>
          <div className={`score-badge score-${score.toLowerCase()}`}>
            {score} Impact
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card flex flex-col items-center">
          <h3>Emissions Breakdown</h3>
          <div style={{ width: '100%', maxWidth: '250px' }}>
            <Doughnut data={doughnutData} options={{ maintainAspectRatio: true }} />
          </div>
        </div>
        
        <div className="glass-card flex flex-col items-center">
          <h3>Progress Over Time</h3>
          <div style={{ width: '100%', height: '100%' }}>
            <Line 
              data={lineData} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { legend: { display: false } }
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
