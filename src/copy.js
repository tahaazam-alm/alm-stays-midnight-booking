// All user-facing text, keyed by language. Add `ar` strings when Arabic is enabled.
//   const t = useCopy(); t('destination')
import { useProto } from './shell/PrototypeShell.jsx'

export const copy = {
  en: {
    propertySearch: 'Property Search',
    propertySearchSub: 'Over 1M properties at your fingertips',
    destination: 'Destination',
    checkIn: 'Check in',
    checkOut: 'Check out',
    guests: 'Guests',
    searchStays: 'Search Stays',
    nearbyTonight: 'Search nearby properties for tonight',
    recentSearches: 'Your recent searches',
    clear: 'Clear',
    welcomeBack: 'Welcome back, Taha',
    searchDestination: 'Search destination',
    whereTo: 'Where are you going?',
    autoDetect: 'Auto detect location',
    recent: 'Recent searches',
    popularCities: 'Popular cities',
    selectDates: 'Select dates',
    confirm: 'Confirm',
    maxGuests: 'Maximum number of guests per room is 8',
    addRoom: 'Add another room',
    apply: 'Apply',
    room: 'Room',
    aiPlaceholder: 'Family-friendly stays',
    propertiesFound: (n, city) => `${n} properties found in ${city}`,
    totalFor: (n) => `Total for ${n} night${n === 1 ? '' : 's'} (incl. VAT)`,
    totalForShort: (n) => `Total for ${n} night${n === 1 ? '' : 's'}`,
    availableRooms: 'Available Rooms',
    propertyDetails: 'Property Details',
    otherDates: 'Explore other dates for your trip',
    otherDatesNote: 'Actual prices for suggested dates may vary slightly.',
    recentReviews: 'Recent Reviews',
    guestDetails: 'Guest Details',
    contactDetails: 'Contact details',
    voucherNote: 'Your voucher will be sent to your email.',
    someoneElse: 'I am making this booking for someone else',
    specialRequests: 'Special requests (not guaranteed)',
    rewardTitle: 'Reward you can earn',
    rewardSub: 'This booking is eligible for the following reward',
    continue: 'Continue',
    priceBreakdown: 'Price Breakdown',
    confirmPay: 'Confirm and Pay',
    payWith: 'Pay with',
    rewardOrVoucher: 'Select one reward or apply a voucher code',
    voucherCode: 'Voucher code',
    add: 'Add',
    safe: 'Your transactions are 100% safe with us',
    endTitle: 'End of prototype',
    endBody: 'Payment is where the base funnel stops. Restart to try another scenario.',
    restart: 'Restart',
    notBuilt: 'Not part of this prototype',
  },
  ar: {},
}

export function useCopy() {
  const { lang } = useProto()
  return (key, ...args) => {
    const v = copy[lang]?.[key] ?? copy.en[key] ?? key
    return typeof v === 'function' ? v(...args) : v
  }
}
