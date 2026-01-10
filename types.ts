
export interface Concert {
  id: string;
  city: string;
  country: string;
  venue: string;
  address?: string;
  date: string;
  time: string;
  status: 'upcoming' | 'sold-out' | 'cancelled' | 'private';
  coordinates: {
    lat: number;
    lng: number;
  };
  ticketsUrl?: string;
}

export interface BookingRequest {
  name: string;
  email: string;
  location: string;
  message: string;
}