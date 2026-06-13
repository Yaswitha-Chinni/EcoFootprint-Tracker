import { describe, it, expect, beforeEach } from 'vitest';
import { getStorageData, setStorageData } from './storage';

describe('Storage Utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize mock data when storage is empty', () => {
    const data = getStorageData();
    expect(data).toBeDefined();
    expect(data.completedActions).toEqual([]);
    expect(data.history.length).toBeGreaterThan(0);
    expect(data.footprint).toBeDefined();
  });

  it('should retrieve existing data from storage', () => {
    const mockData = {
      footprint: { transport: 100, energy: 50, food: 200, shopping: 30 },
      completedActions: ['test_action'],
      badges: ['first-step'],
      history: []
    };
    localStorage.setItem('ecoFootprintData', JSON.stringify(mockData));
    
    const data = getStorageData();
    expect(data).toEqual(mockData);
  });

  it('should save data to storage', () => {
    const mockData = {
      footprint: { transport: 100, energy: 50, food: 200, shopping: 30 },
      completedActions: ['another_action'],
      badges: [],
      history: [{ date: '2023-01-01', total: 10 }]
    };
    
    setStorageData(mockData);
    const savedString = localStorage.getItem('ecoFootprintData');
    expect(JSON.parse(savedString)).toEqual(mockData);
  });
});
