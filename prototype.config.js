// Prototype setup. The control bar above the screen is generated from this file.
//
// platforms / langs: true = live, false = shown as "Upcoming" (greyed out).
// To enable one later, ask Claude to "enable Android" / "add Arabic" — the
// almosafer-prototype skill flips the flag here and makes the screens work.

export default {
  name: 'Midnight Booking',

  platform: 'ios', // starting platform: ios | android | desktop | mobile-web
  lang: 'en', //              starting language: en | ar

  platforms: { ios: true, android: false, desktop: false, 'mobile-web': false },
  langs: { en: true, ar: false },

  // Scenario toggles. The first option is the default. Read with useProto().controls.<id>
  controls: [
    // Device clock. "Past midnight" = Fri 23 Oct, 01:30 local — the traveller still wants Thu 22's night.
    { id: 'clock', label: 'Local time', options: [{ value: 'day', label: 'Thu 6:51 PM' }, { value: 'midnight', label: 'Fri 1:30 AM' }] },
  ],
}
