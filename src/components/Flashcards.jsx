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

/**
 * Flashcards Component displaying interactive 3D flip cards for educational purposes.
 * @returns {JSX.Element} The rendered Flashcards component
 */
const Flashcards = () => {
  const [flippedCards, setFlippedCards] = useState({});

  /**
   * Toggles the flipped state of a specific flashcard.
   * @param {number} id - The ID of the flashcard to flip
   */
  const handleFlip = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  /**
   * Keyboard accessibility handler for flipping cards.
   * @param {React.KeyboardEvent} e - The keyboard event
   * @param {number} id - The ID of the flashcard
   */
  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFlip(id);
    }
  };

  return (
    <article className="animate-fade-in flex flex-col gap-6 w-full max-w-4xl mx-auto" aria-label="Educational Flashcards">
      <header className="glass-card flex items-center gap-4">
        <div style={{ padding: '12px', background: 'var(--light-blue)', borderRadius: '50%', color: 'var(--accent-blue)' }}>
          <BookOpen size={32} aria-hidden="true" />
        </div>
        <div>
          <h2 style={{ marginBottom: '0.2rem' }}>Interactive Learning</h2>
          <p style={{ margin: 0 }}>Click the cards to flip them and learn shocking facts about your environmental impact.</p>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-label="Flashcard Grid">
        {FLASHCARD_DATA.map((card) => {
          const isFlipped = !!flippedCards[card.id];
          return (
            <div 
              key={card.id} 
              className={`flashcard-container ${isFlipped ? 'flipped' : ''}`}
              onClick={() => handleFlip(card.id)}
              onKeyDown={(e) => handleKeyDown(e, card.id)}
              role="button"
              tabIndex={0}
              aria-pressed={isFlipped}
              aria-expanded={isFlipped}
              aria-label={`Flashcard: ${card.front}. Press Enter or Space to flip.`}
            >
              <div className="flashcard-inner">
                <div className="flashcard-front" aria-hidden={isFlipped}>
                  <h3 style={{ color: '#fff', fontSize: '1.4rem' }}>{card.front}</h3>
                  <div style={{ marginTop: '1.5rem', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <RefreshCcw size={16} aria-hidden="true" /> Tap to flip
                  </div>
                </div>
                <div className="flashcard-back" aria-hidden={!isFlipped}>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', margin: 0, fontWeight: 500 }}>
                    {card.back}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </article>
  );
};

export default Flashcards;
