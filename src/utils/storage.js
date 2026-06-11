export const INITIAL_MOCK_DATA = {
  footprint: {
    transport: 120, // kg CO2/week
    energy: 80,
    food: 150,
    shopping: 50
  },
  history: [
    { date: '2023-09-01', total: 420 },
    { date: '2023-09-08', total: 410 },
    { date: '2023-09-15', total: 390 },
    { date: '2023-09-22', total: 400 },
  ],
  badges: ['first-step'], // e.g. ids of badges
  completedActions: []
};

export const getStorageData = () => {
  const data = localStorage.getItem('ecoFootprintData');
  if (data) {
    return JSON.parse(data);
  }
  // Initialize with mock data for first time users
  setStorageData(INITIAL_MOCK_DATA);
  return INITIAL_MOCK_DATA;
};

export const setStorageData = (data) => {
  localStorage.setItem('ecoFootprintData', JSON.stringify(data));
};

export const calculateTotalFootprint = (footprint) => {
  return Object.values(footprint).reduce((acc, val) => acc + val, 0);
};

export const getScoreCategory = (total) => {
  // Rough weekly estimates in kg CO2
  if (total < 250) return 'Low';
  if (total < 400) return 'Medium';
  return 'High';
};
