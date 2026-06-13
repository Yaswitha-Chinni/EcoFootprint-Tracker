import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Award, CheckCircle, Circle } from 'lucide-react';

const ACTIONS = [
  { id: 'reusable-bag', label: 'Used a reusable shopping bag', co2Saved: 1 },
  { id: 'meatless-meal', label: 'Ate a meatless meal', co2Saved: 3 },
  { id: 'public-transit', label: 'Took public transit', co2Saved: 5 },
  { id: 'cold-water', label: 'Washed clothes in cold water', co2Saved: 2 },
];

const BADGES = [
  { id: 'first-step', label: 'First Step', desc: 'Started your eco journey', threshold: 0 },
  { id: 'eco-novice', label: 'Eco Novice', desc: 'Completed 5 actions', threshold: 5 },
  { id: 'planet-hero', label: 'Planet Hero', desc: 'Completed 20 actions', threshold: 20 },
];

/**
 * ProgressTracker component for tracking daily sustainable actions and achievements.
 * @param {Object} props - Component props
 * @param {Object} props.data - Current global state
 * @param {Function} props.updateData - Global state updater function
 * @returns {JSX.Element} Rendered ProgressTracker component
 */
const ProgressTracker = ({ data, updateData }) => {
  const [justEarned, setJustEarned] = useState(null);

  /**
   * Toggles the completion status of a daily action.
   * @param {string} actionId - The ID of the action to toggle
   */
  const toggleAction = (actionId) => {
    let newCompleted = [...data.completedActions];
    if (newCompleted.includes(actionId)) {
      newCompleted = newCompleted.filter(id => id !== actionId);
    } else {
      newCompleted.push(actionId);
    }

    // Check for new badges
    let newBadges = [...data.badges];
    let newlyEarned = null;

    BADGES.forEach(badge => {
      if (newCompleted.length >= badge.threshold && !newBadges.includes(badge.id)) {
        newBadges.push(badge.id);
        newlyEarned = badge.label;
      }
    });

    if (newlyEarned) {
      setJustEarned(newlyEarned);
      setTimeout(() => setJustEarned(null), 3000);
    }

    updateData({
      ...data,
      completedActions: newCompleted,
      badges: newBadges
    });
  };

  /**
   * Keyboard support for toggling actions.
   * @param {React.KeyboardEvent} e - Keyboard event
   * @param {string} actionId - Action ID
   */
  const handleKeyDown = (e, actionId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleAction(actionId);
    }
  };

  return (
    <article className="glass-card" aria-label="Daily Actions and Achievements">
      <header className="flex justify-between items-center mb-4">
        <h3 style={{ marginBottom: 0 }}>Daily Actions</h3>
        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }} aria-live="polite">
          {data.completedActions.length} completed
        </span>
      </header>

      <section className="flex flex-col gap-3 mb-6" aria-label="Action list">
        {ACTIONS.map(action => {
          const isDone = data.completedActions.includes(action.id);
          return (
            <div 
              key={action.id}
              onClick={() => toggleAction(action.id)}
              onKeyDown={(e) => handleKeyDown(e, action.id)}
              role="checkbox"
              aria-checked={isDone}
              tabIndex={0}
              className="flex justify-between items-center"
              style={{
                padding: '0.8rem',
                background: isDone ? 'rgba(82, 183, 136, 0.2)' : 'rgba(255,255,255,0.4)',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div className="flex items-center gap-3">
                {isDone ? <CheckCircle color="var(--primary-green)" size={20} aria-hidden="true" /> : <Circle color="#aaa" size={20} aria-hidden="true" />}
                <span style={{ textDecoration: isDone ? 'line-through' : 'none', color: isDone ? 'var(--text-muted)' : 'var(--text-main)' }}>
                  {action.label}
                </span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: '#fff', padding: '2px 8px', borderRadius: '12px' }} aria-label={`Saves ${action.co2Saved} kilograms of CO2`}>
                -{action.co2Saved}kg
              </span>
            </div>
          )
        })}
      </section>

      <section className="mt-2 pt-4" style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }} aria-label="Achievements">
        <h3 className="flex items-center gap-2 mb-3">
          <Award size={20} color="#f59e0b" aria-hidden="true" /> Achievements
        </h3>
        
        <div className="flex flex-wrap gap-2" role="list">
          {BADGES.map(badge => {
            const earned = data.badges.includes(badge.id);
            return (
              <div 
                key={badge.id}
                title={badge.desc}
                role="listitem"
                aria-label={`${badge.label} badge: ${earned ? 'Earned' : 'Locked'}`}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  background: earned ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : '#e5e7eb',
                  color: earned ? '#fff' : '#9ca3af',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  boxShadow: earned ? '0 2px 8px rgba(245, 158, 11, 0.4)' : 'none'
                }}
              >
                {badge.label}
              </div>
            );
          })}
        </div>
        
        {justEarned && (
          <div className="mt-4 p-3 text-center animate-fade-in" style={{ background: '#d1fae5', color: '#065f46', borderRadius: '8px' }} role="alert">
            🎉 You earned the <strong>{justEarned}</strong> badge!
          </div>
        )}
      </section>
    </article>
  );
};

ProgressTracker.propTypes = {
  data: PropTypes.shape({
    completedActions: PropTypes.arrayOf(PropTypes.string).isRequired,
    badges: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  updateData: PropTypes.func.isRequired
};

export default ProgressTracker;
