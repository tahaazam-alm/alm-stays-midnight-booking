// Mock data for the stays funnel: Riyadh's top 5 "Recommended" stays on almosafer.com, read in Chrome (20–21 Nov 2026, 2 adults),
// with their real photos, scores, reviews, landmarks and room types. Prices are the site's, shown as SAR.
import narcissus from './assets/riyadh/narcissus.jpg'
import narcissusTwin from './assets/riyadh/narcissus-twin.jpg'
import narcissusTower from './assets/riyadh/narcissus-tower.jpg'
import narcissusSuite from './assets/riyadh/narcissus-suite.jpg'
import aloft from './assets/riyadh/aloft.jpg'
import aloftKing from './assets/riyadh/aloft-king.jpg'
import aloftQueen from './assets/riyadh/aloft-queen.jpg'
import aloftSuite from './assets/riyadh/aloft-suite.jpg'
import radisson from './assets/riyadh/radisson.jpg'
import radissonStandard from './assets/riyadh/radisson-standard.jpg'
import radissonSuperior from './assets/riyadh/radisson-superior.jpg'
import radissonSuite from './assets/riyadh/radisson-suite.jpg'
import movenpick from './assets/riyadh/movenpick.jpg'
import movenpickSuperior from './assets/riyadh/movenpick-superior.jpg'
import movenpickDeluxe from './assets/riyadh/movenpick-deluxe.jpg'
import movenpickSuite from './assets/riyadh/movenpick-suite.jpg'
import hilton from './assets/riyadh/hilton.jpg'
import hiltonTwin from './assets/riyadh/hilton-twin.jpg'
import hiltonKing from './assets/riyadh/hilton-king.jpg'
import hiltonApartment from './assets/riyadh/hilton-apartment.jpg'
// London's top 5 "Recommended" stays, read in Chrome the same way
import cumberland from './assets/london/cumberland.jpg'
import cumberlandTwin from './assets/london/cumberland-twin.jpg'
import cumberlandKing from './assets/london/cumberland-king.jpg'
import cumberlandFamily from './assets/london/cumberland-family.jpg'
import millennium from './assets/london/millennium.jpg'
import millenniumDeluxe from './assets/london/millennium-deluxe.jpg'
import millenniumFamily from './assets/london/millennium-family.jpg'
import millenniumSofa from './assets/london/millennium-sofa.jpg'
import lancaster from './assets/london/lancaster.jpg'
import lancasterClassic from './assets/london/lancaster-classic.jpg'
import lancasterDeluxe from './assets/london/lancaster-deluxe.jpg'
import lancasterCorner from './assets/london/lancaster-corner.jpg'
import copthorne from './assets/london/copthorne.jpg'
import copthorneStandard from './assets/london/copthorne-standard.jpg'
import copthorneSuperior from './assets/london/copthorne-superior.jpg'
import copthorneFamily from './assets/london/copthorne-family.jpg'
import marblearch from './assets/london/marblearch.jpg'
import marblearchStandard from './assets/london/marblearch-standard.jpg'
import marblearchDeluxe from './assets/london/marblearch-deluxe.jpg'
import marblearchExecutive from './assets/london/marblearch-executive.jpg'
// Dubai's top 5 "Recommended" stays, read in Chrome the same way
import hyde from './assets/dubai/hyde.jpg'
import hydeBalcony from './assets/dubai/hyde-balcony.jpg'
import hydeKing from './assets/dubai/hyde-king.jpg'
import hydeCanal from './assets/dubai/hyde-canal.jpg'
import rove from './assets/dubai/rove.jpg'
import roveRover from './assets/dubai/rove-rover.jpg'
import sls from './assets/dubai/sls.jpg'
import slsKing from './assets/dubai/sls-king.jpg'
import slsDouble from './assets/dubai/sls-double.jpg'
import slsStudio from './assets/dubai/sls-studio.jpg'
import bustan from './assets/dubai/bustan.jpg'
import bustanClassic from './assets/dubai/bustan-classic.jpg'
import bustanTwin from './assets/dubai/bustan-twin.jpg'
import bustanDeluxe from './assets/dubai/bustan-deluxe.jpg'
import paramount from './assets/dubai/paramount.jpg'
import paramountStandard from './assets/dubai/paramount-standard.jpg'
import paramountDowntown from './assets/dubai/paramount-downtown.jpg'

const RIYADH = 'Saudi Arabia, Riyadh'

export const RECENT_DESTINATIONS = [
  { name: 'Narcissus The Royal Hotel', region: RIYADH, hotelId: 'narcissus' },
  { name: 'Aloft by Marriott Riyadh', region: RIYADH, hotelId: 'aloft' },
  { name: 'Radisson Riyadh Airport', region: RIYADH, hotelId: 'radisson' },
  { name: 'Jeddah', region: 'Saudi Arabia' },
]

export const POPULAR_CITIES = [
  { name: 'Riyadh', region: 'Saudi Arabia' },
  { name: 'Dubai', region: 'United Arab Emirates', tzBehind: -1 }, // Dubai is 1 hour ahead of Riyadh: 1:30 AM there, 12:30 AM on the phone
  { name: 'London', region: 'United Kingdom', tzBehind: 2 },
  { name: 'Jeddah', region: 'Saudi Arabia' },
  { name: 'Makkah', region: 'Saudi Arabia' },
  { name: 'Abu Dhabi', region: 'United Arab Emirates' },
]

// A room with a room-only rate and, unless `bbOnly`, a bed-and-breakfast rate on top
const room = (id, name, image, beds, price, { size, bb = Math.round(price * 1.3), bbOnly = false, photos = 5 } = {}) => ({
  id, name, image, photos, size, beds, fits: 'for 2 Adults',
  rates: [
    ...(bbOnly ? [] : [{ id: 'ro', board: 'Room only', refundable: true, price }]),
    { id: 'bb', board: 'Bed and breakfast', refundable: true, perk: 'Including Breakfast for 2 guests', price: bbOnly ? price : bb },
  ],
})

