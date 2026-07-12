import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Youtube, Send, CheckCircle, Map, Compass } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) return;

    setLoading(true);

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSuccess(true);
          setName('');
          setEmail('');
          setSubject('');
          setMessage('');
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16" id="contact-page">
      {/* Header */}
      <section className="bg-emerald-950 text-white py-16 text-center relative overflow-hidden border-b border-amber-400">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-3">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-emerald-900/60 px-3 py-1 rounded border border-emerald-800">
            Reach Out
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
            Contact NiMAWA
          </h1>
          <p className="text-sm text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            Have a question, welfare inquiry, sponsorship idea, or need settling advice in Perth? Shoot us a message and our secretariat will reply promptly.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column Address Info & Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6">
              <h3 className="font-serif font-bold text-slate-900 text-base border-b pb-3">Association Details</h3>
              
              <ul className="space-y-4 text-xs text-slate-600">
                <li className="flex gap-3 items-start">
                  <MapPin className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Office Address</strong>
                    <span>Perth, Western Australia </span>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <Mail className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Official Inquiries</strong>
                    <a href="mailto:info@nimawa.org.au" className="hover:text-emerald-850 underline transition-colors">info@nimawa.org.au</a>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <Phone className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Phone Contact</strong>
                    <a href="tel:+61412345678" className="hover:text-emerald-850 underline transition-colors">+61 412 345 678</a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Stylized Google Map Placeholder */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm relative">
              <div className="bg-emerald-900/5 p-4 border-b flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Map className="w-4 h-4 text-emerald-800" />
                  Meeting Center Location
                </span>
                <span className="text-[10px] font-mono font-semibold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded">
                  WA 6108
                </span>
              </div>
              <div className="h-64 bg-slate-100 flex flex-col items-center justify-center text-center p-6 relative">
                {/* Visual grid layout matching a radar coordinates frame */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
                
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center shadow-lg relative animate-bounce mb-3 z-10">
                  <Compass className="w-6 h-6 animate-spin-slow" />
                </div>
                <h4 className="font-serif font-bold text-slate-900 text-xs z-10">Thornlie Park Centre</h4>
                <p className="text-[10px] text-slate-500 max-w-xs mt-1 z-10">
                  50 Thornlie Ave, Thornlie WA 6108
                </p>
                <a
                  href="https://maps.app.goo.gl/uymZRFWv77UkfiHL9"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-[10px] font-bold z-10 transition-colors flex items-center gap-1 shadow-md"
                  id="google-maps-redirect"
                >
                  Open Google Maps Directions
                </a>
              </div>
            </div>
          </div>

          {/* Right Column Interactive Contact Form */}
          <div className="lg:col-span-7">
            {success ? (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center space-y-6" id="contact-success-panel">
                <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle className="w-8 h-8 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-900">Message Received!</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Alhamdulillah, your inquiry has been successfully logged. Our secretariat will check our inbox and reply to your email address within 48 hours.
                  </p>
                </div>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all"
                  id="contact-send-another-btn"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900">Send an Inquiry</h3>
                  <p className="text-xs text-slate-500 mt-1">Please fill out this form and we will process it safely.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Kolawole Ibrahim"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors"
                        id="contact-name-input"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. kola@example.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors"
                        id="contact-email-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Inquiry Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Welfare request / Quran Class registration"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors"
                      id="contact-subject-input"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Detailed Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your detailed question or comment here..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors"
                      id="contact-message-input"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 uppercase tracking-wider"
                      id="contact-submit-btn"
                    >
                      <Send className="w-4 h-4 text-amber-400" />
                      {loading ? 'Sending Message...' : 'Submit Inquiry'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
