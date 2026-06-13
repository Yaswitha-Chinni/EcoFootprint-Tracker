import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
import { Target } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

/**
 * Dashboard component displaying the user's carbon footprint summary, charts, and goals.
 * @param {Object} props - Component props
 * @param {Object} props.data - The user's carbon data state
 * @param {Function} props.updateData - Function to update the global state
 * @returns {JSX.Element} The rendered Dashboard component
 */
const Dashboard = ({ data, updateData }) => {
  const total = calculateTotalFootprint(data.footprint);
  const score = getScoreCategory(total);
  
  // Default goal logic if not set in state
  const currentGoal = data.goal || 200;
  const [goalInput, setGoalInput] = useState(currentGoal);

  /**
   * Handles updating the user's emission reduction goal.
   */
  const handleSaveGoal = () => {
    updateData({ ...data, goal: parseInt(goalInput, 10) });
  };

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
      <section className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(82, 183, 136, 0.1) 0%, rgba(0, 119, 182, 0.1) 100%)' }} aria-label="Our Mission and Privacy Guarantee">
        <h2 style={{ color: 'var(--primary-green)', marginBottom: '0.5rem' }}>Our Mission</h2>
        <p style={{ margin: 0, fontWeight: 500 }}>
          Welcome to EcoFootprint Tracker! We help individuals <strong>understand, track, and reduce their carbon footprint through simple actions and personalized insights.</strong>
        </p>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          🔒 <strong>Privacy Guarantee:</strong> All of your carbon footprint data and images are processed and stored strictly locally on your device. We do not transmit or store your personal data on external servers.
        </p>
      </section>

      <article className="glass-card flex justify-between items-center" aria-label="Footprint Summary">
        <div>
          <h2>Your Weekly Carbon Footprint</h2>
          <p>This is a snapshot of your current estimated emissions.</p>
        </div>
        <div className="text-center">
          <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--primary-green)' }} aria-live="polite">
            {total} <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>kg CO2</span>
          </div>
          <div className={`score-badge score-${score.toLowerCase()}`} aria-label={`Impact score is ${score}`}>
            {score} Impact
          </div>
        </div>
      </article>

      <article className="glass-card flex items-center justify-between" aria-label="Goal Setting">
        <div className="flex items-center gap-4">
          <div style={{ padding: '12px', background: 'var(--light-blue)', borderRadius: '50%', color: 'var(--accent-blue)' }}>
            <Target size={32} aria-hidden="true" />
          </div>
          <div>
            <h3 style={{ marginBottom: '0.2rem' }}>Set Reduction Goal</h3>
            <p style={{ margin: 0 }}>Commit to a monthly emission target to track and reduce your footprint.</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <input 
            type="number" 
            value={goalInput} 
            onChange={(e) => setGoalInput(e.target.value)}
            style={{ width: '100px', padding: '0.5rem', borderRadius: '8px', border: '1px solid #ccc' }}
            aria-label="Target CO2 Goal in kg"
          />
          <span style={{ fontWeight: 600 }}>kg</span>
          <button className="btn-primary" onClick={handleSaveGoal}>Save</button>
        </div>
      </article>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <article className="glass-card flex flex-col items-center" aria-label="Emissions Breakdown Chart">
          <h3>Emissions Breakdown</h3>
          <div style={{ width: '100%', maxWidth: '250px' }}>
            <Doughnut data={doughnutData} options={{ maintainAspectRatio: true }} aria-label="Doughnut chart of emissions" />
          </div>
        </article>
        
        <article className="glass-card flex flex-col items-center" aria-label="Progress Over Time Chart">
          <h3>Progress Over Time</h3>
          <div style={{ width: '100%', height: '100%', minHeight: '200px' }}>
            <Line 
              data={lineData} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { legend: { display: false } }
              }} 
              aria-label="Line chart of historical emissions"
            />
          </div>
        </article>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  data: PropTypes.shape({
    footprint: PropTypes.shape({
      transport: PropTypes.number,
      energy: PropTypes.number,
      food: PropTypes.number,
      shopping: PropTypes.number
    }).isRequired,
    history: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.string,
      total: PropTypes.number
    })).isRequired,
    goal: PropTypes.number
  }).isRequired,
  updateData: PropTypes.func.isRequired
};

export default Dashboard;