// `instant`: eligible for instant (same-night) check-in — only high-quality properties, per the brief.
export const HOTELS = [
  {
    id: 'narcissus', instant: true, name: 'Narcissus The Royal Hotel', image: narcissus, stars: 5, type: '5-star Hotel',
    address: 'Olaya Street, Riyadh, Saudi Arabia',
    score: 9.0, scoreLabel: 'Excellent', reviews: 614, price: 1102,
    blurb: 'An exceptional hotel with luxurious amenities and excellent service.',
    subScores: [['Location', 9.2], ['Cleanliness', 9.4], ['Service', 8.7]],
    recentReviews: [],
    landmarks: [['Popular', 'Al Faisaliah Tower', '350 m'], ['Shopping', 'Al Faisaliah Mall', '278 m'], ['Nature', 'King Salman Park', '3.2 km']],
    rooms: [
      room('twin', 'Deluxe Room - 2 Single Beds', narcissusTwin, '2 Single Beds', 1102, { bbOnly: true, photos: 4 }),
      room('tower', 'Deluxe Room - King Bed (Kingdom Tower View)', narcissusTower, 'King Bed', 1444, { bbOnly: true, photos: 4 }),
      room('suite', 'Junior Suite - King Bed', narcissusSuite, 'King Bed', 2769, { bbOnly: true }),
    ],
  },  {
    id: 'aloft', instant: true, name: 'Aloft by Marriott Riyadh', image: aloft, stars: 3, type: '3-star Hotel',
    address: '2385 Olaya Street, Riyadh, Saudi Arabia, 12611-9242',
    score: 9.1, scoreLabel: 'Excellent', reviews: 790, price: 276,
    blurb: 'The hotel offers excellent service, cleanliness, and a great location.',
    subScores: [['Location', 9.2], ['Cleanliness', 9.3], ['Service', 8.9]],
    recentReviews: [['Nice place', 'SADEEM', 'October 2026'], ['Cleanliness and spacious reception', 'Mohammed', 'October 2026'], ['Clean', 'Muhanna', 'October 2026']],
    landmarks: [['Popular', 'Al Faisaliah Tower', '1.4 km'], ['Shopping', 'Al Faisaliah Mall', '1.2 km'], ['Nature', 'King Salman Park', '3.9 km']],
    rooms: [
      room('king', 'Aloft Room - King Bed', aloftKing, 'King Bed', 276, { photos: 8 }),
      room('queen', 'Aloft Room - 2 Queen Beds', aloftQueen, '2 Queen Beds', 276),
      room('suite', 'Aloft Suite - King Bed', aloftSuite, 'King Bed', 607),
    ],
  },  {
    id: 'radisson', instant: true, name: 'Radisson Riyadh Airport', image: radisson, stars: 4, type: '4-star Hotel',
    address: 'Muhammad Ibn Farj, Road 5333, Riyadh, Saudi Arabia, 13442',
    score: 8.6, scoreLabel: 'Excellent', reviews: 949, price: 502,
    blurb: 'The hotel offers a luxurious stay with excellent facilities and service.',
    subScores: [['Location', 8.8], ['Cleanliness', 8.6], ['Service', 7.8]],
    recentReviews: [['I thank the receptionist for her hospitality and help', 'Munirah', 'October 2026'], ['A beautiful and quiet hotel', 'Abdullah', 'October 2026']],
    landmarks: [['Airport', 'King Khalid International Airport', '5.0 km'], ['Entertainment', 'Riyadh Front', '16.9 km']],
    rooms: [
      room('standard', 'Standard Room - 2 Single Beds', radissonStandard, '2 Single Beds', 502, { size: '62 m²', bb: 679 }),
      room('superior', 'Superior Room - King Bed', radissonSuperior, 'King Bed', 603, { size: '62 m²', bb: 780, photos: 8 }),
      room('suite', 'Standard Two-Bedroom Suite - King Bed', radissonSuite, 'King Bed', 1406, { size: '124 m²', bb: 1583, photos: 19 }),
    ],
  },
  {
    id: 'movenpick', instant: true, name: 'Movenpick Hotel And Residences Riyadh', image: movenpick, stars: 5, type: '5-star Hotel',
    address: '3478 North Ring Road Exit 4, Riyadh, Saudi Arabia, 13311',
    score: 9.2, scoreLabel: 'Excellent', reviews: 998, price: 753,
    blurb: 'A beautiful hotel with excellent facilities and friendly staff.',
    subScores: [['Location', 9.5], ['Cleanliness', 9.4], ['Service', 9.0]],
    recentReviews: [['Everything is wonderful and the team is helpful', 'Noura', 'October 2026'], ['One of the best hotels', 'MSHARI', 'October 2026']],
    landmarks: [['Attraction', 'King Abdullah Financial District', '1.0 km'], ['Transport', 'KAFD Metro', '1.1 km'], ['Shopping', 'Riyadh Gallery Mall', '2.2 km']],
    rooms: [
      room('superior', 'Superior Room - King Bed', movenpickSuperior, 'King Bed', 753, { bb: 874 }),
      room('deluxe', 'Deluxe Room - King Bed', movenpickDeluxe, 'King Bed', 803, { bb: 924 }),
      room('suite', 'Junior Suite', movenpickSuite, 'Bed assigned at check-in', 1205, { bb: 1326 }),
    ],
  },
  {
    id: 'hilton', instant: true, name: 'Hilton Riyadh Hotel & Residences', image: hilton, stars: 5, type: '5-star Hotel',
    address: '6623 Al Shohadaa – Eastern Ring Road, Riyadh, Saudi Arabia',
    score: 8.7, scoreLabel: 'Excellent', reviews: 843, price: 681,
    blurb: 'Exceptional hotel with spacious rooms and attentive staff.',
    subScores: [['Location', 9.3], ['Cleanliness', 8.9], ['Service', 8.4]],
    recentReviews: [['A stay that is more than wonderful, thank you very much.', 'Seham', 'October 2026'], ['Wonderful stay', 'Meqren', 'August 2026']],
    landmarks: [['Shopping', 'Granada Mall', '500 m'], ['Business', 'Riyadh Exhibition & Convention Center', '3.5 km'], ['Airport', 'King Khalid International Airport', '19.4 km']],
    rooms: [
      room('twin', 'Standard Room - 2 Single Beds', hiltonTwin, '2 Single Beds', 681, { size: '38 m²', bbOnly: true }),
      room('deluxe', 'Deluxe Room - King Bed', hiltonKing, 'King Bed', 723, { size: '48 m²', bbOnly: true }),
      room('apartment', 'Deluxe One-Bedroom Apartment - King Bed', hiltonApartment, 'King Bed', 850, { size: '97 m²', bbOnly: true }),
    ],
  },
]

