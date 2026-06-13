import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ImageScanner from './ImageScanner';

describe('ImageScanner Component', () => {
  it('renders upload prompt', () => {
    render(<ImageScanner updateData={() => {}} data={{}} />);
    expect(screen.getByText(/Click or tap to upload an image/i)).toBeInTheDocument();
  });
});
