import { useState, useEffect } from 'react';
import { Calendar, Compass } from 'lucide-react';

export default function HijriCalendar() {
  const [dates, setDates] = useState({
    gregorian: '',
    hijri: '',
    ramadanDays: 0,
    eidAdhaDays: 0
  });

  useEffect(() => {
    // Current date July 11, 2026
    const today = new Date();
    
    // Approximate Hijri Calculation for July 11, 2026 (roughly 26 Muharram 1448 AH)
    // base calibration: July 11, 2026 = 26 Muharram 1448 AH
    const baseDate = new Date('2026-07-11');
    const msPerDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round((today.getTime() - baseDate.getTime()) / msPerDay);
    
    let hijriDay = 26 + diffDays;
    let hijriMonth = 'Muharram';
    let hijriYear = 1448;
    
    if (hijriDay > 30) {
      hijriDay = hijriDay - 30;
      hijriMonth = 'Safar';
    } else if (hijriDay <= 0) {
      hijriDay = 30 + hijriDay;
      hijriMonth = 'Dhul-Hijjah';
      hijriYear = 1447;
    }

    const formattedGregorian = today.toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    const formattedHijri = `${hijriDay} ${hijriMonth} ${hijriYear} AH`;

    // Calculate Ramadan countdown: Ramadan 1448 starts approx February 7, 2027
    const ramadanDate = new Date('2027-02-07');
    const ramadanDiff = ramadanDate.getTime() - today.getTime();
    const ramadanDays = Math.max(0, Math.ceil(ramadanDiff / msPerDay));

    // Calculate Eid-ul-Adha 1448 countdown: May 16, 2027
    const eidDate = new Date('2027-05-16');
    const eidDiff = eidDate.getTime() - today.getTime();
    const eidAdhaDays = Math.max(0, Math.ceil(eidDiff / msPerDay));

    setDates({
      gregorian: formattedGregorian,
      hijri: formattedHijri,
      ramadanDays,
      eidAdhaDays
    });
  }, []);

  return (
    <div id="islamic-calendar-widget" className="bg-white rounded-3xl shadow-xl p-6 border border-emerald-900/5">
      <div className="flex items-center justify-between mb-5">
        <h4 className="font-serif font-bold text-emerald-950 text-xs tracking-wider flex items-center uppercase">
          <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center transform rotate-45 shadow-sm mr-3">
            <Calendar className="w-3.5 h-3.5 text-emerald-800 transform -rotate-45" />
          </div>
          Islamic Hijri Calendar
        </h4>
        <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center">
          <Compass className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>

      <div className="text-center bg-slate-50/70 border border-emerald-900/5 rounded-2xl py-5 mb-5 shadow-inner">
        <span className="text-lg sm:text-xl font-serif font-bold text-emerald-900 uppercase tracking-wide block leading-none">
          {dates.hijri}
        </span>
        <span className="text-[9px] uppercase font-bold text-slate-400 tracking-widest block mt-2">
          {dates.gregorian}
        </span>
      </div>

      <div className="space-y-3.5">
        <div className="flex items-center justify-between text-[11px] border-b border-slate-100 pb-3">
          <span className="text-slate-600 font-semibold uppercase tracking-wider">Eid-ul-Adha Countdown</span>
          <span className="font-mono font-bold text-xs text-amber-850 bg-amber-50/75 border border-amber-200/50 px-2.5 py-1 rounded-md">
            {dates.eidAdhaDays} Days Left
          </span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-600 font-semibold uppercase tracking-wider">Ramadan 1448 Countdown</span>
          <span className="font-mono font-bold text-xs text-emerald-900 bg-emerald-50/75 border border-emerald-200/50 px-2.5 py-1 rounded-md">
            {dates.ramadanDays} Days Left
          </span>
        </div>
      </div>
    </div>
  );
}