// London's top 5 "Recommended" stays on almosafer.com, read in Chrome (20–21 Nov 2026, 2 adults)
export const LONDON_HOTELS = [
  {
    id: 'cumberland', instant: true, name: 'The Cumberland, London', image: cumberland, stars: 4, type: '4-star Hotel',
    address: 'Great Cumberland Place, London, United Kingdom',
    score: 8.4, scoreLabel: 'Very good', reviews: 674, price: 2286,
    blurb: 'The hotel offers a fantastic location and cleanliness.',
    subScores: [['Cleanliness', 8.8], ['Service', 8.8], ['Property condition', 8.8]],
    recentReviews: [['Location is everything.', 'Ahmed', 'October 2026'], ['Wonderful in every sense of the word', 'Mohammad', 'October 2026']],
    landmarks: [['Attraction', 'Marble Arch', '48 m'], ['Nature', 'Hyde Park', '848 m'], ['Popular', 'Buckingham Palace', '1.8 km']],
    rooms: [
      room('twin', 'Executive Room - 2 Single Beds', cumberlandTwin, '2 Single Beds', 2286, { bb: 2737 }),
      room('king', 'Executive Room - King Bed', cumberlandKing, 'King Bed', 2341, { size: '26 m²', bb: 2737 }),
      room('family', 'Family Room', cumberlandFamily, 'Bed assigned at check-in', 2380, { size: '28 m²', bb: 2836 }),
    ],
  },
  {
    id: 'millennium', instant: true, name: 'Millennium Hotel and Conference Centre Gloucester London', image: millennium, stars: 4, type: '4-star Hotel',
    address: '4-18 Harrington Gardens, London, United Kingdom',
    score: 7.8, scoreLabel: 'Very good', reviews: 1978, price: 1105,
    blurb: 'Spacious rooms, a great location and friendly, helpful staff.',
    subScores: [['Cleanliness', 8.2], ['Service', 8.2], ['Property condition', 7.6]],
    recentReviews: [['Excellent.', 'MOHAMMED', 'October 2026'], ['The location', 'NORAH', 'October 2026']],
    landmarks: [['Attraction', 'Natural History Museum', '594 m'], ['Popular', 'Royal Albert Hall', '986 m'], ['Nature', 'Holland Park', '1.9 km']],
    rooms: [
      room('deluxe', 'Deluxe Room', millenniumDeluxe, 'Bed assigned at check-in', 1105, { size: '18 m²', bb: 1252 }),
      room('sofa', 'Deluxe Room - 1 Double Bed and Sofa Bed', millenniumSofa, '1 Double Bed and Sofa Bed', 1345, { size: '20 m²', bb: 1494 }),
      room('family', 'Deluxe Family Room - 2 Beds Double', millenniumFamily, '2 Double Beds', 1345, { size: '26 m²', bb: 1494 }),
    ],
  },
  {
    id: 'lancaster', instant: true, name: 'Royal Lancaster London', image: lancaster, stars: 5, type: '5-star Hotel',
    address: 'Lancaster Terrace, London, United Kingdom',
    score: 9.4, scoreLabel: 'Excellent', reviews: 1000, price: 2494,
    blurb: 'The hotel offers excellent service, cleanliness, and a prime location.',
    subScores: [['Cleanliness', 9.8], ['Service', 9.4], ['Property condition', 9.6]],
    recentReviews: [['One of the best hotels in London', 'Hathal', 'October 2026'], ['Everything is beautiful at the hotel', 'Meshal', 'August 2026']],
    landmarks: [['Transport', 'Elizabeth Line', '568 m'], ['Nature', 'Hyde Park', '866 m'], ['Attraction', 'Marble Arch', '1.1 km']],
    rooms: [
      room('classic', 'Classic Room', lancasterClassic, 'Bed assigned at check-in', 2494, { size: '20 m²', bb: 2981 }),
      room('deluxe', 'Deluxe Room', lancasterDeluxe, 'Bed assigned at check-in', 2694, { size: '20 m²', bb: 3194 }),
      room('corner', 'Corner Deluxe Room', lancasterCorner, 'Bed assigned at check-in', 2828, { size: '25 m²', bb: 3650 }),
    ],
  },
  {
    id: 'copthorne', instant: true, name: 'Copthorne Tara Hotel London Kensington', image: copthorne, stars: 4, type: '4-star Hotel',
    address: 'Scarsdale Place, London, United Kingdom',
    score: 7.4, scoreLabel: 'Good', reviews: 297, price: 909,
    blurb: 'A great location near the metro, with friendly staff and clean rooms.',
    subScores: [['Location', 8.4], ['Cleanliness', 7.4], ['Service', 7.1]],
    recentReviews: [['The room is spacious and the location is beautiful, near the metro station.', 'Hattan', 'October 2026'], ['Very good', 'Ibrahim', 'October 2026']],
    landmarks: [['Attraction', 'Kensington Palace', '641 m'], ['Popular', 'Royal Albert Hall', '1.0 km'], ['Nature', 'Holland Park', '1.0 km']],
    rooms: [
      room('standard', 'Standard Room - 1 Double Bed', copthorneStandard, '1 Double Bed', 909, { size: '22 m²', bb: 1105 }),
      room('superior', 'Superior Room - 2 Single Beds', copthorneSuperior, '2 Single Beds', 989, { size: '21 m²', bb: 1185 }),
      room('family', 'Family Room - 2 Beds Double', copthorneFamily, '2 Double Beds', 2368, { size: '42 m²', bb: 2564 }),
    ],
  },
  {
    id: 'marblearch', instant: true, name: 'The Marble Arch Hotel By Thistle', image: marblearch, stars: 4, type: '4-star Hotel',
    address: 'Bryanston Street, London, United Kingdom',
    score: 7.8, scoreLabel: 'Very good', reviews: 1013, price: 2388,
    blurb: 'Guests love the prime location and the friendly staff.',
    subScores: [['Location', 9.5], ['Cleanliness', 7.9], ['Service', 7.3]],
    recentReviews: [['The location is amazing, close to everything.', 'Muteb', 'October 2026']],
    landmarks: [['Attraction', 'Marble Arch', '220 m'], ['Nature', 'Hyde Park', '1.0 km'], ['Transport', 'Northern Line', '1.0 km']],
    rooms: [
      room('standard', 'Standard Room', marblearchStandard, 'Bed assigned at check-in', 2388, { size: '21 m²', bb: 2791 }),
      room('deluxe', 'Deluxe Room - King Bed', marblearchDeluxe, 'King Bed', 2484, { size: '27 m²', bb: 2893 }),
      room('executive', 'Executive Room - King Bed', marblearchExecutive, 'King Bed', 2682, { size: '32 m²', bb: 3048 }),
    ],
  },
]

