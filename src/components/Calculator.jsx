import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { calculateTotalFootprint } from '../utils/storage';
import { Car, Zap, ShoppingBag, Utensils, ArrowRight, ArrowLeft } from 'lucide-react';

/**
 * Calculator component for estimating the user's carbon footprint across different categories.
 * @param {Object} props - Component props
 * @param {Object} props.data - Current global state
 * @param {Function} props.updateData - Function to update global state
 * @param {Function} props.onComplete - Callback fired when calculation is finished
 * @returns {JSX.Element} Rendered Calculator component
 */
const Calculator = ({ data, updateData, onComplete }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    transport: 'medium',
    energy: 'medium',
    food: 'medium',
    shopping: 'medium'
  });

  const steps = [
    {
      id: 'transport',
      title: 'Transportation',
      icon: <Car size={24} aria-hidden="true" />,
      question: 'How do you usually commute?',
      options: [
        { label: 'Public Transit / Walk / Bike (Low Impact)', value: 'low', emission: 30 },
        { label: 'Personal Car - Short Commute (Medium Impact)', value: 'medium', emission: 120 },
        { label: 'Personal Car - Long Commute (High Impact)', value: 'high', emission: 250 },
      ]
    },
    {
      id: 'energy',
      title: 'Home Energy',
      icon: <Zap size={24} aria-hidden="true" />,
      question: 'How energy efficient is your home?',
      options: [
        { label: 'Renewable / Highly Efficient (Low Impact)', value: 'low', emission: 40 },
        { label: 'Average Usage (Medium Impact)', value: 'medium', emission: 90 },
        { label: 'High Usage / Not Efficient (High Impact)', value: 'high', emission: 180 },
      ]
    },
    {
      id: 'food',
      title: 'Diet & Food',
      icon: <Utensils size={24} aria-hidden="true" />,
      question: 'What best describes your diet?',
      options: [
        { label: 'Vegan / Vegetarian (Low Impact)', value: 'low', emission: 60 },
        { label: 'Mixed - Average Meat (Medium Impact)', value: 'medium', emission: 150 },
        { label: 'High Meat Consumption (High Impact)', value: 'high', emission: 220 },
      ]
    },
    {
      id: 'shopping',
      title: 'Shopping Habits',
      icon: <ShoppingBag size={24} aria-hidden="true" />,
      question: 'How often do you buy new items?',
      options: [
        { label: 'Rarely / Second Hand (Low Impact)', value: 'low', emission: 20 },
        { label: 'Occasional (Medium Impact)', value: 'medium', emission: 50 },
        { label: 'Frequent (High Impact)', value: 'high', emission: 120 },
      ]
    }
  ];

  /**
   * Handles selection of a footprint option.
   * @param {string} val - The selected option value
   */
  const handleSelect = (val) => {
    setFormData({ ...formData, [steps[step].id]: val });
  };

  /**
   * Handles accessibility selection via keyboard.
   * @param {React.KeyboardEvent} e - Keyboard event
   * @param {string} val - Option value
   */
  const handleKeyDown = (e, val) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect(val);
    }
  };

  /**
   * Advances the wizard or completes the calculation.
   */
  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate and save
      const newFootprint = {
        transport: steps[0].options.find(o => o.value === formData.transport).emission,
        energy: steps[1].options.find(o => o.value === formData.energy).emission,
        food: steps[2].options.find(o => o.value === formData.food).emission,
        shopping: steps[3].options.find(o => o.value === formData.shopping).emission,
      };

      const newTotal = calculateTotalFootprint(newFootprint);
      const today = new Date().toISOString().split('T')[0];
      
      const newHistory = [...data.history];
      // Check if today exists
      const todayIndex = newHistory.findIndex(h => h.date === today);
      if (todayIndex >= 0) {
        newHistory[todayIndex].total = newTotal;
      } else {
        newHistory.push({ date: today, total: newTotal });
      }

      updateData({
        ...data,
        footprint: newFootprint,
        history: newHistory
      });

      onComplete();
    }
  };

  const currentStep = steps[step];

  return (
    <article className="glass-card animate-fade-in flex flex-col gap-6" aria-label="Footprint Calculator Wizard">
      <header className="flex justify-between items-center mb-4">
        <h2>Calculate Your Footprint</h2>
        <div style={{ color: 'var(--text-muted)' }} aria-live="polite">
          Step {step + 1} of {steps.length}
        </div>
      </header>

      <div className="flex items-center gap-4 mb-4">
        <div style={{ padding: '12px', background: 'var(--light-blue)', borderRadius: '50%', color: 'var(--accent-blue)' }}>
          {currentStep.icon}
        </div>
        <h3 style={{ marginBottom: 0 }}>{currentStep.title}</h3>
      </div>

      <p style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 500 }} id="question-label">
        {currentStep.question}
      </p>

      <div className="flex flex-col gap-4 mt-4" role="radiogroup" aria-labelledby="question-label">
        {currentStep.options.map((opt) => {
          const isSelected = formData[currentStep.id] === opt.value;
          return (
            <div 
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              onKeyDown={(e) => handleKeyDown(e, opt.value)}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              style={{
                padding: '1.2rem',
                border: `2px solid ${isSelected ? 'var(--primary-green)' : 'rgba(0,0,0,0.1)'}`,
                borderRadius: '12px',
                cursor: 'pointer',
                background: isSelected ? 'rgba(82, 183, 136, 0.1)' : 'transparent',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span style={{ fontWeight: 500 }}>{opt.label}</span>
              <span style={{ color: 'var(--text-muted)' }}>~{opt.emission} kg CO2</span>
            </div>
          );
        })}
      </div>

      <nav className="flex justify-between mt-8" aria-label="Calculator navigation">
        <button 
          className="btn-outline" 
          onClick={() => setStep(Math.max(0, step - 1))}
          style={{ visibility: step === 0 ? 'hidden' : 'visible' }}
          aria-label="Previous step"
        >
          <ArrowLeft size={18} aria-hidden="true" /> Back
        </button>
        <button className="btn-primary" onClick={handleNext} aria-label={step === steps.length - 1 ? 'Calculate footprint' : 'Next step'}>
          {step === steps.length - 1 ? 'Calculate' : 'Next'} <ArrowRight size={18} aria-hidden="true" />
        </button>
      </nav>
    </article>
  );
};

Calculator.propTypes = {
  data: PropTypes.object.isRequired,
  updateData: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired
};

export default Calculator;
