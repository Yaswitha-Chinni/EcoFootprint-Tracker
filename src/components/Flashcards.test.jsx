import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Flashcards from './Flashcards';

describe('Flashcards Component', () => {
  it('renders the interactive learning section', () => {
    render(<Flashcards />);
    expect(screen.getByText('Interactive Learning')).toBeInTheDocument();
  });

  it('renders all flashcards', () => {
    render(<Flashcards />);
    expect(screen.getByText(/What percentage of global emissions comes from transportation/i)).toBeInTheDocument();
  });
});
