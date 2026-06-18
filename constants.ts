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
    id: 'session-2026-veggerslev',
    city: 'Veggerslev',
    country: 'Denmark',
    venue: 'Veggerslev Kirke',
    address: 'Veggerslev, Denmark',
    date: 'May 7, 2026',
    time: '19:30',
    status: 'upcoming',
    coordinates: { lat: 56.4583, lng: 10.8583 }
  },
  {
    id: 'session-2026-grenaa-festival',
    city: 'Grenaa, Denmark',
    country: 'Denmark',
    venue: 'Grenaa Gademusiker Festival',
    address: 'Grenaa centrum',
    date: 'May 22, 2026',
    time: '16:00-21:00',
    status: 'upcoming',
    coordinates: { lat: 56.4172, lng: 10.8878 },
    ticketsUrl: 'https://www.grenaagademusikerfestival.dk/'
  },
  {
    id: 'session-2026-bonnerup',
    city: 'Bønnerup, Denmark',
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
    ticketsUrl: 'https://www.facebook.com/events/1698979277942607/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22search%22%7D%2C%7B%22mechanism%22%3A%22attachment%22%2C%22surface%22%3A%22newsfeed%22%7D]%2C%22ref_notif_type%22%3Anull%7D'
  },
  {
    id: 'session-2026-leipzig-5',
    city: 'Rackwitz (Leipzig), Germany',
    country: 'Germany',
    venue: 'The Beachclub at Schladitzer see - All-on-Sea Camp & Sport Resort',
    address: 'Haynaer Straße 1, 04519 Rackwitz',
    date: 'July 5, 2026',
    time: '15:00',
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
    id: 'session-2026-furtwangen-10',
    city: 'Furtwangen, Germany',
    country: 'Germany',
    venue: 'Zum Wilden Michel',
    address: 'Linach 6, 78120 Furtwangen, Germany',
    date: 'July 10, 2026',
    time: 'Details TBA',
    status: 'upcoming',
    coordinates: { lat: 48.0503, lng: 8.2045 },
    ticketsUrl: 'https://www.zumwildenmichel.de/'
  },
  {
    id: 'session-2026-triberg',
    city: 'Triberg, Germany',
    country: 'Germany',
    venue: 'Daheim Triberg',
    address: 'An der Gutach 1, 78098 Triberg',
    date: 'July 11, 2026',
    time: '20:00',
    status: 'upcoming',
    coordinates: { lat: 48.1297, lng: 8.2319 },
    ticketsUrl: 'https://daheim-triberg.de/'
  },
  {
    id: 'session-2026-furtwangen',
    city: 'Furtwangen, Germany',
    country: 'Germany',
    venue: 'Zum Wilden Michel',
    address: 'Linach 6, 78120 Furtwangen, Germany',
    date: 'July 12, 2026',
    time: 'Between 12:00 - 18:00 (details TBA)',
    status: 'upcoming',
    coordinates: { lat: 48.0503, lng: 8.2045 },
    ticketsUrl: 'https://www.zumwildenmichel.de/',
    hidden: true
  },
  {
    id: 'session-2026-geltendorf-private',
    city: 'Geltendorf, Germany',
    country: 'Germany',
    venue: 'Private Event (Kaltenberg)',
    address: 'Kaltenberg, 82269 Geltendorf, Germany',
    date: 'July 12, 2026',
    time: 'TBA',
    status: 'private',
    coordinates: { lat: 48.0130, lng: 11.0116 }
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
    id: 'session-2026-bioul',
    city: 'Bioul, Belgium',
    country: 'Belgium',
    venue: 'Bioul 5537',
    address: 'Bioul 5537, Belgium (More details TBA)',
    date: 'July 25, 2026',
    time: 'TBA',
    status: 'upcoming',
    coordinates: { lat: 50.3323, lng: 4.7981 }
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
  },
  {
    id: 'session-2026-grenaa-pavillonen',
    city: 'Grenaa, Denmark',
    country: 'Denmark',
    venue: 'Pavillonen',
    address: 'Kærvej 11, 8500 Grenaa, Denmark',
    date: 'August 28, 2026',
    time: '20:00 (doors open 19:00)',
    status: 'upcoming',
    coordinates: { lat: 56.4116, lng: 10.8718 },
    ticketsUrl: 'https://www.pavillonen.dk/forside'
  },
  {
    id: 'session-2026-stafet-djursland',
    city: 'Stenvad, Denmark',
    country: 'Denmark',
    venue: 'Stafet for Livet Djursland',
    address: 'Stendyssevej 14, 8586 Stenvad, Denmark',
    date: 'September 12, 2026',
    time: '11:00-13:30',
    status: 'upcoming',
    coordinates: { lat: 56.4411, lng: 10.6552 },
    ticketsUrl: 'https://www.cancer.dk/stafetforlivet/stafetter/djursland/'
  },
  {
    id: 'session-2026-houlbjerg-kirke',
    city: 'Houlbjerg, Denmark',
    country: 'Denmark',
    venue: 'Houlbjerg Kirke',
    address: 'Villungsvej 18, Houlbjerg, Langå, Denmark',
    date: 'September 16, 2026',
    time: '19:30-20:30',
    status: 'upcoming',
    coordinates: { lat: 56.3575, lng: 9.865 },
    ticketsUrl: 'https://www.kultunaut.dk/perl/arrmore/type-nynaut/type-nynaut?ArrNr=20066825'
  }
];
