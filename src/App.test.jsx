import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';
import * as storage from './utils/storage';

// Mock canvas for Chart.js
HTMLCanvasElement.prototype.getContext = () => { 
  return {
    fillRect: () => {},
    clearRect: () => {},
    getImageData: (x, y, w, h) => ({ data: new Array(w*h*4) }),
    putImageData: () => {},
    createImageData: () => ([]),
    setTransform: () => {},
    drawImage: () => {},
    save: () => {},
    fillText: () => {},
    restore: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    closePath: () => {},
    stroke: () => {},
    translate: () => {},
    scale: () => {},
    rotate: () => {},
    arc: () => {},
    fill: () => {},
    measureText: () => ({ width: 0 }),
    transform: () => {},
    rect: () => {},
    clip: () => {},
  };
};

describe('App Component', () => {
  it('renders app title', () => {
    render(<App />);
    const elements = screen.getAllByText(/EcoFootprint Tracker/i);
    expect(elements.length).toBeGreaterThan(0);
  });

  it('navigates between tabs', () => {
    render(<App />);
    const calcButton = screen.getByText('Calculator');
    fireEvent.click(calcButton);
    expect(screen.getByText('Calculate Your Footprint')).toBeInTheDocument();
  });
});
