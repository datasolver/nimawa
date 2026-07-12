import { useState } from 'react';
import { ShieldCheck, BookOpen, UserCheck, ScrollText, Download, Building } from 'lucide-react';

interface CommitteeMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export default function About() {
  const [showConstitution, setShowConstitution] = useState(false);

  const committee: CommitteeMember[] = [
    {
      name: 'Dr. Jamiu Ekundayo',
      role: 'President & Super Admin',
      bio: 'Leading strategic directives, institutional relations, property acquisition projects, and theological alignments in Western Australia.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Sister Zainab Balogun',
      role: 'Secretary General & Editor',
      bio: 'Oversees organizational records, official correspondence, minutes of board alignments, and editorial reviews for community newsletters.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Brother Rasheed Alabi',
      role: 'Volunteer Coordinator',
      bio: 'Coordinates setups for major gatherings, Joint Iftar programs, and matches volunteer skills with community action groups.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Alhaji Abdul-Lateef Olayinka',
      role: 'Treasurer & Finance Officer',
      bio: 'Maintains ledger operations, issuing official donation receipts, banking alignments, and budgeting for upcoming Eid celebrations.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Sister Khadijah Salami',
      role: 'Welfare & Settlers Coordinator',
      bio: 'Directs the New Settlers program, providing support, guidance, and halal community networking for incoming Nigerian families in Perth.',
      image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200'
    }
  ];

