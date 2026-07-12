import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, BookOpen, Heart, Users, ArrowRight, Star } from 'lucide-react';
import PrayerTimes from '../components/PrayerTimes';
import HijriCalendar from '../components/HijriCalendar';
import { NewsArticle } from '../types';

export default function Home() {
  const [latestNews, setLatestNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Take top 2 published news
          setLatestNews(data.articles.filter((n: NewsArticle) => n.status === 'Published').slice(0, 2));
        }
      })
      .catch((err) => console.error('Error fetching news:', err));
  }, []);

  const values = [
    {
      icon: <Compass className="w-6 h-6 text-amber-500" />,
      title: 'Faith (Iman)',
      desc: 'Nurturing spiritual growth, commitment to Quran and Sunnah, and fostering deep Islamic knowledge in Western Australia.'
    },
    {
      icon: <Users className="w-6 h-6 text-amber-500" />,
      title: 'Community (Ummah)',
      desc: 'Creating a friendly, safe, and welcoming environment to unite families, newcomers, students, and professionals.'
    },
    {
      icon: <Heart className="w-6 h-6 text-amber-500" />,
      title: 'Unity & Welfare',
      desc: 'Providing welfare support, community aid, settlement guidelines, and celebrating our rich shared Nigerian Islamic heritage.'
    }
  ];

  const testimonials = [
    {
      name: 'Brother Rasheed Alabi',
      role: 'Perth Settler (since 2021)',
      quote: 'NiMAWA made WA feel like home for my family. The monthly gatherings and the warm community connection helped us settle smoothly and kept our kids attached to their faith.'
    },
    {
      name: 'Sister Maryam Adebayo',
      role: 'International Student',
      quote: 'The student reception program and welfare guides were a lifesaver. Joining the Online Quran Academy classes also allowed me to continue my studies while living far from home.'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800" id="home-page">
      {/* 1. Hero Section */}
      <section className="relative bg-emerald-950 text-white overflow-hidden py-24 lg:py-32 bg-geom-pattern text-emerald-800/15">
        {/* Color overlay to ensure high readability */}
        <div className="absolute inset-0 bg-emerald-950/95 z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side text contents */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-amber-400 font-serif italic text-xl mb-3 block">
                  Assalamu Alaykum &bull; Welcome
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white uppercase">
                  Nigerian Muslims' Association <br className="hidden sm:inline" />
                  <span className="text-amber-400 block mt-2">of Western Australia</span>
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-xl font-medium tracking-wide">
                Connecting Nigerian Muslims across Western Australia through worship, education, and shared values. Bridging spiritual growth, family support, and active community engagement.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/register"
                  className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs rounded-xl shadow-lg uppercase tracking-wider transition-all flex items-center gap-2"
                  id="hero-join-btn"
                >
                  Join Community
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/events"
                  className="px-6 py-3.5 border border-emerald-400 text-white hover:bg-white/10 font-bold text-xs rounded-xl uppercase tracking-wider transition-all"
                  id="hero-events-btn"
                >
                  Upcoming Events
                </Link>
                <Link
                  to="/donate"
                  className="px-6 py-3.5 bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-xs rounded-xl uppercase tracking-wider transition-all shadow-lg"
                  id="hero-donate-btn"
                >
                  Support Us
                </Link>
              </div>
            </div>

            {/* Right side graphical showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/35 shadow-2xl shadow-emerald-950/40">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000"
                  alt="Islamic Community Gathering"
                  className="w-full h-80 object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 to-transparent"></div>
                <div className="absolute bottom-5 left-5 right-5 bg-emerald-900/95 backdrop-blur-md p-5 rounded-2xl border border-emerald-800/60 shadow-lg">
                  <p className="text-amber-400 text-[9px] font-bold uppercase tracking-[0.18em]">Next Major Gathering</p>
                  <p className="text-white font-serif font-bold text-sm mt-1.5 uppercase tracking-wide">Monthly Gathering & Halaqah</p>
                  <p className="text-emerald-200 text-[10px] mt-1 font-semibold">Last Sunday of every month &bull; 10:00 AM - 3:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Prayer Times and Calendar Integration */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PrayerTimes />
          </div>
          <div>
            <HijriCalendar />
          </div>
        </div>
      </section>

      {/* 3. Mission, Vision, Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-700 font-bold uppercase tracking-[0.2em] text-[10px]">Our Core Foundation</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950 mt-3 uppercase tracking-tight">
            Why We Are Gathered
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="w-12 h-[1px] bg-emerald-900/10"></div>
            <div className="w-2 h-2 bg-amber-500 transform rotate-45 shadow-sm"></div>
            <div className="w-12 h-[1px] bg-emerald-900/10"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-900/5 hover:border-amber-500/30 transition-all duration-300 relative overflow-hidden group hover:shadow-xl">
              <div className="w-11 h-11 bg-emerald-900 border border-amber-500/25 rounded-lg flex items-center justify-center mb-8 transform rotate-45 shadow-md group-hover:rotate-[135deg] transition-all duration-500 mx-1 mt-1">
                <div className="transform -rotate-45 text-amber-400">
                  {val.icon}
                </div>
              </div>
              <h3 className="font-serif text-lg font-bold text-emerald-900 mb-3 uppercase tracking-wide">{val.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Latest News & Announcements Preview */}
      <section className="bg-emerald-50/65 py-20 border-y border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <span className="text-emerald-700 font-bold uppercase tracking-[0.2em] text-[10px]">Stay Informed</span>
              <h2 className="font-serif text-3xl font-bold text-emerald-950 mt-2 uppercase tracking-tight">
                News, Welfare & Projects
              </h2>
            </div>
            <Link
              to="/news"
              className="text-[10px] uppercase tracking-wider font-bold text-emerald-900 hover:text-amber-600 flex items-center gap-1 group transition-colors"
              id="home-view-all-news"
            >
              View All News
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {latestNews.length === 0 ? (
              <div className="col-span-2 text-center py-12 text-slate-500 text-xs font-medium bg-white rounded-3xl border border-emerald-900/5">
                No published news articles found. Visit the News section or log in to Admin to create one.
              </div>
            ) : (
              latestNews.map((news) => (
                <div key={news.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-emerald-900/5 flex flex-col sm:flex-row hover:shadow-lg hover:border-amber-500/20 transition-all duration-300">
                  {news.imageUrl && (
                    <img
                      src={news.imageUrl}
                      alt={news.title}
                      className="w-full sm:w-48 h-48 object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100">
                        {news.category}
                      </span>
                      <h3 className="font-serif text-base font-bold text-emerald-950 mt-4 leading-snug uppercase tracking-wide">
                        {news.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                        {news.summary}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-6 border-t border-slate-100 pt-4">
                      <span className="text-[10px] font-mono font-medium text-slate-400">
                        {new Date(news.createdAt).toLocaleDateString()}
                      </span>
                      <Link
                        to="/news"
                        className="text-[10px] uppercase tracking-wider font-bold text-emerald-850 hover:text-amber-600 transition-colors"
                        id={`read-news-btn-${news.id}`}
                      >
                        Read Full Story &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-700 font-bold uppercase tracking-[0.2em] text-[10px]">Community Voices</span>
          <h2 className="font-serif text-3xl font-bold text-emerald-950 mt-3 uppercase tracking-tight">
            What Members Say
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="w-12 h-[1px] bg-emerald-900/10"></div>
            <div className="w-2 h-2 bg-amber-500 transform rotate-45 shadow-sm"></div>
            <div className="w-12 h-[1px] bg-emerald-900/10"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((test, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-900/5 hover:border-amber-500/25 hover:shadow-lg transition-all duration-300 relative">
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 italic leading-relaxed mb-6 font-medium">
                "{test.quote}"
              </p>
              <div className="border-t border-slate-100 pt-4 mt-auto">
                <p className="font-serif font-bold text-emerald-950 text-sm uppercase tracking-wider">{test.name}</p>
                <p className="text-[10px] text-emerald-700 font-semibold uppercase tracking-widest mt-1">{test.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Online Quran Academy Promo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-14 border border-emerald-800 shadow-2xl relative overflow-hidden bg-geom-pattern text-emerald-800/10">
          {/* Color overlay to ensure high readability */}
          <div className="absolute inset-0 bg-emerald-900/95 z-0"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-5">
              <div>
                <span className="text-amber-400 font-serif italic text-lg mb-2.5 block">
                  Quran Study Academy
                </span>
                <h2 className="font-serif text-2xl sm:text-3.5xl font-bold text-white uppercase tracking-wide leading-tight">
                  Learn the Quran with Proper Tajweed
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl font-medium">
                Dedicated classes for boys, girls, youths, and adults. Professional teachers from Nigeria and Western Australia. Flexible terms designed to fit school terms in Western Australia.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link
                to="/quran-class"
                className="inline-block px-7 py-4 bg-amber-500 hover:bg-amber-400 text-white font-bold text-[10px] uppercase tracking-widest rounded-full shadow-lg transition-colors text-center w-full sm:w-auto"
                id="home-academy-btn"
              >
                Enroll In Classes &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
