// Prototype setup. The control bar above the screen is generated from this file.
//
// platforms / langs: true = live, false = shown as "Upcoming" (greyed out).
// To enable one later, ask Claude to "enable Android" / "add Arabic" — the
// almosafer-prototype skill flips the flag here and makes the screens work.

export default {
  name: 'Midnight Booking',
  hideBasics: true, // Platform, Language and Theme switches hidden from the bar; iOS + light mode only. Language lives in the in-app settings sheet

  platform: 'ios', // starting platform: ios | android | desktop | mobile-web
  lang: 'en', //              starting language: en | ar

  platforms: { ios: true, android: false, desktop: false, 'mobile-web': false },
  langs: { en: true, ar: true },

  // Scenario toggles. The first option is the default. Read with useProto().controls.<id>
  controls: [
    // Settled: the clock is always past midnight (Fri 23 Oct, 1:30 AM at the destination). Picking London in the search
    // makes the traveller abroad (phone on Riyadh time). Search uses the row in the widget, the calendar the date fields,
    // results the navy band, hotel details the banner under the fields.
    // Guest Details + Confirm and Pay: how the booking summary carries instant check-in
    { id: 'paySummary', label: 'Booking summary', labelAr: 'ملخص الحجز', options: [
      { value: 'quiet', label: 'Plain text', labelAr: 'نص عادي' },
      { value: 'line', label: 'Tag under date', labelAr: 'وسم تحت التاريخ' },
    ] },
  ],
}
