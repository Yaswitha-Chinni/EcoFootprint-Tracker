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

function App() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const loadedData = getStorageData();
    setData(loadedData);
  }, []);

  const updateData = (newData) => {
    setData(newData);
    setStorageData(newData);
  };

  if (!data) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="animate-fade-in">
      <header className="flex justify-between items-center mb-8 glass-card">
        <div className="flex items-center gap-4">
          <Leaf size={32} color="var(--primary-green)" />
          <h1 style={{ marginBottom: 0, fontSize: '2rem' }}>EcoFootprint Tracker</h1>
        </div>
        <nav className="flex gap-4" style={{ flexWrap: 'wrap' }}>
          <button 
            className={activeTab === 'dashboard' ? 'btn-primary' : 'btn-outline'} 
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={activeTab === 'calculator' ? 'btn-primary' : 'btn-outline'} 
            onClick={() => setActiveTab('calculator')}
          >
            Calculator
          </button>
          <button 
            className={activeTab === 'learn' ? 'btn-primary' : 'btn-outline'} 
            onClick={() => setActiveTab('learn')}
          >
            Learn
          </button>
          <button 
            className={activeTab === 'scan' ? 'btn-primary' : 'btn-outline'} 
            onClick={() => setActiveTab('scan')}
          >
            Scan Image
          </button>
        </nav>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activeTab === 'dashboard' && (
          <>
            <div className="md:col-span-2">
              <Dashboard data={data} />
            </div>
            <div className="flex flex-col gap-6">
              <ActionableTips data={data} />
              <ProgressTracker data={data} updateData={updateData} />
            </div>
          </>
        )}
        
        {activeTab === 'calculator' && (
          <div className="md:col-span-3 flex justify-center">
             <div className="w-full" style={{maxWidth: '800px'}}>
               <Calculator data={data} updateData={updateData} onComplete={() => setActiveTab('dashboard')} />
             </div>
          </div>
        )}

        {activeTab === 'learn' && (
          <div className="md:col-span-3 flex justify-center">
             <Flashcards />
          </div>
        )}

        {activeTab === 'scan' && (
          <div className="md:col-span-3 flex justify-center">
             <ImageScanner data={data} updateData={updateData} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
