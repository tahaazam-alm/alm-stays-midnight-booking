// Mock data for the stays funnel (Dubai, from the production screenshots in /reference).
import five from './assets/hotel-five.jpg'
import sofitel from './assets/hotel-sofitel.jpg'
import suite from './assets/room-suite.jpg'
import suite2 from './assets/room-suite-2.jpg'

export const RECENT_DESTINATIONS = [
  { name: 'FIVE Palm Jumeirah Dubai', region: 'United Arab Emirates, Dubai', hotelId: 'five' },
  { name: 'Anantara The Palm Dubai Resort', region: 'United Arab Emirates, Dubai', hotelId: 'anantara' },
  { name: 'Anantara Mina Ras Al Khaimah Resort', region: 'United Arab Emirates, Ras Al-Khaimah' },
  { name: 'Emirates Park Zoo and Resort', region: 'United Arab Emirates, Abu Dhabi' },
]

export const POPULAR_CITIES = [
  { name: 'Dubai', region: 'United Arab Emirates' },
  { name: 'Riyadh', region: 'Saudi Arabia' },
  { name: 'Jeddah', region: 'Saudi Arabia' },
  { name: 'Makkah', region: 'Saudi Arabia' },
  { name: 'Abu Dhabi', region: 'United Arab Emirates' },
]

export const HOTELS = [
  {
    id: 'five', name: 'FIVE Palm Jumeirah Dubai', image: five, stars: 5, type: '5-star Resort',
    address: 'No. 1 The Palm, Dubai, United Arab Emirates', area: 'Palm Jumeirah',
    score: 8.0, scoreLabel: 'Very good', reviews: 1003, price: 2008, was: 2788,
    blurb: 'The hotel offers a vibrant atmosphere with excellent amenities.',
    subScores: [['Cleanliness', 8.8], ['Service', 8.2], ['Property condition', 8.6]],
    recentReviews: [['One of the most beautiful hotels', 'MOHAMMED', 'October 2026'], ['The hotel is very beautiful.', 'Salman', 'October 2026']],
    landmarks: [['Iconic Landmark', 'Palm Jumeirah', '1.3 km'], ['Shopping', 'Nakheel Mall', '1.4 km'], ['Transport', 'Al Khail Metro', '2.0 km']],
  },
  {
    id: 'sofitel', name: 'Sofitel Dubai The Palm Resort & Spa', image: sofitel, stars: 5, type: '5-star Resort',
    address: 'East Crescent Road, Dubai, United Arab Emirates, 55558', area: 'Palm Jumeirah',
    score: 8.6, scoreLabel: 'Excellent', reviews: 2214, price: 1564,
  },
  {
    id: 'anantara', name: 'Anantara The Palm Dubai Resort', image: five, stars: 5, type: '5-star Resort',
    address: 'East Crescent, Palm Jumeirah, Dubai, United Arab Emirates', area: 'Palm Jumeirah',
    score: 8.8, scoreLabel: 'Excellent', reviews: 1876, price: 1395, was: 1640,
  },
  {
    id: 'rove', name: 'Rove Downtown', image: sofitel, stars: 3, type: '3-star Hotel',
    address: '312 Al Sa\'ada Street, Downtown Dubai, United Arab Emirates', area: 'Downtown',
    score: 8.4, scoreLabel: 'Very good', reviews: 5120, price: 489,
  },
]

// Room types for the hotel details page (same for every hotel in the base prototype).
export const ROOMS = [
  {
    id: 'suite-kq', name: 'Luxury Two-Bedroom Suite - King Bed and 2 Queen Beds', image: suite, photos: 9,
    size: '163 m²', beds: 'King Bed and 2 Queen Beds', fits: 'for 3 Adults · 1 Child',
    rates: [
      { id: 'hb', board: 'Half board', refundable: false, perk: 'Including Breakfast + Lunch (or Dinner) for 2 guests', price: 2003 },
    ],
  },
  {
    id: 'suite', name: 'Luxury Two-Bedroom Suite', image: suite2, photos: 9,
    size: '163 m²', beds: 'Bed assigned at check-in', fits: 'for 3 Adults · 1 Child',
    rates: [
      { id: 'ro', board: 'Room only', refundable: false, price: 2008 },
      { id: 'bb', board: 'Bed and breakfast', refundable: true, perk: 'Including Breakfast for 2 guests', price: 2240 },
    ],
  },
]

export const SHUKRANS = 1112