// Dubai's top 5 "Recommended" stays on almosafer.com, read in Chrome (20–21 Nov 2026, 2 adults)
export const DUBAI_HOTELS = [
  {
    id: 'hyde', instant: true, name: 'Hyde Hotel Dubai', image: hyde, stars: 5, type: '5-star Hotel',
    address: 'Business Bay, Dubai, United Arab Emirates',
    score: 9.2, scoreLabel: 'Excellent', reviews: 150, price: 555,
    blurb: 'The hotel offers excellent service and a beautiful location.',
    subScores: [['Cleanliness', 9.4], ['Service', 9.4], ['Property condition', 9.4]],
    recentReviews: [['The staff is amazing', 'Shahad', 'October 2026'], ['The best location', 'Hind', 'September 2026']],
    landmarks: [['Popular', 'Burj Khalifa', '1.8 km'], ['Shopping', 'Souk Al Bahar', '1.6 km'], ['Entertainment', 'Dubai Opera', '1.7 km']],
    rooms: [
      room('balcony', 'General Admission Room (Balcony)', hydeBalcony, 'Bed assigned at check-in', 555, { bb: 654 }),
      room('king', 'General Admission Room - King Bed (Balcony)', hydeKing, 'King Bed', 556, { size: '40 m²', bb: 654 }),
      room('canal', 'General Admission Room - 2 Single Beds - Canal View (Balcony)', hydeCanal, '2 Single Beds', 617, { size: '40 m²', bb: 715 }),
    ],
  },
  {
    id: 'rove', instant: true, name: 'Rove City Walk', image: rove, stars: 3, type: '3-star Hotel',
    address: 'Al Wasl and Al Safa road-junction, Dubai, United Arab Emirates',
    score: 9.2, scoreLabel: 'Excellent', reviews: 898, price: 550,
    blurb: 'Exceptional family-friendly hotel with outstanding staff and location.',
    subScores: [['Cleanliness', 9.6], ['Service', 9.4], ['Property condition', 9.4]],
    recentReviews: [['A beautiful and classy hotel', 'Fahad', 'September 2026'], ['An amazing hotel and a wonderful experience.', 'Mohamed', 'September 2026']],
    landmarks: [['Entertainment', 'Coca-Cola Arena', '58 m'], ['Transport', 'Burj Khalifa/ Dubai Mall Metro Station', '447 m'], ['Popular', 'Burj Khalifa', '1.1 km']],
    rooms: [
      room('rover', 'Rover Room - King Bed and Single Bed/Futon bed', roveRover, 'King Bed and Single Bed/Futon bed', 550, { bb: 685 }),
      room('twin', 'Rover Room - 2 Single Beds', roveRover, '2 Single Beds', 555, { bb: 691 }),
      room('city', 'Standard Room - City View', rove, 'Bed assigned at check-in', 633, { bb: 685 }),
    ],
  },
  {
    id: 'sls', instant: true, name: 'SLS Dubai Hotel & Residences', image: sls, stars: 5, type: '5-star Hotel',
    address: 'Marsi Drive, Dubai, United Arab Emirates',
    score: 8.6, scoreLabel: 'Excellent', reviews: 189, price: 1171,
    blurb: 'The hotel offers beautiful views and a great location.',
    subScores: [['Cleanliness', 9.2], ['Service', 8.8], ['Property condition', 9.0]],
    recentReviews: [['Beautiful and its location is excellent', 'Arwa', 'October 2026'], ['A luxurious and wonderful hotel', 'Naif', 'September 2026']],
    landmarks: [['Attraction', 'Dubai Design District', '656 m'], ['Shopping', 'Souk Al Bahar', '1.9 km'], ['Popular', 'Burj Khalifa', '2.3 km']],
    rooms: [
      room('king', 'Signature Room - King Bed (Balcony)', slsKing, 'King Bed', 1171, { size: '46 m²', bb: 1392 }),
      room('double', 'Signature Room - 2 Beds Double - City View', slsDouble, '2 Beds Double', 1294, { size: '46 m²', bb: 1514 }),
      room('studio', 'Urban Living Studio - King Bed (Balcony)', slsStudio, 'King Bed', 1294, { bb: 1514 }),
    ],
  },
  {
    id: 'bustan', instant: true, name: 'Mövenpick Grand Al Bustan Dubai', image: bustan, stars: 5, type: '5-star Hotel',
    address: 'Casablanca Road, Al Garhoud, Dubai, United Arab Emirates',
    score: 8.3, scoreLabel: 'Very good', reviews: 422, price: 399,
    blurb: 'This hotel offers spacious rooms and excellent service.',
    subScores: [['Location', 8.4], ['Cleanliness', 8.5], ['Service', 8.4]],
    recentReviews: [['A clean and comfortable hotel', 'Rajaa', 'September 2026'], ['The hotel is clean, the rooms are spacious, and it is in a quiet location.', 'Khaled', 'August 2026']],
    landmarks: [['Transport', 'GGICO Metro Station', '567 m'], ['Shopping', 'City Centre Deira', '1.3 km'], ['Airport', 'DXB Airport - Dubai International Airport', '2.1 km']],
    rooms: [
      room('classic', 'Classic Room - King Bed', bustanClassic, 'King Bed', 399, { size: '34 m²', bb: 479 }),
      room('twin', 'Classic Room - 2 Single Beds', bustanTwin, '2 Single Beds', 399, { size: '34 m²', bb: 479 }),
      room('deluxe', 'Deluxe Room - King Bed', bustanDeluxe, 'King Bed', 452, { size: '43 m²', bb: 545 }),
    ],
  },
  {
    id: 'paramount', instant: true, name: 'Paramount Hotel Dubai', image: paramount, stars: 5, type: '5-star Hotel',
    address: 'Business Bay, Dubai, United Arab Emirates',
    score: 8.2, scoreLabel: 'Very good', reviews: 169, price: 692,
    blurb: 'The hotel offers a beautiful location and friendly staff.',
    subScores: [['Cleanliness', 8.8], ['Service', 8.4], ['Property condition', 8.6]],
    recentReviews: [['Nice and suitable for families', 'Sahar', 'October 2026'], ['Great hotel and helpful staff', 'Amer', 'September 2026']],
    landmarks: [['Attraction', 'Dubai Design District', '598 m'], ['Shopping', 'Souk Al Bahar', '1.7 km'], ['Popular', 'Burj Khalifa', '2.1 km']],
    rooms: [
      room('king', 'Standard Room - King Bed (Scene)', paramountStandard, 'King Bed', 692, { size: '40 m²', bb: 806 }),
      room('twin', 'Standard Room - 2 Single Beds (Scene)', paramountStandard, '2 Single Beds', 692, { size: '40 m²', bb: 806 }),
      room('downtown', 'Standard Room - King Bed - Downtown View (Scene)', paramountDowntown, 'King Bed', 754, { size: '43 m²', bb: 866 }),
    ],
  },
]

