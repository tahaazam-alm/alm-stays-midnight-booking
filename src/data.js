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
  { name: 'London', region: 'United Kingdom', tzBehind: 2 },
  { name: 'Jeddah', region: 'Saudi Arabia' },
  { name: 'Makkah', region: 'Saudi Arabia' },
  { name: 'Abu Dhabi', region: 'United Arab Emirates' },
]

// `instant`: eligible for instant (same-night) check-in — only high-quality properties, per the brief.
export const HOTELS = [
  {
    id: 'five', instant: true, name: 'FIVE Palm Jumeirah Dubai', image: five, stars: 5, type: '5-star Resort',
    address: 'No. 1 The Palm, Dubai, United Arab Emirates', area: 'Palm Jumeirah',
    score: 8.0, scoreLabel: 'Very good', reviews: 1003, price: 2008, was: 2788,
    blurb: 'The hotel offers a vibrant atmosphere with excellent amenities.',
    subScores: [['Cleanliness', 8.8], ['Service', 8.2], ['Property condition', 8.6]],
    recentReviews: [['One of the most beautiful hotels', 'MOHAMMED', 'October 2026'], ['The hotel is very beautiful.', 'Salman', 'October 2026']],
    landmarks: [['Iconic Landmark', 'Palm Jumeirah', '1.3 km'], ['Shopping', 'Nakheel Mall', '1.4 km'], ['Transport', 'Al Khail Metro', '2.0 km']],
  },
  {
    id: 'sofitel', instant: true, name: 'Sofitel Dubai The Palm Resort & Spa', image: sofitel, stars: 5, type: '5-star Resort',
    address: 'East Crescent Road, Dubai, United Arab Emirates, 55558', area: 'Palm Jumeirah',
    score: 8.6, scoreLabel: 'Excellent', reviews: 2214, price: 1564,
  },
  {
    id: 'anantara', instant: true, name: 'Anantara The Palm Dubai Resort', image: five, stars: 5, type: '5-star Resort',
    address: 'East Crescent, Palm Jumeirah, Dubai, United Arab Emirates', area: 'Palm Jumeirah',
    score: 8.8, scoreLabel: 'Excellent', reviews: 1876, price: 1395, was: 1640,
  },
  {
    id: 'rove', instant: false, name: 'Rove Downtown', image: sofitel, stars: 3, type: '3-star Hotel',
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
  // Hotels
  'FIVE Palm Jumeirah Dubai': 'فايف بالم جميرا دبي',
  'Sofitel Dubai The Palm Resort & Spa': 'منتجع وسبا سوفيتيل دبي ذا بالم',
  'Anantara The Palm Dubai Resort': 'منتجع أنانتارا ذا بالم دبي',
  'Anantara Mina Ras Al Khaimah Resort': 'منتجع أنانتارا مينا رأس الخيمة',
  'Emirates Park Zoo and Resort': 'منتجع وحديقة حيوانات الإمارات بارك',
  'Rove Downtown': 'روف داون تاون',
  '5-star Resort': 'منتجع 5 نجوم', '3-star Hotel': 'فندق 3 نجوم',
  'No. 1 The Palm, Dubai, United Arab Emirates': 'رقم 1 نخلة جميرا، دبي، الإمارات العربية المتحدة',
  'East Crescent Road, Dubai, United Arab Emirates, 55558': 'طريق الهلال الشرقي، دبي، الإمارات العربية المتحدة، 55558',
  'East Crescent, Palm Jumeirah, Dubai, United Arab Emirates': 'الهلال الشرقي، نخلة جميرا، دبي، الإمارات العربية المتحدة',
  "312 Al Sa'ada Street, Downtown Dubai, United Arab Emirates": '312 شارع السعادة، وسط مدينة دبي، الإمارات العربية المتحدة',
  'Very good': 'جيد جدًا', 'Excellent': 'ممتاز',
  'The hotel offers a vibrant atmosphere with excellent amenities.': 'يتميز الفندق بأجواء حيوية ومرافق ممتازة.',
  'Cleanliness': 'النظافة', 'Service': 'الخدمة', 'Property condition': 'حالة المنشأة',
  'One of the most beautiful hotels': 'من أجمل الفنادق', 'The hotel is very beautiful.': 'الفندق جميل جدًا.',
  'MOHAMMED': 'محمد', 'Salman': 'سلمان', 'October 2026': 'أكتوبر 2026',
  'Iconic Landmark': 'معلم بارز', 'Shopping': 'تسوق', 'Transport': 'مواصلات',
  'Nakheel Mall': 'نخيل مول', 'Al Khail Metro': 'محطة مترو الخيل',
  '1.3 km': '1.3 كم', '1.4 km': '1.4 كم', '2.0 km': '2.0 كم',
  // Rooms
  'Luxury Two-Bedroom Suite - King Bed and 2 Queen Beds': 'جناح فاخر بغرفتي نوم - سرير كينغ وسريران كوين',
  'Luxury Two-Bedroom Suite': 'جناح فاخر بغرفتي نوم',
  '163 m²': '163 م²',
  'King Bed and 2 Queen Beds': 'سرير كينغ وسريران كوين',
  'Bed assigned at check-in': 'يُحدَّد نوع السرير عند تسجيل الوصول',
  'for 3 Adults · 1 Child': 'لـ3 بالغين · طفل واحد',
  'Half board': 'نصف إقامة', 'Room only': 'الغرفة فقط', 'Bed and breakfast': 'مبيت وإفطار',
  'Including Breakfast + Lunch (or Dinner) for 2 guests': 'يشمل الإفطار + الغداء (أو العشاء) لشخصين',
  'Including Breakfast for 2 guests': 'يشمل الإفطار لشخصين',
  // Guest
  'Taha': 'طه', 'Azam': 'أعظم',
}
