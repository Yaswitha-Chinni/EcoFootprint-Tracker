import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Calculator from './Calculator';

const mockData = {
  footprint: { transport: 100, energy: 50, food: 200, shopping: 30 },
  history: [{ date: '2023-01-01', total: 380 }]
};

describe('Calculator Component', () => {
  it('renders the first step', () => {
    render(<Calculator data={mockData} updateData={() => {}} onComplete={() => {}} />);
    expect(screen.getByText('Transportation')).toBeInTheDocument();
  });

  it('can navigate to the next step', () => {
    render(<Calculator data={mockData} updateData={() => {}} onComplete={() => {}} />);
    const nextBtn = screen.getByText(/Next/i);
    fireEvent.click(nextBtn);
    expect(screen.getByText('Home Energy')).toBeInTheDocument();
  });
});
