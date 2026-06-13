import React, { useState, useEffect } from 'react';
import './index.css';
import { getStorageData, setStorageData } from './utils/storage';
import Dashboard from './components/Dashboard';
import Calculator from './components/Calculator';
import ActionableTips from './components/ActionableTips';
import ProgressTracker from './components/ProgressTracker';
import Flashcards from './components/Flashcards';
import ImageScanner from './components/ImageScanner';
import { Leaf } from 'lucide-react';

/**
 * Main Application Component.
 * Acts as the root layout and state provider for the Carbon Footprint Tracker.
 * @returns {JSX.Element} The rendered App component
 */
function App() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const loadedData = getStorageData();
    setData(loadedData);
  }, []);

  /**
   * Updates the global data state and persists it to local storage.
   * @param {Object} newData - The updated user carbon data
   */
  const updateData = (newData) => {
    setData(newData);
    setStorageData(newData);
  };

  if (!data) return <div className="flex justify-center items-center h-screen" role="status" aria-live="polite">Loading...</div>;

  return (
    <div className="animate-fade-in">
      <header className="flex justify-between items-center mb-8 glass-card">
        <div className="flex items-center gap-4">
          <Leaf size={32} color="var(--primary-green)" aria-hidden="true" />
          <h1 style={{ marginBottom: 0, fontSize: '2rem' }}>EcoFootprint Tracker</h1>
        </div>
        <nav className="flex gap-4" style={{ flexWrap: 'wrap' }} aria-label="Main Navigation">
          <button 
            className={activeTab === 'dashboard' ? 'btn-primary' : 'btn-outline'} 
            onClick={() => setActiveTab('dashboard')}
            aria-current={activeTab === 'dashboard' ? 'page' : undefined}
          >
            Dashboard
          </button>
          <button 
            className={activeTab === 'calculator' ? 'btn-primary' : 'btn-outline'} 
            onClick={() => setActiveTab('calculator')}
            aria-current={activeTab === 'calculator' ? 'page' : undefined}
          >
            Calculator
          </button>
          <button 
            className={activeTab === 'learn' ? 'btn-primary' : 'btn-outline'} 
            onClick={() => setActiveTab('learn')}
            aria-current={activeTab === 'learn' ? 'page' : undefined}
          >
            Learn
          </button>
          <button 
            className={activeTab === 'scan' ? 'btn-primary' : 'btn-outline'} 
            onClick={() => setActiveTab('scan')}
            aria-current={activeTab === 'scan' ? 'page' : undefined}
          >
            Scan Image
          </button>
        </nav>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activeTab === 'dashboard' && (
          <>
            <section className="md:col-span-2" aria-label="Dashboard Overview">
              <Dashboard data={data} updateData={updateData} />
            </section>
            <aside className="flex flex-col gap-6" aria-label="Insights and Progress">
              <ActionableTips data={data} />
              <ProgressTracker data={data} updateData={updateData} />
            </aside>
          </>
        )}
        
        {activeTab === 'calculator' && (
          <section className="md:col-span-3 flex justify-center" aria-label="Carbon Calculator">
             <div className="w-full" style={{maxWidth: '800px'}}>
               <Calculator data={data} updateData={updateData} onComplete={() => setActiveTab('dashboard')} />
             </div>
          </section>
        )}

        {activeTab === 'learn' && (
          <section className="md:col-span-3 flex justify-center" aria-label="Educational Flashcards">
             <Flashcards />
          </section>
        )}

        {activeTab === 'scan' && (
          <section className="md:col-span-3 flex justify-center" aria-label="AI Image Scanner">
             <ImageScanner updateData={updateData} data={data} />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
