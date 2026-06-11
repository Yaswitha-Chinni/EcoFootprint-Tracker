import React, { useState, useRef } from 'react';
import { Camera, Upload, AlertCircle, CheckCircle2 } from 'lucide-react';

const ImageScanner = ({ updateData, data }) => {
  const [image, setImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setResult(null);
        simulateScan();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateScan = () => {
    setIsScanning(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      setIsScanning(false);
      
      // Randomize a plausible mock result for the hackathon MVP
      const mockResults = [
        { type: "Beef Burger", category: "food", impact: "High", value: 4.5, tips: "Consider swapping to a plant-based burger to save ~3kg of CO2!" },
        { type: "Plastic Water Bottle", category: "shopping", impact: "Medium", value: 0.8, tips: "Use a reusable metal bottle to eliminate this footprint completely." },
        { type: "Gasoline Car", category: "transport", impact: "High", value: 12.0, tips: "A 10-mile trip in this car generates ~4kg of CO2. Consider carpooling!" },
        { type: "Laptop Computer", category: "energy", impact: "Low", value: 0.2, tips: "Electronics have low active footprint, but high manufacturing footprint. Keep it running longer!" },
        { type: "Apple", category: "food", impact: "Low", value: 0.05, tips: "Great choice! Locally sourced fruits have minimal carbon impact." }
      ];
      
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setResult(randomResult);
    }, 3000); // 3 seconds scan time
  };

  return (
    <div className="animate-fade-in flex flex-col gap-6 w-full max-w-3xl mx-auto">
      <div className="glass-card flex items-center gap-4">
        <div style={{ padding: '12px', background: 'var(--light-blue)', borderRadius: '50%', color: 'var(--accent-blue)' }}>
          <Camera size={32} />
        </div>
        <div>
          <h2 style={{ marginBottom: '0.2rem' }}>AI Carbon Scanner</h2>
          <p style={{ margin: 0 }}>Upload an image of your food, transport, or products to estimate its footprint.</p>
        </div>
      </div>

      <div className="glass-card">
        {!image ? (
          <div className="scanner-dropzone" onClick={() => fileInputRef.current.click()}>
            <Upload size={48} color="var(--primary-green)" style={{ margin: '0 auto 1rem' }} />
            <h3>Click or tap to upload an image</h3>
            <p>Supported formats: JPG, PNG, WEBP</p>
            <input 
              type="file" 
              accept="image/*" 
              style={{ display: 'none' }} 
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="scanner-image-container">
              <img src={image} alt="Uploaded for analysis" />
              {isScanning && <div className="laser-line"></div>}
            </div>

            {isScanning && (
              <div className="text-center animate-fade-in">
                <h3 style={{ color: 'var(--accent-blue)' }}>Analyzing image...</h3>
                <p>Detecting objects and estimating carbon emission factors...</p>
              </div>
            )}

            {result && !isScanning && (
              <div className="w-full glass-card animate-fade-in" style={{ border: `2px solid ${result.impact === 'High' ? '#f8d7da' : result.impact === 'Medium' ? '#fff3cd' : '#d4edda'}` }}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="flex items-center gap-2">
                    <CheckCircle2 color="var(--primary-green)" />
                    Detection Complete
                  </h3>
                  <div className={`score-badge score-${result.impact.toLowerCase()}`}>
                    {result.impact} Impact
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p style={{ margin: 0, color: 'var(--text-muted)' }}>Object Detected:</p>
                    <h4 style={{ fontSize: '1.2rem', margin: 0 }}>{result.type}</h4>
                  </div>
                  <div className="text-right">
                    <p style={{ margin: 0, color: 'var(--text-muted)' }}>Estimated Footprint:</p>
                    <h4 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--primary-green)' }}>~{result.value} kg CO2</h4>
                  </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.5)', padding: '1rem', borderRadius: '12px' }}>
                  <p className="flex items-start gap-2" style={{ margin: 0, color: 'var(--text-main)', fontWeight: 500 }}>
                    <AlertCircle size={20} color="var(--accent-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    {result.tips}
                  </p>
                </div>

                <button 
                  className="btn-outline w-full mt-6 justify-center" 
                  onClick={() => {
                    setImage(null);
                    setResult(null);
                  }}
                >
                  Scan Another Image
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageScanner;
