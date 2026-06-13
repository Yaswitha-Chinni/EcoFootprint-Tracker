import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Dashboard from './Dashboard';

const mockData = {
  footprint: { transport: 100, energy: 50, food: 200, shopping: 30 },
  history: [{ date: '2023-01-01', total: 380 }],
  goal: 200
};

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

describe('Dashboard Component', () => {
  it('renders footprint total', () => {
    render(<Dashboard data={mockData} updateData={() => {}} />);
    expect(screen.getByText('380')).toBeInTheDocument();
  });

  it('renders goal setting input', () => {
    render(<Dashboard data={mockData} updateData={() => {}} />);
    expect(screen.getByText('Set Reduction Goal')).toBeInTheDocument();
  });
});
