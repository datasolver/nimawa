import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Facebook, Youtube, Share2, ShieldAlert } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
        setEmail('');
        setIsError(false);
      })
      .catch((err) => {
        console.error(err);
        setMessage('Subscription failed. Please try again.');
        setIsError(true);
      })
      .finally(() => setLoading(false));
  };

  return (
    <footer id="app-footer" className="bg-emerald-950 text-white border-t-4 border-amber-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Info & Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-900 border border-amber-500/30 rounded-lg flex items-center justify-center transform rotate-45 shadow-md">
                <div className="transform -rotate-45 font-serif text-lg font-bold text-amber-400">N</div>
              </div>
              <div>
                <span className="font-serif text-base font-bold tracking-wider text-amber-400 block uppercase leading-none">
                  NiMAWA
                </span>
                <span className="text-[8px] uppercase tracking-[0.18em] text-emerald-200 block font-semibold mt-1">
                  Western Australia
                </span>
              </div>
            </div>
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              Building Faith, Community and Unity among Nigerian Muslims in Western Australia. Dedicated to fostering spiritual growth, welfare programs, educational initiatives, and Islamic values.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 bg-emerald-900 hover:bg-amber-500 hover:text-emerald-950 rounded-lg transition-colors text-emerald-100" title="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2 bg-emerald-900 hover:bg-amber-500 hover:text-emerald-950 rounded-lg transition-colors text-emerald-100" title="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="p-2 bg-emerald-900 hover:bg-amber-500 hover:text-emerald-950 rounded-lg transition-colors text-emerald-100" title="WhatsApp Support">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold tracking-wider text-amber-400 uppercase border-b border-emerald-900 pb-3 mb-4">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link to="/" className="text-emerald-100 hover:text-amber-400 transition-colors">Home</Link>
              <Link to="/about" className="text-emerald-100 hover:text-amber-400 transition-colors">About Us</Link>
              <Link to="/events" className="text-emerald-100 hover:text-amber-400 transition-colors">Events</Link>
              <Link to="/quran-class" className="text-emerald-100 hover:text-amber-400 transition-colors">Quran Academy</Link>
              <Link to="/news" className="text-emerald-100 hover:text-amber-400 transition-colors">News & CMS</Link>
              <Link to="/gallery" className="text-emerald-100 hover:text-amber-400 transition-colors">Gallery</Link>
              <Link to="/donate" className="text-emerald-100 hover:text-amber-400 transition-colors">Donate</Link>
              <Link to="/contact" className="text-emerald-100 hover:text-amber-400 transition-colors">Contact</Link>
              <Link to="/faq" className="text-emerald-100 hover:text-amber-400 transition-colors">FAQs</Link>
              <Link to="/admin" className="text-emerald-100 hover:text-amber-400 transition-colors flex items-center gap-1">
                <ShieldAlert className="w-3 h-3 text-amber-500" /> Admin
              </Link>
            </div>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-sm font-bold tracking-wider text-amber-400 uppercase border-b border-emerald-900 pb-3 mb-4">
              Get In Touch
            </h4>
            <ul className="space-y-3 text-xs text-emerald-100/90">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Perth, Western Australia</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:info@nimawa.org.au" className="hover:text-amber-400 transition-colors">info@nimawa.org.au</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+61412345678" className="hover:text-amber-400 transition-colors">+61 412 345 678</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-sm font-bold tracking-wider text-amber-400 uppercase border-b border-emerald-900 pb-3 mb-4">
              Community Newsletter
            </h4>
            <p className="text-xs text-emerald-100/85 mb-3 leading-relaxed">
              Stay updated on monthly gatherings, lectures, Quran academy terms, and community announcements.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-emerald-900/60 border border-emerald-800 text-white rounded-xl py-2 px-3 pr-10 text-xs focus:outline-none focus:border-amber-400 transition-all placeholder:text-emerald-300/40"
                  id="newsletter-email-input"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-1 top-1 p-1 bg-amber-500 hover:bg-amber-400 text-emerald-950 rounded-lg transition-colors flex items-center justify-center"
                  id="newsletter-subscribe-btn"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {message && (
                <p className={`text-[10px] font-medium leading-relaxed ${isError ? 'text-red-300' : 'text-amber-400'}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>

        <hr className="border-emerald-900 my-8 md:my-10" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-emerald-200/80 gap-4">
          <div>
            &copy; {new Date().getFullYear()} NiMAWA (Nigerian Muslims' Association of WA). All Rights Reserved. Registered non-profit.
          </div>
          <div className="flex gap-4">
            <Link to="/faq" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
            <span>&bull;</span>
            <Link to="/faq" className="hover:text-amber-400 transition-colors">Terms of Use</Link>
            <span>&bull;</span>
            <a href="https://google.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">Google Maps Guide</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
