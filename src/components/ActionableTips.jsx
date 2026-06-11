import React from 'react';
import { Lightbulb } from 'lucide-react';

const ActionableTips = ({ data }) => {
  // Find highest emission category
  const categories = Object.entries(data.footprint);
  categories.sort((a, b) => b[1] - a[1]);
  const highestCategory = categories[0][0];

  const tips = {
    transport: [
      "Try carpooling or taking public transit twice a week.",
      "Ensure your car tires are properly inflated to improve mileage.",
      "Consider walking or biking for trips under 2 miles."
    ],
    energy: [
      "Switch to LED light bulbs throughout your home.",
      "Unplug electronics when not in use to reduce phantom energy.",
      "Lower your thermostat by 2 degrees in winter to save energy."
    ],
    food: [
      "Try incorporating one meatless day per week into your diet.",
      "Buy local and seasonal produce to reduce transportation emissions.",
      "Plan meals to minimize food waste."
    ],
    shopping: [
      "Consider buying second-hand clothing or furniture.",
      "Invest in reusable bags, water bottles, and coffee cups.",
      "Support brands with transparent sustainability practices."
    ]
  };

  const currentTips = tips[highestCategory];

  return (
    <div className="glass-card">
      <div className="flex items-center gap-3 mb-4">
        <Lightbulb color="#e0a800" size={24} />
        <h3 style={{ marginBottom: 0 }}>Top Recommendations</h3>
      </div>
      <p style={{ fontSize: '0.9rem' }}>
        Based on your footprint, we suggest focusing on your <strong>{highestCategory}</strong> habits:
      </p>
      
      <ul style={{ listStyleType: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
        {currentTips.map((tip, index) => (
          <li key={index} style={{ background: 'rgba(255,255,255,0.5)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--light-green)' }}>
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActionableTips;
