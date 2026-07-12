import { BookOpen, GraduationCap, Calendar, Users, Award, ExternalLink, ArrowRight } from 'lucide-react';

export default function QuranClass() {
  // Use client-side configuration or a beautiful, reliable fallback
  const academyUrl = (import.meta as any).env.VITE_ONLINE_QURAN_ACADEMY_URL || 'https://datasolver.github.io/quran-class-poster/' //'https://academy.nimawa.org.au';

  const objectives = [
    {
      icon: <GraduationCap className="w-5 h-5 text-emerald-800" />,
      title: 'Sound Tajweed Mastery',
      desc: 'Learn proper phonetic pronunciation, tongue articulation (makharij), and Quranic reciting rules from certified Huffaz.'
    },
    {
      icon: <BookOpen className="w-5 h-5 text-emerald-800" />,
      title: 'Structured Memorisation',
      desc: 'Progressive memorisation (Hifdh) tracker tailored to individual students - from short Surahs to full Juz guides.'
    },
    {
      icon: <Award className="w-5 h-5 text-emerald-800" />,
      title: 'Islamic Values & Adaab',
      desc: 'Combining reading with moral character training, prophet stories, and essential daily Supplications (Duas).'
    }
  ];

  const schedule = [
    // { level: 'Kids Beginner', days: 'Saturdays & Sundays', hours: '09:00 - 10:30 AM', focus: 'Qaida, Alphabets, Short Surahs' },
    { level: 'Adults (Beginner)', days: 'Saturdays & Sundays', hours: '07:00 - 08:00 AM', focus: 'Qaida, Alphabets, Short Surahs' },
    // { level: 'Youth Intermediate', days: 'Tuesdays & Thursdays', hours: '17:30 - 19:00 PM', focus: 'Tajweed Rules, Memorisation tracker' },
    // { level: 'Adult Advanced (Brothers)', days: 'Mondays & Wednesdays', hours: '20:00 - 21:30 PM', focus: 'Tafseer elements, fluent recitation' },
    // { level: 'Adult Advanced (Sisters)', days: 'Fridays & Saturdays', hours: '19:30 - 21:00 PM', focus: 'Fluent recitation, Tajweed, Memorisation' }
  ];

  const teachers = [
    // { name: 'Sheikh Abdul-Hafiz Olayinka', title: 'Director of Hifdh studies', bio: 'Certified Hafiz of the Quran from Lagos State, Nigeria, with over 15 years teaching experience in tajweed and Quran sciences.' },
    // { name: 'Ustadha Aminah Bello', title: 'Kids Academy Coordinator', bio: 'Specialist in early childhood education, teaching basic Arabic reading, Arabic character tracing, and children moral adaab.' }
    { name: 'TBA'},
    { name: 'TBA'}
  ];

  const testimonials = [
    { parent: 'Brother Abdul-Hameed', student: 'Ibrahim (7) & Aishah (9)', text: 'Alhamdulillah, our children look forward to their online sessions. The teachers are incredibly patient, kind, and use interactive slides. Aishah has already memorised half of Juz Amma!' },
    { parent: 'Sister Jamilah', student: 'Adult Class', text: 'I started from scratch as an adult beginner, struggling to identify Arabic letters. Six months down, I can recite simple Surahs fluently with Tajweed. Truly life-changing.' }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-16" id="quran-academy-page">
      {/* Hero Banner Header */}
      <section className="bg-emerald-950 text-white py-16 text-center relative overflow-hidden border-b border-amber-400">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-3">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-emerald-900/60 px-3 py-1 rounded border border-emerald-800">
            Islamic Education
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
            NiMAWA Online Quran Academy
          </h1>
          <p className="text-sm text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            Nurturing hearts with the speech of Allah. Interactive, professional, and accessible virtual classrooms for the whole family in Western Australia.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Academy Details */}
          <div className="lg:col-span-8 space-y-10">
            {/* 1. Objectives & Overview */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 space-y-6">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                  Academy Philosophy & Objectives
                </h2>
                <div className="w-12 h-1 bg-amber-500 rounded mt-2"></div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The NiMAWA Online Quran Academy is established with the explicit aim of making high-quality, professional Quranic tutoring accessible to everyone in Western Australia. By utilizing advanced virtual classrooms, digital whiteboards, and custom tajweed materials, we offer standard tutoring that is both convenient and highly interactive.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                {objectives.map((obj, i) => (
                  <div key={i} className="space-y-2">
                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                      {obj.icon}
                    </div>
                    <h4 className="font-serif font-bold text-slate-900 text-sm">{obj.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{obj.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Structured Class Schedule */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 space-y-6">
              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-800" />
                  Term 3 Class Schedules
                </h2>
                <div className="w-12 h-1 bg-amber-500 rounded mt-2"></div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-bold border-b">
                      <th className="p-3">Level / Target</th>
                      <th className="p-3">Days</th>
                      <th className="p-3">Time (Perth Zone)</th>
                      <th className="p-3">Core Focus</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-slate-600">
                    {schedule.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="p-3 font-semibold text-slate-900">{item.level}</td>
                        <td className="p-3">{item.days}</td>
                        <td className="p-3 font-mono">{item.hours}</td>
                        <td className="p-3">{item.focus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3. Meet the Academic team */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 space-y-6">
              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-800" />
                  Our Certified Instructors
                </h2>
                <div className="w-12 h-1 bg-amber-500 rounded mt-2"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {teachers.map((teacher, i) => (
                  <div key={i} className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-900 text-sm">{teacher.name}</h4>
                    <span className="text-[10px] uppercase font-bold text-emerald-800 block mt-0.5">{teacher.title}</span>
                    <p className="text-xs text-slate-500 mt-2.5 leading-relaxed text-justify">{teacher.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar CTA & Testimonials */}
          <div className="lg:col-span-4 space-y-8">
            {/* Main Academy Link Portal */}
            <div className="bg-emerald-950 text-white p-8 rounded-3xl shadow-lg border border-emerald-800 text-center space-y-6 relative overflow-hidden sticky top-24">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1.5px)] [background-size:12px_12px]"></div>
              
              <div className="relative z-10 space-y-4">
                <span className="inline-flex items-center justify-center p-2 bg-amber-500 text-emerald-950 rounded-full animate-bounce">
                  <BookOpen className="w-6 h-6" />
                </span>
                <h3 className="font-serif text-xl font-bold text-amber-400">Quran Academy Portal</h3>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  Ready to enroll your children or start your personal learning journey? Click the official link below to visit our specialized external Learning Management System (LMS) portal.
                </p>

                <div className="pt-2">
                  <a
                    href={academyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4.5 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
                    id="academy-external-link"
                  >
                    Visit Online Quran Academy
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <p className="text-[9px] text-emerald-300/60 mt-3 font-mono">
                    Academy Portal Link: {academyUrl}
                  </p>
                </div>
              </div>
            </div>

            {/* Student Testimonials Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
              <h4 className="font-serif font-bold text-slate-900 text-sm">Parent & Student Reviews</h4>
              <div className="space-y-4 text-xs text-slate-600">
                {testimonials.map((test, idx) => (
                  <div key={idx} className="border-b border-slate-50 pb-3 last:border-none last:pb-0">
                    <p className="italic">"{test.text}"</p>
                    <p className="font-semibold text-slate-900 mt-2 text-[11px]">— {test.parent} <span className="text-emerald-700 font-normal">({test.student})</span></p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Box brief */}
            <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl space-y-2 text-xs text-slate-700">
              <h4 className="font-bold text-emerald-950 font-serif">Quick Enrollment Policy</h4>
              <p className="leading-relaxed">Classes are billed per term (10 weeks) aligning with public schools in Western Australia. Discounts are readily available for households enrolling 3 or more children. Register interest on our general membership form or click the portal button above.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