// Which city's hotels a search shows (London and Dubai searches show their own, everything else Riyadh's), and its counts
const inCity = (dest, city) => dest?.name === city || !!dest?.region?.endsWith(city)
export const hotelsFor = (dest) => (inCity(dest, 'London') ? LONDON_HOTELS : inCity(dest, 'Dubai') ? DUBAI_HOTELS : HOTELS)
const COUNTS = new Map([[LONDON_HOTELS, { all: '9,300', tonight: '1,240' }], [DUBAI_HOTELS, { all: '7,580', tonight: '1,020' }]])
export const countsFor = (dest) => COUNTS.get(hotelsFor(dest)) || { all: '1,214', tonight: '186' }

export const SHUKRANS = 1112

// Arabic for every user-facing string in the mock data above, keyed by the English. Read with useCopy().d(text).
export const DATA_AR = {
  // Places
  'Dubai': 'دبي', 'Riyadh': 'الرياض', 'London': 'لندن', 'Jeddah': 'جدة', 'Makkah': 'مكة المكرمة', 'Abu Dhabi': 'أبوظبي',
  'United Arab Emirates': 'الإمارات العربية المتحدة', 'Saudi Arabia': 'المملكة العربية السعودية', 'United Kingdom': 'المملكة المتحدة',
  'United Arab Emirates, Dubai': 'الإمارات العربية المتحدة، دبي',
  'United Arab Emirates, Ras Al-Khaimah': 'الإمارات العربية المتحدة، رأس الخيمة',
  'United Arab Emirates, Abu Dhabi': 'الإمارات العربية المتحدة، أبوظبي',
  'Dubai, United Arab Emirates': 'دبي، الإمارات العربية المتحدة',
  'Palm Jumeirah': 'نخلة جميرا', 'Downtown': 'وسط المدينة',
  'Saudi Arabia, Riyadh': 'المملكة العربية السعودية، الرياض', 'Riyadh, Saudi Arabia': 'الرياض، المملكة العربية السعودية',
  // Hotels
  'Narcissus The Royal Hotel': 'فندق نارسيس الملكي',
  'Aloft by Marriott Riyadh': 'ألوفت الرياض من ماريوت',
  'Radisson Riyadh Airport': 'راديسون مطار الرياض',
  'Movenpick Hotel And Residences Riyadh': 'فندق ومساكن موفنبيك الرياض',
  'Hilton Riyadh Hotel & Residences': 'فندق ومساكن هيلتون الرياض',
  '5-star Hotel': 'فندق 5 نجوم', '4-star Hotel': 'فندق 4 نجوم', '3-star Hotel': 'فندق 3 نجوم',
  'Olaya Street, Riyadh, Saudi Arabia': 'شارع العليا، الرياض، المملكة العربية السعودية',
  '2385 Olaya Street, Riyadh, Saudi Arabia, 12611-9242': '2385 شارع العليا، الرياض، المملكة العربية السعودية، 12611-9242',
  'Muhammad Ibn Farj, Road 5333, Riyadh, Saudi Arabia, 13442': 'محمد بن فرج، طريق 5333، الرياض، المملكة العربية السعودية، 13442',
  '3478 North Ring Road Exit 4, Riyadh, Saudi Arabia, 13311': '3478 الطريق الدائري الشمالي، مخرج 4، الرياض، المملكة العربية السعودية، 13311',
  '6623 Al Shohadaa – Eastern Ring Road, Riyadh, Saudi Arabia': '6623 الشهداء – الطريق الدائري الشرقي، الرياض، المملكة العربية السعودية',
  'Excellent': 'ممتاز',
  'An exceptional hotel with luxurious amenities and excellent service.': 'فندق استثنائي بمرافق فاخرة وخدمة ممتازة.',
  'The hotel offers excellent service, cleanliness, and a great location.': 'يقدم الفندق خدمة ونظافة ممتازة وموقعًا رائعًا.',
  'The hotel offers a luxurious stay with excellent facilities and service.': 'يوفر الفندق إقامة فاخرة بمرافق وخدمة ممتازة.',
  'A beautiful hotel with excellent facilities and friendly staff.': 'فندق جميل بمرافق ممتازة وموظفين ودودين.',
  'Exceptional hotel with spacious rooms and attentive staff.': 'فندق استثنائي بغرف واسعة وموظفين متعاونين.',
  'Location': 'الموقع', 'Cleanliness': 'النظافة', 'Service': 'الخدمة',
  'Nice place': 'مكان جميل', 'Cleanliness and spacious reception': 'نظافة واستقبال واسع', 'Clean': 'نظيف',
  'I thank the receptionist for her hospitality and help': 'أشكر موظفة الاستقبال على حسن الضيافة والمساعدة',
  'A beautiful and quiet hotel': 'فندق جميل وهادئ',
  'Everything is wonderful and the team is helpful': 'كل شيء رائع والفريق متعاون',
  'One of the best hotels': 'من أفضل الفنادق',
  'A stay that is more than wonderful, thank you very much.': 'إقامة أكثر من رائعة، شكرًا جزيلًا.',
  'Wonderful stay': 'إقامة رائعة',
  'SADEEM': 'سديم', 'Mohammed': 'محمد', 'Muhanna': 'مهنا', 'Munirah': 'منيرة', 'Abdullah': 'عبدالله', 'Noura': 'نورة',
  'MSHARI': 'مشاري', 'Seham': 'سهام', 'Meqren': 'مقرن', 'October 2026': 'أكتوبر 2026', 'August 2026': 'أغسطس 2026', 'September 2026': 'سبتمبر 2026',
  'Entertainment': 'ترفيه', 'Airport': 'مطار', 'Popular': 'شائع', 'Shopping': 'تسوق', 'Nature': 'طبيعة', 'Transport': 'مواصلات',
  'Attraction': 'معلم سياحي', 'Business': 'أعمال',
  'Riyadh Front': 'واجهة الرياض', 'King Khalid International Airport': 'مطار الملك خالد الدولي', 'Al Faisaliah Tower': 'برج الفيصلية',
  'Al Faisaliah Mall': 'الفيصلية مول', 'King Salman Park': 'حديقة الملك سلمان', 'KAFD Metro': 'محطة مترو كافد',
  'King Abdullah Financial District': 'مركز الملك عبدالله المالي', 'Riyadh Gallery Mall': 'الرياض جاليري مول', 'Granada Mall': 'غرناطة مول',
  'Riyadh Exhibition & Convention Center': 'مركز الرياض الدولي للمؤتمرات والمعارض',
  '350 m': '350 م', '278 m': '278 م', '500 m': '500 م', '1.0 km': '1.0 كم', '1.1 km': '1.1 كم', '1.2 km': '1.2 كم', '1.4 km': '1.4 كم',
  '2.2 km': '2.2 كم', '3.2 km': '3.2 كم', '3.5 km': '3.5 كم', '3.9 km': '3.9 كم', '5.0 km': '5.0 كم', '16.9 km': '16.9 كم', '19.4 km': '19.4 كم',
  // Rooms
  'Deluxe Room - 2 Single Beds': 'غرفة ديلوكس - سريران فرديان', 'Deluxe Room - King Bed (Kingdom Tower View)': 'غرفة ديلوكس - سرير كينغ (إطلالة على برج المملكة)',
  'Junior Suite - King Bed': 'جناح جونيور - سرير كينغ',
  'Aloft Room - King Bed': 'غرفة ألوفت - سرير كينغ', 'Aloft Room - 2 Queen Beds': 'غرفة ألوفت - سريران كوين', 'Aloft Suite - King Bed': 'جناح ألوفت - سرير كينغ',
  'Standard Room - 2 Single Beds': 'غرفة قياسية - سريران فرديان', 'Superior Room - King Bed': 'غرفة سوبيريور - سرير كينغ',
  'Standard Two-Bedroom Suite - King Bed': 'جناح قياسي بغرفتي نوم - سرير كينغ',
  'Deluxe Room - King Bed': 'غرفة ديلوكس - سرير كينغ', 'Junior Suite': 'جناح جونيور',
  'Deluxe One-Bedroom Apartment - King Bed': 'شقة ديلوكس بغرفة نوم واحدة - سرير كينغ',
  '38 m²': '38 م²', '48 m²': '48 م²', '62 m²': '62 م²', '97 m²': '97 م²', '124 m²': '124 م²',
  'Bed assigned at check-in': 'يُحدَّد نوع السرير عند تسجيل الوصول', 'King Bed': 'سرير كينغ', '2 Single Beds': 'سريران فرديان', '2 Queen Beds': 'سريران كوين',
  'for 2 Adults': 'لشخصين بالغين',
  'Room only': 'الغرفة فقط', 'Bed and breakfast': 'مبيت وإفطار',
  'Including Breakfast for 2 guests': 'يشمل الإفطار لشخصين',
  // London
  'The Cumberland, London': 'ذا كامبرلاند، لندن',
  'Millennium Hotel and Conference Centre Gloucester London': 'ميلينيوم هوتل آند كونفرانس سنتر جلوسيستر لندن',
  'Royal Lancaster London': 'رويال لانكستر لندن',
  'Copthorne Tara Hotel London Kensington': 'كوبثورن تارا لندن كنسينغتون',
  'The Marble Arch Hotel By Thistle': 'فندق ماربل آرتش باي ثيستل',
  'Great Cumberland Place, London, United Kingdom': 'غريت كامبرلاند بليس، لندن، المملكة المتحدة',
  '4-18 Harrington Gardens, London, United Kingdom': '4-18 هارينغتون غاردنز، لندن، المملكة المتحدة',
  'Lancaster Terrace, London, United Kingdom': 'لانكستر تيراس، لندن، المملكة المتحدة',
  'Scarsdale Place, London, United Kingdom': 'سكارسديل بليس، لندن، المملكة المتحدة',
  'Bryanston Street, London, United Kingdom': 'شارع برايانستون، لندن، المملكة المتحدة',
  'Very good': 'جيد جدًا', 'Good': 'جيد', 'Property condition': 'حالة الفندق',
  'The hotel offers a fantastic location and cleanliness.': 'يتميز الفندق بموقع رائع ونظافة عالية.',
  'Spacious rooms, a great location and friendly, helpful staff.': 'غرف واسعة وموقع رائع وموظفون ودودون ومتعاونون.',
  'The hotel offers excellent service, cleanliness, and a prime location.': 'يقدم الفندق خدمة ونظافة ممتازة وموقعًا مميزًا.',
  'A great location near the metro, with friendly staff and clean rooms.': 'موقع رائع قريب من المترو، مع موظفين ودودين وغرف نظيفة.',
  'Guests love the prime location and the friendly staff.': 'يحب الضيوف الموقع المميز والموظفين الودودين.',
  'Location is everything.': 'الموقع هو كل شيء.', 'Wonderful in every sense of the word': 'رائع بكل معنى الكلمة',
  'Excellent.': 'ممتاز.', 'The location': 'الموقع',
  'One of the best hotels in London': 'من أفضل الفنادق في لندن', 'Everything is beautiful at the hotel': 'كل شيء جميل في الفندق',
  'The room is spacious and the location is beautiful, near the metro station.': 'الغرفة واسعة والموقع جميل وقريب من محطة المترو.',
  'The location is amazing, close to everything.': 'الموقع رائع وقريب من كل شيء.',
  'Ahmed': 'أحمد', 'Mohammad': 'محمد', 'MOHAMMED': 'محمد', 'NORAH': 'نورة', 'Hathal': 'هذال', 'Meshal': 'مشعل',
  'Hattan': 'هتان', 'Ibrahim': 'إبراهيم', 'Muteb': 'متعب',
  'Marble Arch': 'ماربل آرتش', 'Hyde Park': 'هايد بارك', 'Buckingham Palace': 'قصر باكنغهام', 'Natural History Museum': 'متحف التاريخ الطبيعي',
  'Royal Albert Hall': 'قاعة رويال ألبرت', 'Holland Park': 'هولاند بارك', 'Elizabeth Line': 'خط إليزابيث', 'Kensington Palace': 'قصر كنسينغتون',
  'Northern Line': 'الخط الشمالي',
  '48 m': '48 م', '220 m': '220 م', '568 m': '568 م', '594 m': '594 م', '641 m': '641 م', '848 m': '848 م', '866 m': '866 م', '986 m': '986 م',
  '1.8 km': '1.8 كم', '1.9 km': '1.9 كم',
  'Executive Room - 2 Single Beds': 'غرفة تنفيذية - سريران فرديان', 'Executive Room - King Bed': 'غرفة تنفيذية - سرير كينغ', 'Family Room': 'غرفة عائلية',
  'Deluxe Room': 'غرفة ديلوكس', 'Deluxe Room - 1 Double Bed and Sofa Bed': 'غرفة ديلوكس - سرير مزدوج وأريكة سرير',
  'Deluxe Family Room - 2 Beds Double': 'غرفة عائلية ديلوكس - سريران مزدوجان',
  'Classic Room': 'غرفة كلاسيكية', 'Corner Deluxe Room': 'غرفة ديلوكس ركنية',
  'Standard Room - 1 Double Bed': 'غرفة قياسية - سرير مزدوج', 'Superior Room - 2 Single Beds': 'غرفة سوبيريور - سريران فرديان',
  'Family Room - 2 Beds Double': 'غرفة عائلية - سريران مزدوجان', 'Standard Room': 'غرفة قياسية',
  '1 Double Bed': 'سرير مزدوج', '2 Double Beds': 'سريران مزدوجان', '1 Double Bed and Sofa Bed': 'سرير مزدوج وأريكة سرير',
  '18 m²': '18 م²', '20 m²': '20 م²', '21 m²': '21 م²', '22 m²': '22 م²', '25 m²': '25 م²', '26 m²': '26 م²', '27 m²': '27 م²',
  '28 m²': '28 م²', '32 m²': '32 م²', '42 m²': '42 م²',
  // Dubai
  'Hyde Hotel Dubai': 'فندق هايد دبي', 'Rove City Walk': 'روف سيتي ووك', 'SLS Dubai Hotel & Residences': 'فندق ومساكن إس إل إس دبي',
  'Mövenpick Grand Al Bustan Dubai': 'موڤنبيك جراند البستان دبي', 'Paramount Hotel Dubai': 'فندق باراماونت دبي',
  'Business Bay, Dubai, United Arab Emirates': 'الخليج التجاري، دبي، الإمارات العربية المتحدة',
  'Al Wasl and Al Safa road-junction, Dubai, United Arab Emirates': 'تقاطع شارع الوصل وشارع الصفا، دبي، الإمارات العربية المتحدة',
  'Marsi Drive, Dubai, United Arab Emirates': 'مرسى درايف، دبي، الإمارات العربية المتحدة',
  'Casablanca Road, Al Garhoud, Dubai, United Arab Emirates': 'شارع الدار البيضاء، القرهود، دبي، الإمارات العربية المتحدة',
  'The hotel offers excellent service and a beautiful location.': 'يقدم الفندق خدمة ممتازة وموقعًا جميلًا.',
  'Exceptional family-friendly hotel with outstanding staff and location.': 'فندق استثنائي مناسب للعائلات بموظفين وموقع مميزين.',
  'The hotel offers beautiful views and a great location.': 'يتميز الفندق بإطلالات جميلة وموقع رائع.',
  'This hotel offers spacious rooms and excellent service.': 'يقدم هذا الفندق غرفًا واسعة وخدمة ممتازة.',
  'The hotel offers a beautiful location and friendly staff.': 'يتميز الفندق بموقع جميل وموظفين ودودين.',
  'The staff is amazing': 'الموظفون رائعون', 'The best location': 'أفضل موقع',
  'A beautiful and classy hotel': 'فندق جميل وراقٍ', 'An amazing hotel and a wonderful experience.': 'فندق مذهل وتجربة رائعة.',
  'Beautiful and its location is excellent': 'جميل وموقعه ممتاز', 'A luxurious and wonderful hotel': 'فندق فاخر ورائع',
  'A clean and comfortable hotel': 'فندق نظيف ومريح',
  'The hotel is clean, the rooms are spacious, and it is in a quiet location.': 'الفندق نظيف والغرف واسعة وموقعه هادئ.',
  'Nice and suitable for families': 'جميل ومناسب للعائلات', 'Great hotel and helpful staff': 'فندق رائع وموظفون متعاونون',
  'Shahad': 'شهد', 'Hind': 'هند', 'Fahad': 'فهد', 'Mohamed': 'محمد', 'Arwa': 'أروى', 'Naif': 'نايف',
  'Rajaa': 'رجاء', 'Khaled': 'خالد', 'Sahar': 'سحر', 'Amer': 'عامر',
  'Burj Khalifa': 'برج خليفة', 'Souk Al Bahar': 'سوق البحار', 'Dubai Opera': 'دبي أوبرا', 'Coca-Cola Arena': 'كوكا كولا أرينا',
  'Burj Khalifa/ Dubai Mall Metro Station': 'محطة مترو برج خليفة/دبي مول', 'Dubai Design District': 'حي دبي للتصميم',
  'GGICO Metro Station': 'محطة مترو جي جي كو', 'City Centre Deira': 'سيتي سنتر ديرة',
  'DXB Airport - Dubai International Airport': 'مطار دبي الدولي (DXB)',
  '58 m': '58 م', '447 m': '447 م', '567 m': '567 م', '598 m': '598 م', '656 m': '656 م',
  '1.3 km': '1.3 كم', '1.6 km': '1.6 كم', '1.7 km': '1.7 كم', '2.1 km': '2.1 كم', '2.3 km': '2.3 كم',
  'General Admission Room (Balcony)': 'غرفة جنرال أدميشن (مع شرفة)', 'General Admission Room - King Bed (Balcony)': 'غرفة جنرال أدميشن - سرير كينغ (مع شرفة)',
  'General Admission Room - 2 Single Beds - Canal View (Balcony)': 'غرفة جنرال أدميشن - سريران فرديان - إطلالة على القناة (مع شرفة)',
  'Rover Room - King Bed and Single Bed/Futon bed': 'غرفة روفر - سرير كينغ وسرير فردي/فوتون', 'Rover Room - 2 Single Beds': 'غرفة روفر - سريران فرديان',
  'Standard Room - City View': 'غرفة قياسية - إطلالة على المدينة',
  'Signature Room - King Bed (Balcony)': 'غرفة سيغنتشر - سرير كينغ (مع شرفة)', 'Signature Room - 2 Beds Double - City View': 'غرفة سيغنتشر - سريران مزدوجان - إطلالة على المدينة',
  'Urban Living Studio - King Bed (Balcony)': 'استوديو أربن ليفينغ - سرير كينغ (مع شرفة)',
  'Classic Room - King Bed': 'غرفة كلاسيكية - سرير كينغ', 'Classic Room - 2 Single Beds': 'غرفة كلاسيكية - سريران فرديان',
  'Standard Room - King Bed (Scene)': 'غرفة قياسية - سرير كينغ (سين)', 'Standard Room - 2 Single Beds (Scene)': 'غرفة قياسية - سريران فرديان (سين)',
  'Standard Room - King Bed - Downtown View (Scene)': 'غرفة قياسية - سرير كينغ - إطلالة على وسط المدينة (سين)',
  'King Bed and Single Bed/Futon bed': 'سرير كينغ وسرير فردي/فوتون', '2 Beds Double': 'سريران مزدوجان',
  '34 m²': '34 م²', '40 m²': '40 م²', '43 m²': '43 م²', '46 m²': '46 م²',
  // Guest
  'Taha': 'طه', 'Azam': 'أعظم',
}
