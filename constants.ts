import { Concert } from './types';

export const COLORS = {
  espresso: '#260B01',
  saddle: '#64563C',
  clay: '#8D5B2F',
  sage: '#939789',
  sand: '#CBB89C',
  dune: '#DBD5CA',
};

// Application automatically promotes the first chronological future date to "Featured"
export const TOUR_DATA: Concert[] = [
  {
    id: 'session-2026-bonnerup',
    city: 'Bønnerup',
    country: 'Denmark',
    venue: 'Café Den Sidste Original',
    address: 'Ny Havnevej 25, 8585 Glesborg',
    date: 'July 1, 2026', // Standard format for reliable parsing
    time: '12:00',
    status: 'upcoming',
    coordinates: { lat: 56.5204, lng: 10.7105 },
    ticketsUrl: 'https://www.facebook.com/AnnMcBryanDuo'
  }
];