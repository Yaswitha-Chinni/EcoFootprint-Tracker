import React, { useState } from 'react';
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

const ProgressTracker = ({ data, updateData }) => {
  const [justEarned, setJustEarned] = useState(null);

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

  return (
    <div className="glass-card">
      <div className="flex justify-between items-center mb-4">
        <h3 style={{ marginBottom: 0 }}>Daily Actions</h3>
        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          {data.completedActions.length} completed
        </span>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        {ACTIONS.map(action => {
          const isDone = data.completedActions.includes(action.id);
          return (
            <div 
              key={action.id}
              onClick={() => toggleAction(action.id)}
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
                {isDone ? <CheckCircle color="var(--primary-green)" size={20} /> : <Circle color="#aaa" size={20} />}
                <span style={{ textDecoration: isDone ? 'line-through' : 'none', color: isDone ? 'var(--text-muted)' : 'var(--text-main)' }}>
                  {action.label}
                </span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: '#fff', padding: '2px 8px', borderRadius: '12px' }}>
                -{action.co2Saved}kg
              </span>
            </div>
          )
        })}
      </div>

      <div className="mt-2 pt-4" style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}>
        <h3 className="flex items-center gap-2 mb-3">
          <Award size={20} color="#f59e0b" /> Achievements
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {BADGES.map(badge => {
            const earned = data.badges.includes(badge.id);
            return (
              <div 
                key={badge.id}
                title={badge.desc}
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
          <div className="mt-4 p-3 text-center animate-fade-in" style={{ background: '#d1fae5', color: '#065f46', borderRadius: '8px' }}>
            🎉 You earned the <strong>{justEarned}</strong> badge!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressTracker;
