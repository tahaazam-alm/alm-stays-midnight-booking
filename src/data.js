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

const RIYADH = 'Saudi Arabia, Riyadh'

export const RECENT_DESTINATIONS = [
  { name: 'Narcissus The Royal Hotel', region: RIYADH, hotelId: 'narcissus' },
  { name: 'Aloft by Marriott Riyadh', region: RIYADH, hotelId: 'aloft' },
  { name: 'Radisson Riyadh Airport', region: RIYADH, hotelId: 'radisson' },
  { name: 'Jeddah', region: 'Saudi Arabia' },
]

export const POPULAR_CITIES = [
  { name: 'Riyadh', region: 'Saudi Arabia' },
  { name: 'Dubai', region: 'United Arab Emirates' },
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
  'MSHARI': 'مشاري', 'Seham': 'سهام', 'Meqren': 'مقرن', 'October 2026': 'أكتوبر 2026', 'August 2026': 'أغسطس 2026',
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
  // Guest
  'Taha': 'طه', 'Azam': 'أعظم',
}
