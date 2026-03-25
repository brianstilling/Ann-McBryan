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
    id: 'session-2026-grenaa',
    city: 'Grenaa, Denmark',
    country: 'Denmark',
    venue: 'Grenaa Strand Camping',
    address: 'Exclusive session for campsite guests',
    date: 'July 2, 2026',
    time: 'TBA',
    status: 'upcoming',
    coordinates: { lat: 56.4097, lng: 10.9234 },
    ticketsUrl: 'https://grenaastrandcamping.dk/'
  },
  {
    id: 'session-2026-braedstrup',
    city: 'Brædstrup, Denmark',
    country: 'Denmark',
    venue: 'Water of Life',
    address: 'Søndergade 1, 8740 Brædstrup',
    date: 'July 3, 2026',
    time: '16:00',
    status: 'upcoming',
    coordinates: { lat: 55.9730, lng: 9.6100 },
    ticketsUrl: 'https://wateroflife.dk/'
  },
  {
    id: 'session-2026-leipzig-5',
    city: 'Rackwitz (Leipzig), Germany',
    country: 'Germany',
    venue: 'The Beachclub at Schladitzer see - All-on-Sea Camp & Sport Resort',
    address: 'Haynaer Straße 1, 04519 Rackwitz',
    date: 'July 5, 2026',
    time: 'TBA',
    status: 'upcoming',
    coordinates: { lat: 51.43685, lng: 12.3427 },
    ticketsUrl: 'https://www.campdavid-sportresort.de/'
  },
  {
    id: 'session-2026-leipzig-6',
    city: 'Leipzig, Germany',
    country: 'Germany',
    venue: 'To be announced concert',
    address: 'Leipzig, Germany',
    date: 'July 6, 2026',
    time: 'TBA',
    status: 'upcoming',
    coordinates: { lat: 51.3397, lng: 12.3731 }
  },
  {
    id: 'session-2026-leipzig-7',
    city: 'Leipzig, Germany',
    country: 'Germany',
    venue: 'To be announced concert',
    address: 'Leipzig, Germany',
    date: 'July 7, 2026',
    time: 'TBA',
    status: 'upcoming',
    coordinates: { lat: 51.3397, lng: 12.3731 }
  },
  {
    id: 'session-2026-merl',
    city: 'Mosel, Germany',
    country: 'Germany',
    venue: 'Scheid Wein - Merl an der Mosel',
    address: 'Hauptstraße 50, 56856 Zell (Mosel)',
    date: 'July 17, 2026',
    time: 'TBA',
    status: 'upcoming',
    coordinates: { lat: 50.0449, lng: 7.1648 },
    ticketsUrl: 'https://scheid-wein.de/'
  },
  {
    id: 'session-2026-merl-2',
    city: 'Mosel, Germany',
    country: 'Germany',
    venue: 'Scheid Wein - Merl an der Mosel',
    address: 'Hauptstraße 50, 56856 Zell (Mosel)',
    date: 'July 19, 2026',
    time: 'TBA',
    status: 'upcoming',
    coordinates: { lat: 50.0449, lng: 7.1648 },
    ticketsUrl: 'https://scheid-wein.de/'
  },
  {
    id: 'session-2026-enkirch',
    city: 'Mosel, Germany',
    country: 'Germany',
    venue: "Tom's Musik-Keller",
    address: 'Weingasse 12, 56850 Enkirch',
    date: 'July 23, 2026',
    time: '20:00',
    status: 'upcoming',
    coordinates: { lat: 49.9833, lng: 7.1167 },
    ticketsUrl: 'https://www.t-o-m-s.de/'
  },
  {
    id: 'session-2026-wijchen',
    city: 'Wijchen, The Netherlands',
    country: 'The Netherlands',
    venue: 'Kasteel Wijchen',
    address: 'Kasteellaan 9, 6602 DA Wijchen',
    date: 'July 27, 2026',
    time: 'TBA',
    status: 'upcoming',
    coordinates: { lat: 51.8105, lng: 5.7228 },
    ticketsUrl: 'https://www.kasteelwijchen.nl/'
  }
];