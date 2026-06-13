import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Camera, Upload, AlertCircle, CheckCircle2 } from 'lucide-react';

/**
 * ImageScanner component simulates an AI image analysis to estimate carbon footprint.
 * Includes security validation for file size and types.
 * @param {Object} props - Component props
 * @param {Function} props.updateData - Global state update function
 * @param {Object} props.data - Current global state
 * @returns {JSX.Element} Rendered image scanner component
 */
const ImageScanner = ({ updateData, data }) => {
  const [image, setImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  /**
   * Handles image upload and applies security validation (file size and type).
   * @param {React.ChangeEvent<HTMLInputElement>} e - The file input change event
   */
  const handleImageUpload = (e) => {
    setError(null);
    const file = e.target.files[0];
    
    if (file) {
      // Security Validation: File Type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setError('Invalid file type. Only JPG, PNG, and WEBP are allowed.');
        return;
      }

      // Security Validation: File Size (Max 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setError('File is too large. Maximum size is 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setResult(null);
        simulateScan();
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Handles keyboard interaction for the dropzone to ensure accessibility.
   * @param {React.KeyboardEvent} e - Keyboard event
   */
  const handleDropzoneKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  /**
   * Simulates an asynchronous AI processing delay and provides mock results.
   */
  const simulateScan = () => {
    setIsScanning(true);
    
    setTimeout(() => {
      setIsScanning(false);
      
      const mockResults = [
        { type: "Beef Burger", category: "food", impact: "High", value: 4.5, tips: "Consider swapping to a plant-based burger to save ~3kg of CO2!" },
        { type: "Plastic Water Bottle", category: "shopping", impact: "Medium", value: 0.8, tips: "Use a reusable metal bottle to eliminate this footprint completely." },
        { type: "Gasoline Car", category: "transport", impact: "High", value: 12.0, tips: "A 10-mile trip in this car generates ~4kg of CO2. Consider carpooling!" },
        { type: "Laptop Computer", category: "energy", impact: "Low", value: 0.2, tips: "Electronics have low active footprint, but high manufacturing footprint. Keep it running longer!" },
        { type: "Apple", category: "food", impact: "Low", value: 0.05, tips: "Great choice! Locally sourced fruits have minimal carbon impact." }
      ];
      
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setResult(randomResult);
    }, 3000); 
  };

  return (
    <article className="animate-fade-in flex flex-col gap-6 w-full max-w-3xl mx-auto" aria-label="AI Carbon Footprint Scanner">
      <header className="glass-card flex items-center gap-4">
        <div style={{ padding: '12px', background: 'var(--light-blue)', borderRadius: '50%', color: 'var(--accent-blue)' }}>
          <Camera size={32} aria-hidden="true" />
        </div>
        <div>
          <h2 style={{ marginBottom: '0.2rem' }}>AI Carbon Scanner</h2>
          <p style={{ margin: 0 }}>Upload an image of your food, transport, or products to estimate its footprint.</p>
        </div>
      </header>

      <section className="glass-card" aria-live="polite">
        {!image ? (
          <div 
            className="scanner-dropzone" 
            onClick={() => fileInputRef.current.click()}
            onKeyDown={handleDropzoneKeyDown}
            role="button"
            tabIndex={0}
            aria-label="Upload an image to scan. Press Enter or Space to select a file."
          >
            <Upload size={48} color="var(--primary-green)" style={{ margin: '0 auto 1rem' }} aria-hidden="true" />
            <h3>Click or tap to upload an image</h3>
            <p>Supported formats: JPG, PNG, WEBP (Max 5MB)</p>
            {error && <p style={{ color: '#d9534f', fontWeight: 'bold' }} role="alert">{error}</p>}
            <input 
              type="file" 
              accept="image/jpeg, image/png, image/webp" 
              style={{ display: 'none' }} 
              ref={fileInputRef}
              onChange={handleImageUpload}
              aria-hidden="true"
              tabIndex={-1}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="scanner-image-container">
              <img src={image} alt="User uploaded object waiting for AI analysis" />
              {isScanning && <div className="laser-line" aria-hidden="true"></div>}
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
                    <CheckCircle2 color="var(--primary-green)" aria-hidden="true" />
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
                    <AlertCircle size={20} color="var(--accent-blue)" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                    {result.tips}
                  </p>
                </div>

                <button 
                  className="btn-outline w-full mt-6 justify-center" 
                  onClick={() => {
                    setImage(null);
                    setResult(null);
                    setError(null);
                  }}
                  aria-label="Scan another image"
                >
                  Scan Another Image
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </article>
  );
};

ImageScanner.propTypes = {
  updateData: PropTypes.func,
  data: PropTypes.object
};

export default ImageScanner;
