import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProgressTracker from './ProgressTracker';

const mockData = {
  completedActions: [],
  badges: []
};

describe('ProgressTracker Component', () => {
  it('renders daily actions list', () => {
    render(<ProgressTracker data={mockData} updateData={() => {}} />);
    expect(screen.getByText('Used a reusable shopping bag')).toBeInTheDocument();
  });

  it('toggles an action when clicked', () => {
    const updateSpy = vi.fn();
    render(<ProgressTracker data={mockData} updateData={updateSpy} />);
    const action = screen.getByText('Used a reusable shopping bag');
    fireEvent.click(action);
    expect(updateSpy).toHaveBeenCalled();
  });
});
