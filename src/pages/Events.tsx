import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, User, QrCode, ArrowRight, Heart, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { EventModel, EventRegistration } from '../types';

export default function Events() {
  const [events, setEvents] = useState<EventModel[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventModel | null>(null);
  
  // Registration Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [successTicket, setSuccessTicket] = useState<EventRegistration | null>(null);

  // Countdown timer State
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEvents(data.events);
        }
      })
      .catch((err) => console.error('Error fetching events:', err));
  }, []);

  // Compute countdown to Ramadan Iftar (evt_2, Febryary 14, 2027)
  useEffect(() => {
    const targetDate = new Date('2027-02-14T17:30:00');
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        const secs = Math.floor((diff / 1000) % 60);
        setCountdown({ days, hours, mins, secs });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent || !fullName || !email || !phone) return;

    setLoading(true);
    fetch('/api/event-registrations/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventId: selectedEvent.id,
        eventTitle: selectedEvent.title,
        fullName,
        email,
        phone
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSuccessTicket(data.registration);
          setFullName('');
          setEmail('');
          setPhone('');
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleDownloadPDF = () => {
    if (!successTicket) return;
    const content = `===========================================
      OFFICIAL ENTRY TICKET - NiMAWA EVENTS
===========================================
Ticket ID:     ${successTicket.id}
Event Name:    ${successTicket.eventTitle}
Ticket Holder: ${successTicket.fullName}
Email:         ${successTicket.email}
Phone:         ${successTicket.phone}
Ticket Code:   ${successTicket.ticketCode}
Date Issued:   ${new Date(successTicket.createdAt).toLocaleDateString()}
===========================================
Please present this code at check-in counter.
Nigerian Muslims' Association of Western Australia`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NiMAWA_Ticket_${successTicket.ticketCode}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16" id="events-page">
      {/* Page Header */}
      <section className="bg-emerald-950 text-white py-16 text-center relative overflow-hidden border-b border-amber-400">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-3">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-emerald-900/60 px-3 py-1 rounded border border-emerald-800">
            Community Gatherings
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
            Upcoming Events & Celebrations
          </h1>
          <p className="text-sm text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            Register for monthly gatherings, annual joint Iftars, and Eid celebrations. Grab your QR entry ticket instantly.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main events listing */}
          <div className="lg:col-span-8 space-y-10">
            {/* Ramadan Joint Iftar Countdown Card */}
            <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white p-8 rounded-2xl shadow-md border border-emerald-800 relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,#000_0_10px,#fff_10px_20px)]"></div>
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 space-y-3">
                  <span className="text-amber-400 text-[10px] font-bold tracking-widest bg-emerald-900 px-2.5 py-1 rounded border border-emerald-800 uppercase">
                    Annual Joint Ramadan Iftar
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold">Countdown to Blessed Gathering</h3>
                  <p className="text-xs text-emerald-100/90 leading-relaxed">
                    Join families across Perth to break our fast, perform prayers, and listen to inspiring lectures. Sponsor-a-Tray for only $50 or register as a volunteer today!
                  </p>
                </div>
                <div className="md:col-span-5 text-center bg-emerald-950/80 border border-emerald-800 p-4 rounded-xl">
                  <span className="text-[10px] uppercase text-emerald-300 font-semibold tracking-wider">Estimated Countdown</span>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    <div className="p-1">
                      <span className="block text-xl font-bold font-mono text-amber-400">{countdown.days}</span>
                      <span className="text-[8px] uppercase text-emerald-200">Days</span>
                    </div>
                    <div className="p-1">
                      <span className="block text-xl font-bold font-mono text-amber-400">{countdown.hours}</span>
                      <span className="text-[8px] uppercase text-emerald-200">Hours</span>
                    </div>
                    <div className="p-1">
                      <span className="block text-xl font-bold font-mono text-amber-400">{countdown.mins}</span>
                      <span className="text-[8px] uppercase text-emerald-200">Mins</span>
                    </div>
                    <div className="p-1">
                      <span className="block text-xl font-bold font-mono text-amber-400">{countdown.secs}</span>
                      <span className="text-[8px] uppercase text-emerald-200">Secs</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Cards loop */}
            <div className="space-y-6">
              {events.map((event) => (
                <div key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow grid grid-cols-1 md:grid-cols-12">
                  {event.imageUrl && (
                    <div className="md:col-span-4 relative h-48 md:h-full min-h-[160px]">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <div className={`p-6 md:p-8 flex flex-col justify-between ${event.imageUrl ? 'md:col-span-8' : 'md:col-span-12'}`}>
                    <div>
                      <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
                        <span className="text-[10px] uppercase font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-100">
                          {event.category}
                        </span>
                        <span className="text-xs text-slate-500 font-medium font-mono flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                        {event.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {event.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <strong>Venue:</strong> {event.venue}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <strong>Time:</strong> {event.time}
                        </span>
                        {event.speaker && (
                          <span className="flex items-center gap-1.5 sm:col-span-2">
                            <User className="w-3.5 h-3.5 text-slate-400" />
                            <strong>Speaker / Imam:</strong> {event.speaker}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-slate-100 mt-6 pt-4 flex flex-wrap gap-3 items-center justify-between">
                      {event.category === 'Eid' && (
                        <div className="text-[10px] text-emerald-800 font-semibold bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg">
                          Eid Prayer at 8:30 AM &bull; Bouncy Castle &bull; Kids Activities
                        </div>
                      )}
                      <button
                        onClick={() => {
                          setSelectedEvent(event);
                          setSuccessTicket(null);
                        }}
                        className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
                        id={`register-btn-${event.id}`}
                      >
                        Book Free Entry Ticket
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column Registration & Info */}
          <div className="lg:col-span-4 space-y-8">
            {/* Conditional Ticket Display or Active Registration form */}
            {selectedEvent ? (
              <div className="bg-white rounded-2xl shadow-md border-2 border-emerald-900/40 overflow-hidden sticky top-24" id="event-booking-sidebar">
                <div className="bg-emerald-900 text-white p-5">
                  <h4 className="font-serif font-bold text-sm tracking-wide text-amber-400">Book Entry Ticket</h4>
                  <p className="text-[11px] text-emerald-100 mt-1 line-clamp-1">{selectedEvent.title}</p>
                </div>

                {successTicket ? (
                  <div className="p-6 text-center space-y-6">
                    <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-slate-900 text-base">Booking Confirmed!</h4>
                      <p className="text-xs text-slate-500 mt-1">An entry confirmation has been simulated and sent to your outbox.</p>
                    </div>

                    {/* Ticket Design */}
                    <div className="bg-stone-50 border-2 border-dashed border-slate-300 p-4 rounded-xl text-left space-y-3 font-mono text-[11px] text-slate-700 relative">
                      <div className="flex justify-between font-bold border-b pb-2 text-[10px] text-slate-400">
                        <span>NiMAWA PASS</span>
                        <span>{successTicket.ticketCode}</span>
                      </div>
                      <p><strong>Attendee:</strong> {successTicket.fullName}</p>
                      <p className="truncate"><strong>Event:</strong> {successTicket.eventTitle}</p>
                      <div className="flex justify-center py-2">
                        <QrCode className="w-16 h-16 text-slate-800" />
                      </div>
                      <p className="text-[9px] text-center text-slate-400">PRESENT CODE AT COUNTER</p>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={handleDownloadPDF}
                        className="w-full px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs rounded-xl transition-all"
                        id="download-ticket-btn"
                      >
                        Download Ticket PASS
                      </button>
                      <button
                        onClick={() => {
                          setSelectedEvent(null);
                          setSuccessTicket(null);
                        }}
                        className="w-full px-4 py-2 text-slate-500 hover:text-slate-800 text-xs font-semibold"
                        id="close-ticket-btn"
                      >
                        Close & Go Back
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleRegister} className="p-6 space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Yusuf Adeola"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors"
                        id="booking-name-input"
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
                        placeholder="e.g. yusuf@example.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors"
                        id="booking-email-input"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +61 412 345 678"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors"
                        id="booking-phone-input"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-all shadow-sm"
                        id="submit-booking-btn"
                      >
                        {loading ? 'Processing...' : 'Register and Get Pass'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedEvent(null)}
                        className="w-full text-slate-400 hover:text-slate-600 text-xs font-semibold mt-2.5"
                        id="cancel-booking-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              <div className="bg-emerald-950 text-white p-6 rounded-2xl shadow-md border border-emerald-800 space-y-4">
                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5 text-emerald-950" />
                </div>
                <h3 className="font-serif text-lg font-bold text-amber-400">Support Our Events</h3>
                <p className="text-xs text-emerald-100/95 leading-relaxed">
                  All NiMAWA community gatherings, including standard Hall bookings and childrens programs are provided 100% free of charge. Consider sponsoring specific events or volunteering.
                </p>
                <div className="space-y-2 pt-2">
                  <a
                    href="/donate"
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-amber-500 hover:bg-amber-400 text-emerald-950 rounded-xl text-xs font-bold transition-colors"
                    id="events-sponsor-btn"
                  >
                    Sponsor/Donate Event Trays
                  </a>
                  <a
                    href="/register"
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold transition-colors"
                    id="events-volunteer-btn"
                  >
                    Join Volunteer Network
                  </a>
                </div>
              </div>
            )}

            {/* Quick Policy details card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-3 text-xs text-slate-600">
              <h4 className="font-bold text-slate-900 font-serif">Important Event Notices</h4>
              <p>1. <strong>Punctuality:</strong> Doors for standard events open exactly 15 minutes before the scheduled time.</p>
              <p>2. <strong>Halal Catering:</strong> All food items and snacks served during our events are strictly 100% Halal certified.</p>
              <p>3. <strong>Parking Info:</strong> Free off-street parking is readily available for families at all selected Perth councils.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
