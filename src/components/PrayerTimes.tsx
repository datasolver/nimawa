import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { Coordinates, CalculationMethod, PrayerTimes as AdhanPrayerTimes, Madhab } from 'adhan';

interface Prayer {
  name: string;
  time: string; // HH:MM
  label: string;
}

export default function PrayerTimes() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Perth, WA Coordinates
  const coordinates = new Coordinates(-31.9505, 115.8605);
  const params = CalculationMethod.MuslimWorldLeague();
  params.madhab = Madhab.Shafi; // Shafi school of thought for Asr

  const pt = new AdhanPrayerTimes(coordinates, currentTime, params);

  const format = (d: Date) => {
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const prayers: Prayer[] = [
    { name: 'Fajr', time: format(pt.fajr), label: 'Dawn' },
    { name: 'Sunrise', time: format(pt.sunrise), label: 'Sunrise' },
    { name: 'Dhuhr', time: format(pt.dhuhr), label: 'Noon' },
    { name: 'Asr', time: format(pt.asr), label: 'Afternoon' },
    { name: 'Maghrib', time: format(pt.maghrib), label: 'Sunset' },
    { name: 'Isha', time: format(pt.isha), label: 'Night' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate next prayer and countdown
  const getNextPrayerInfo = () => {
    const now = currentTime.getTime();
    let nextPrayerDate: Date | null = null;
    let nextPrayerName = '';

    // Check all prayers for today
    const ptToday = new AdhanPrayerTimes(coordinates, currentTime, params);
    const prayerDates = [
      { name: 'Fajr', date: ptToday.fajr },
      { name: 'Sunrise', date: ptToday.sunrise },
      { name: 'Dhuhr', date: ptToday.dhuhr },
      { name: 'Asr', date: ptToday.asr },
      { name: 'Maghrib', date: ptToday.maghrib },
      { name: 'Isha', date: ptToday.isha },
    ];

    for (const p of prayerDates) {
      if (p.date.getTime() > now) {
        nextPrayerDate = p.date;
        nextPrayerName = p.name;
        break;
      }
    }

    if (!nextPrayerDate) {
      // If none of today's prayers are in the future, the next prayer is Fajr tomorrow
      const tomorrow = new Date(currentTime);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const ptTomorrow = new AdhanPrayerTimes(coordinates, tomorrow, params);
      nextPrayerDate = ptTomorrow.fajr;
      nextPrayerName = 'Fajr';
    }

    const nextHours = nextPrayerDate.getHours().toString().padStart(2, '0');
    const nextMins = nextPrayerDate.getMinutes().toString().padStart(2, '0');
    const nextPrayerTime = `${nextHours}:${nextMins}`;

    const diffMs = nextPrayerDate.getTime() - now;
    const diffSecs = Math.max(0, Math.floor(diffMs / 1000));
    const h = Math.floor(diffSecs / 3600);
    const m = Math.floor((diffSecs % 3600) / 60);
    const s = diffSecs % 60;

    const countdown = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

    return {
      name: nextPrayerName,
      time: nextPrayerTime,
      countdown
    };
  };

  const nextInfo = getNextPrayerInfo();

  // Helper to highlight current prayer
  const isCurrentPrayer = (prayerName: string, index: number) => {
    const now = currentTime.getTime();

    const getPrayerTimeMs = (pIndex: number) => {
      const [h, m] = prayers[pIndex].time.split(':').map(Number);
      const d = new Date(currentTime);
      d.setHours(h, m, 0, 0);
      return d.getTime();
    };

    const thisTime = getPrayerTimeMs(index);
    const nextIndex = (index + 1) % prayers.length;
    const nextTime = getPrayerTimeMs(nextIndex);

    if (index === prayers.length - 1) {
      const fajrTime = getPrayerTimeMs(0);
      return now >= thisTime || now < fajrTime;
    }

    return now >= thisTime && now < nextTime;
  };

  return (
    <div id="prayer-times-widget" className="bg-white text-emerald-950 rounded-3xl shadow-xl overflow-hidden border border-emerald-900/5">
      <div className="bg-white p-6 flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center transform rotate-45 shadow-sm">
            <Clock className="w-4 h-4 text-emerald-800 transform -rotate-45" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-base tracking-wide uppercase text-emerald-900">
              Perth, WA Prayer Times
            </h4>
            <p className="text-[10px] font-semibold text-emerald-600/85 uppercase tracking-wider mt-0.5">
              {currentTime.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short' })}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-4">
          <div className="text-right">
            <div className="text-lg font-bold font-mono tracking-wider text-emerald-950">
              {currentTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
            </div>
            <span className="text-[9px] text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded font-bold uppercase tracking-wider block mt-0.5">
              MWL / Shafi (Standard)
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-amber-50/50 border border-amber-100/70 rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div>
            <span className="text-[9px] text-amber-800 uppercase tracking-widest font-bold block">
              Next Prayer
            </span>
            <span className="text-lg font-serif font-bold text-emerald-950 uppercase tracking-wide block mt-0.5">
              {nextInfo.name} <span className="text-xs text-emerald-700 font-medium normal-case">at {nextInfo.time}</span>
            </span>
          </div>
          <div className="text-right">
            <span className="text-[9px] text-amber-800 uppercase tracking-widest font-bold block">
              Countdown
            </span>
            <span className="text-xl font-bold font-mono tracking-widest text-amber-600">
              {nextInfo.countdown}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {prayers.map((prayer, i) => {
            const active = isCurrentPrayer(prayer.name, i);
            return (
              <div
                key={prayer.name}
                className={`p-3.5 rounded-xl border text-center transition-all ${
                  active
                    ? 'bg-emerald-900 border-emerald-800 text-white scale-105 shadow-lg shadow-emerald-950/15'
                    : 'bg-slate-50/50 border-emerald-900/5 hover:bg-slate-100/80 text-emerald-950 hover:border-emerald-900/10'
                }`}
              >
                <span className={`block text-[9px] uppercase tracking-wider font-bold ${active ? 'text-amber-400' : 'text-emerald-800/70'}`}>
                  {prayer.name}
                </span>
                <span className="block text-base font-bold font-mono mt-1.5 leading-none">
                  {prayer.time}
                </span>
                <span className={`block text-[9px] font-semibold mt-1 uppercase tracking-wider ${active ? 'text-emerald-200' : 'text-slate-400'}`}>
                  {prayer.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
