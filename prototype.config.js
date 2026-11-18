// Prototype setup. The control bar above the screen is generated from this file.
//
// platforms / langs: true = live, false = shown as "Upcoming" (greyed out).
// To enable one later, ask Claude to "enable Android" / "add Arabic" — the
// almosafer-prototype skill flips the flag here and makes the screens work.

export default {
  name: 'Past midnight booking',
  hideBasics: true, // Platform, Language and Theme switches hidden from the bar; iOS only. Language and Theme (starts Light) live in the Prototype settings card at the top corner of the page

  platform: 'ios', // starting platform: ios | android | desktop | mobile-web
  lang: 'en', //              starting language: en | ar

  platforms: { ios: true, android: false, desktop: false, 'mobile-web': false },
  langs: { en: true, ar: true },

  // Scenario toggles. The first option is the default. Read with useProto().controls.<id>
  // `hidden: true` keeps a control out of Prototype settings: the prototype stays on its first option (settled 2026-11-18: Empty + Shimmer only)
  controls: [
    // Search widget: what turning the tonight toggle on does. Ask check-out opens the calendar with tonight selected and the same-day question
    { id: 'tonightToggle', hidden: true, label: 'Tonight toggle', labelAr: 'مفتاح الليلة', options: [
      // Empty check-out: turning it on clears check-out on the widget; the cell reads Select check-out and opens the calendar
      { value: 'empty', label: 'Empty', labelAr: 'مغادرة فارغة' },
      { value: 'inline', label: 'Stay', labelAr: 'البقاء في البحث' },
      { value: 'calendar', label: 'Ask', labelAr: 'اسأل عن المغادرة' },
      // Subtle tooltip: check-out rolls to the same day on the widget, and a small tip under it says so with a Change action
      { value: 'tip', label: 'Tooltip', labelAr: 'تلميح خفيف' },
    ] },
    // Search widget: how the tonight row arrives and reads. Tint: the row is there from the start with the aqua tint, which spreads over the dates once on.
    // Shimmer + reveal: the plain row opens a second after load with a band of light across it; once on, nothing is tinted and a moon sits by the check-in date.
    { id: 'tonightMotion', hidden: true, label: 'Tonight transition', labelAr: 'انتقال الليلة', options: [
      { value: 'shimmer', label: 'Shimmer only', labelAr: 'وميض فقط' },
      { value: 'tint', label: 'Tint', labelAr: 'تظليل' },
      { value: 'reveal', label: 'Shimmer + reveal', labelAr: 'وميض وظهور' },
    ] },
    // Settled: in the calendar, check in tonight clears check-out and asks about same-day check-out in an aqua tip.
    // Settled: the clock is always past midnight (today's real date, 1:30 AM at the destination). Picking London or Dubai in the search
    // makes the traveller abroad (phone on Riyadh time). Search uses the row in the widget, the calendar the date fields,
    // results the navy band, hotel details the banner under the fields.
    // Guest Details + Confirm and Pay: the booking summary carries check in tonight as a plain moon + text line under the date.
  ],
}
