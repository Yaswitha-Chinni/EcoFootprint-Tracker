import React, { useState } from 'react';
import { RefreshCcw, BookOpen } from 'lucide-react';

const FLASHCARD_DATA = [
  {
    id: 1,
    front: "What percentage of global emissions comes from transportation?",
    back: "Around 24% of global CO2 emissions from fuel combustion comes from transportation, with road vehicles accounting for nearly three-quarters of this."
  },
  {
    id: 2,
    front: "How much CO2 does a mature tree absorb per year?",
    back: "A mature tree can absorb approximately 22 kilograms (48 lbs) of carbon dioxide per year, helping to filter the air and mitigate climate change."
  },
  {
    id: 3,
    front: "What is the impact of eating one less burger?",
    back: "Skipping just one beef burger can save the equivalent of driving a car for 10 miles (around 3-4 kg of CO2) and saves thousands of liters of water."
  },
  {
    id: 4,
    front: "Does fast fashion impact the climate?",
    back: "Yes! The fashion industry is responsible for about 10% of global carbon emissions—more than all international flights and maritime shipping combined."
  },
  {
    id: 5,
    front: "How effective is LED lighting?",
    back: "LED bulbs use up to 90% less energy than incandescent bulbs and last up to 25 times longer, drastically cutting down household energy emissions."
  },
  {
    id: 6,
    front: "What is 'Phantom Energy'?",
    back: "It's the energy consumed by electronics when they are turned off but still plugged in. It accounts for up to 10% of residential energy use!"
  }
];

const Flashcards = () => {
  const [flippedCards, setFlippedCards] = useState({});

  const handleFlip = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="animate-fade-in flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <div className="glass-card flex items-center gap-4">
        <div style={{ padding: '12px', background: 'var(--light-blue)', borderRadius: '50%', color: 'var(--accent-blue)' }}>
          <BookOpen size={32} />
        </div>
        <div>
          <h2 style={{ marginBottom: '0.2rem' }}>Interactive Learning</h2>
          <p style={{ margin: 0 }}>Click the cards to flip them and learn shocking facts about your environmental impact.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FLASHCARD_DATA.map((card) => (
          <div 
            key={card.id} 
            className={`flashcard-container ${flippedCards[card.id] ? 'flipped' : ''}`}
            onClick={() => handleFlip(card.id)}
          >
            <div className="flashcard-inner">
              <div className="flashcard-front">
                <h3 style={{ color: '#fff', fontSize: '1.4rem' }}>{card.front}</h3>
                <div style={{ marginTop: '1.5rem', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <RefreshCcw size={16} /> Tap to flip
                </div>
              </div>
              <div className="flashcard-back">
                <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', margin: 0, fontWeight: 500 }}>
                  {card.back}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flashcards;
