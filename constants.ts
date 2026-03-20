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
    time: '18:30',
    status: 'upcoming',
    coordinates: { lat: 56.5204, lng: 10.7105 },
    ticketsUrl: 'https://www.facebook.com/events/2537513756664081?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22user_timeline%22%7D%2C%7B%22mechanism%22%3A%22surface%22%2C%22surface%22%3A%22groups_highlight_units%22%7D]%2C%22ref_notif_type%22%3Anull%7D'
  },
  {
    id: 'session-2026-merl',
    city: 'Mosel, Germany',
    country: 'Germany',
    venue: 'Scheid Wein - Merl and der Mosel',
    address: 'Hauptstraße 50, 56856 Zell (Mosel)',
    date: 'July 17, 2026',
    time: 'TBA',
    status: 'upcoming',
    coordinates: { lat: 50.0449, lng: 7.1648 },
    ticketsUrl: 'https://scheid-wein.de/'
  }
];