  const handleDownloadConstitution = () => {
    // Generate text content for Constitution download
    const content = `CONSTITUTION OF NIGERIAN MUSLIMS' ASSOCIATION OF WESTERN AUSTRALIA (NiMAWA)
    
Article 1: Name and Office
The name of the association is Nigerian Muslims' Association of Western Australia (NiMAWA).

Article 2: Tagline & Philosophy
"Building Faith, Community and Unity among Nigerian Muslims in Western Australia."

Article 3: Aims and Objectives
1. Promote and foster Islamic worship and knowledge in Western Australia according to Quran and Sunnah.
2. Provide support and counseling for newcomers, students, and newly arrived families from Nigeria.
3. Establish a permanent Islamic and Community Center.
4. Foster positive relationships with other Islamic and multicultural societies in Western Australia.

Article 4: Membership
Membership is open to all Nigerian Muslims, spouses, and families residing in Western Australia.

Article 5: Executive Committee
The association shall be governed by an elected executive committee comprising: President, Vice-President, Secretary General, Treasurer, Welfare Officer, and Coordinators.

Generated on: 2026-07-11
Official Archive Copy.`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'NiMAWA_Constitution_Summary.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16" id="about-page">
      {/* Page Title Header */}
      <section className="bg-emerald-950 text-white py-16 text-center relative overflow-hidden border-b border-amber-400">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-3">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-emerald-900/60 px-3 py-1 rounded border border-emerald-800">
            Who We Are
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
            About NiMAWA
          </h1>
          <p className="text-sm text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            Discover our history, organizational structure, core theological mission, and meet the executive committee driving community unity in WA.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Story, Mission, Vision */}
          <div className="lg:col-span-8 space-y-8">
            {/* Story Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Building className="w-5.5 h-5.5 text-emerald-800" />
                Our Story & History
              </h2>
              <div className="w-12 h-1 bg-amber-500 rounded"></div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                NiMAWA was established in Western Australia to create a cohesive home-away-from-home platform for Nigerian Muslims residing in Perth and neighboring regions. Recognizing the rapid growth of professional migrants, skilled workers, and international university students from Nigeria, a core group of visionaries united to establish regular Islamic Halaqahs, children's lessons, and welfare coordination.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Alhamdulillah, over the years, NiMAWA has grown into a highly recognized, registered non-profit organization, partnering with local councils, WA mosques, and multicultural centers. We hold vibrant monthly family gatherings, Joint Ramadan Iftars, Eid-ul-Fitr and Eid-ul-Adha prayers, and support families settling into the beautiful Western Australian environment.
              </p>
            </div>

            {/* Mission & Vision Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-800" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900">Our Mission</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To provide a supportive, spiritually enriching framework that empowers Nigerian Muslim families in Western Australia to maintain their faith, assist newly arrived members, and contribute constructively to multicultural Australia.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-3">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900">Our Vision</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A thriving, exemplary, and integrated Muslim community in WA that upholds sound Islamic values, supports educational excellence, and acquires a landmark Islamic Center.
                </p>
              </div>
            </div>

            {/* Strategic Objectives */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-4">
              <h3 className="font-serif text-xl font-bold text-slate-900">Core Objectives</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
                <li className="flex gap-2 items-start">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                  <span>Offer regular Islamic counseling and spiritual reminders (Halaqahs) based on correct theological guidelines.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                  <span>Operate Quran & Arabic classes for all levels of learners via Online Academy.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                  <span>Provide settlement guides, welfare networks, and emergency relief programs for WA settlers.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px]">4</span>
                  <span>Promote active volunteer networks, sports, youth forums, and women development panels.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Constitution & Org Structure */}
          <div className="lg:col-span-4 space-y-8">
            {/* Constitution Box */}
            <div className="bg-emerald-950 text-white p-6 rounded-2xl shadow-md border border-emerald-800 space-y-4">
              <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                <ScrollText className="w-5 h-5 text-emerald-950" />
              </div>
              <h3 className="font-serif text-lg font-bold text-amber-400">NiMAWA Constitution</h3>
              <p className="text-xs text-emerald-100/90 leading-relaxed">
                Our organization operates under a legally structured constitution registered with the WA Department of Mines, Industry Regulation and Safety. It guides membership rules, committee guidelines, and financial transparencies.
              </p>
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => setShowConstitution(!showConstitution)}
                  className="w-full px-4 py-2 bg-emerald-900 border border-emerald-800 hover:bg-emerald-850 text-emerald-100 hover:text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  id="toggle-const-btn"
                >
                  {showConstitution ? 'Hide Constitution Summary' : 'View Constitution Details'}
                </button>
                <button
                  onClick={handleDownloadConstitution}
                  className="w-full px-4 py-2 bg-amber-500 hover:bg-amber-400 text-emerald-950 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  id="download-const-btn"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Plaintext Copy
                </button>
              </div>

              {showConstitution && (
                <div className="bg-emerald-900/60 p-4 rounded-xl border border-emerald-800 text-[11px] text-emerald-100 space-y-2 font-mono leading-relaxed max-h-60 overflow-y-auto">
                  <p className="font-bold text-amber-400 uppercase">Article Highlights:</p>
                  <p><strong>1. Name:</strong> Nigerian Muslims' Association of Western Australia (NiMAWA).</p>
                  <p><strong>2. Philosophy:</strong> Building Faith, Community and Unity.</p>
                  <p><strong>3. Assets:</strong> All funds raised must exclusively support community centers, welfare, and Islamic activities.</p>
                  <p><strong>4. Elections:</strong> Executive committee runs for a bi-annual term with democratic member voting.</p>
                </div>
              )}
            </div>

            {/* Quick Welfare Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600 block">Need Settlement Help?</span>
              <h4 className="font-serif font-bold text-slate-900 text-sm">Welfare Committee Perth</h4>
              <p className="text-xs text-slate-500">
                Are you a newly arrived student, professional or family in Western Australia? Let our team guide you with school enrolments, lodging, and halal facilities.
              </p>
              <a href="/contact" className="inline-block text-xs font-bold text-emerald-700 hover:text-emerald-800 pt-1">
                Reach Welfare Team &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Meet the Committee */}
        <section className="mt-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-emerald-700 font-bold uppercase tracking-widest text-xs">Serving the Community</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Executive Committee Board
            </h2>
            <div className="w-12 h-1 bg-amber-500 mx-auto mt-3 rounded"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {committee.map((member, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 text-center border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="space-y-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-amber-400"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm leading-snug">{member.name}</h4>
                    <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider block mt-1">
                      {member.role}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed text-justify">
                    {member.bio}
                  </p>
                </div>
                <div className="border-t border-slate-50 mt-4 pt-3 flex items-center justify-center gap-1.5 text-[10px] text-emerald-800 font-semibold">
                  <UserCheck className="w-3.5 h-3.5" />
                  Active Officer
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
