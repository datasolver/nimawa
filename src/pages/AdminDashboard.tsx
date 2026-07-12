import React, { useState, useEffect } from 'react';
import {
  Shield,
  LayoutDashboard,
  Users,
  Calendar,
  Newspaper,
  Megaphone,
  Mail,
  Heart,
  Key,
  Plus,
  Trash2,
  Edit2,
  Download,
  Sparkles,
  Inbox,
  LogOut,
  Clock,
  Eye,
  FileCheck
} from 'lucide-react';
import {
  Member,
  Volunteer,
  EventModel,
  NewsArticle,
  Announcement,
  ContactMessage,
  Donation,
  User
} from '../types';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'volunteers' | 'events' | 'news' | 'announcements' | 'contact' | 'donations' | 'newsletter' | 'outbox'>('overview');

  // Login form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loadingLogin, setLoadingLogin] = useState(false);

  // App Database States
  const [members, setMembers] = useState<Member[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [events, setEvents] = useState<EventModel[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [newsletterSubscribers, setNewsletterSubscribers] = useState<string[]>([]);
  const [outboxEmails, setOutboxEmails] = useState<any[]>([]);

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // AI assistant helper
  const [aiTopic, setAiTopic] = useState('');
  const [aiType, setAiType] = useState<'article' | 'announcement'>('announcement');
  const [aiOutput, setAiOutput] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);

  // Forms / Modals
  const [editingEvent, setEditingEvent] = useState<Partial<EventModel> | null>(null);
  const [editingNews, setEditingNews] = useState<Partial<NewsArticle> | null>(null);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Partial<Announcement> | null>(null);
  const [replyingMessage, setReplyingMessage] = useState<ContactMessage | null>(null);
  const [replyText, setReplyText] = useState('');

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if logged in already
    const savedUser = localStorage.getItem('nimawa_admin_user');
    if (savedUser) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(savedUser));
      fetchDashboardData();
    }
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;

    setLoadingLogin(true);
    setLoginError('');

    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginEmail, password: loginPassword })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem('nimawa_admin_user', JSON.stringify(data.user));
          localStorage.setItem('nimawa_admin_token', data.token);
          setIsLoggedIn(true);
          setCurrentUser(data.user);
        } else {
          setLoginError(data.message || 'Login failed');
        }
      })
      .catch((err) => {
        console.error(err);
        setLoginError('Server connection failed.');
      })
      .finally(() => setLoadingLogin(false));
  };

  const handleLogout = () => {
    localStorage.removeItem('nimawa_admin_user');
    localStorage.removeItem('nimawa_admin_token');
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const fetchDashboardData = () => {
    // Fetch members
    fetch('/api/members')
      .then((res) => res.json())
      .then((data) => data.success && setMembers(data.members))
      .catch((e) => console.error(e));

    // Fetch volunteers
    fetch('/api/volunteers')
      .then((res) => res.json())
      .then((data) => data.success && setVolunteers(data.volunteers))
      .catch((e) => console.error(e));

    // Fetch events
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => data.success && setEvents(data.events))
      .catch((e) => console.error(e));

    // Fetch news
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => data.success && setNews(data.articles))
      .catch((e) => console.error(e));

    // Fetch announcements
    fetch('/api/announcements')
      .then((res) => res.json())
      .then((data) => data.success && setAnnouncements(data.announcements))
      .catch((e) => console.error(e));

    // Fetch messages
    fetch('/api/contact')
      .then((res) => res.json())
      .then((data) => data.success && setMessages(data.messages))
      .catch((e) => console.error(e));

    // Fetch donations
    fetch('/api/donations')
      .then((res) => res.json())
      .then((data) => data.success && setDonations(data.donations))
      .catch((e) => console.error(e));

    // Fetch newsletter subscribers
    fetch('/api/newsletter/subscribers')
      .then((res) => res.json())
      .then((data) => data.success && setNewsletterSubscribers(data.subscribers))
      .catch((e) => console.error(e));

    // Fetch outbox mail logs
    fetch('/api/mail-outbox')
      .then((res) => res.json())
      .then((data) => data.success && setOutboxEmails(data.emails))
      .catch((e) => console.error(e));
  };

  // --- DELETE ENDPOINTS ---
  const handleDeleteMember = (id: string) => {
    if (!confirm('Are you sure you want to remove this member?')) return;
    fetch(`/api/members/${id}`, { method: 'DELETE' })
      .then(() => fetchDashboardData())
      .catch((e) => console.error(e));
  };

  const handleDeleteVolunteer = (id: string) => {
    if (!confirm('Are you sure you want to remove this volunteer?')) return;
    fetch(`/api/volunteers/${id}`, { method: 'DELETE' })
      .then(() => fetchDashboardData())
      .catch((e) => console.error(e));
  };

  const handleDeleteEvent = (id: string) => {
    if (!confirm('Are you sure you want to delete this event? All registrations will also be removed.')) return;
    fetch(`/api/events/${id}`, { method: 'DELETE' })
      .then(() => fetchDashboardData())
      .catch((e) => console.error(e));
  };

  const handleDeleteNews = (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    fetch(`/api/news/${id}`, { method: 'DELETE' })
      .then(() => fetchDashboardData())
      .catch((e) => console.error(e));
  };

  const handleDeleteAnnouncement = (id: string) => {
    if (!confirm('Are you sure you want to remove this announcement notice?')) return;
    fetch(`/api/announcements/${id}`, { method: 'DELETE' })
      .then(() => fetchDashboardData())
      .catch((e) => console.error(e));
  };

  const handleDeleteMessage = (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    fetch(`/api/contact/${id}`, { method: 'DELETE' })
      .then(() => fetchDashboardData())
      .catch((e) => console.error(e));
  };

  // --- EVENT OPERATIONS ---
  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;

    const method = editingEvent.id ? 'PUT' : 'POST';
    const endpoint = editingEvent.id ? `/api/events/${editingEvent.id}` : '/api/events';

    fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingEvent)
    })
      .then((res) => res.json())
      .then(() => {
        setEditingEvent(null);
        fetchDashboardData();
      })
      .catch((e) => console.error(e));
  };

  // --- NEWS OPERATIONS ---
  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNews) return;

    const method = editingNews.id ? 'PUT' : 'POST';
    const endpoint = editingNews.id ? `/api/news/${editingNews.id}` : '/api/news';

    const payload = {
      ...editingNews,
      author: editingNews.author || currentUser?.name || 'Administrator'
    };

    fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then(() => {
        setEditingNews(null);
        fetchDashboardData();
      })
      .catch((e) => console.error(e));
  };

  // --- ANNOUNCEMENT OPERATIONS ---
  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAnnouncement) return;

    const method = editingAnnouncement.id ? 'PUT' : 'POST';
    const endpoint = editingAnnouncement.id ? `/api/announcements/${editingAnnouncement.id}` : '/api/announcements';

    const payload = {
      ...editingAnnouncement,
      isActive: editingAnnouncement.isActive !== undefined ? editingAnnouncement.isActive : true
    };

    fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then(() => {
        setEditingAnnouncement(null);
        fetchDashboardData();
      })
      .catch((e) => console.error(e));
  };

  // --- REPLY MESSAGE OPERATIONS ---
  const handleReplyMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyingMessage || !replyText) return;

    fetch(`/api/contact/${replyingMessage.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'Replied',
        replyContent: replyText
      })
    })
      .then(() => {
        setReplyingMessage(null);
        setReplyText('');
        fetchDashboardData();
      })
      .catch((e) => console.error(e));
  };

  // --- GEMINI AI ASSISTANT CONTENT SUGGESTION ---
  const handleAISubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiTopic) return;

    setLoadingAI(true);
    setAiOutput('');

    fetch('/api/ai/suggest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: aiTopic, type: aiType })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAiOutput(data.text);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingAI(false));
  };

  const handleApplyAIPress = () => {
    if (!aiOutput) return;
    if (aiType === 'announcement') {
      setEditingAnnouncement({
        title: `Notice: ${aiTopic}`,
        content: aiOutput,
        type: 'success',
        isActive: true
      });
      setActiveTab('announcements');
    } else {
      setEditingNews({
        title: aiTopic,
        content: aiOutput,
        summary: `Islamic announcement & bulletin regarding ${aiTopic}.`,
        category: 'Community Project',
        status: 'Published'
      });
      setActiveTab('news');
    }
    setAiOutput('');
    setAiTopic('');
  };

  // Search Filtered Lists
  const getFilteredMembers = () => {
    if (!searchQuery) return members;
    const q = searchQuery.toLowerCase();
    return members.filter(
      (m) =>
        m.firstName.toLowerCase().includes(q) ||
        m.lastName.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.stateOfOrigin.toLowerCase().includes(q)
    );
  };

  const getFilteredVolunteers = () => {
    if (!searchQuery) return volunteers;
    const q = searchQuery.toLowerCase();
    return volunteers.filter(
      (v) =>
        v.fullName.toLowerCase().includes(q) ||
        v.email.toLowerCase().includes(q) ||
        v.skills.some((sk) => sk.toLowerCase().includes(q))
    );
  };

  // --- RENDER SECURE LOGIN PANEL IF NOT LOGGED IN ---
  if (!isLoggedIn) {
    return (
      <div className="bg-slate-50 min-h-screen py-24 px-4 sm:px-6 flex items-center justify-center" id="admin-login-page">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl max-w-md w-full overflow-hidden">
          <div className="bg-emerald-950 text-white p-8 text-center space-y-3 border-b-4 border-amber-400">
            <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center font-bold text-emerald-950 border border-amber-300 text-2xl font-serif mx-auto shadow-inner">
              N
            </div>
            <h2 className="font-serif font-bold text-lg tracking-wide text-amber-400 uppercase">NiMAWA Admin Portal</h2>
            <p className="text-xs text-emerald-100/90 leading-relaxed">Sign in with authorized administrator credentials to manage news bulletins, events, and community registrations.</p>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-4">
            {loginError && (
              <div className="bg-red-50 border border-red-100 text-red-600 p-3.5 rounded-xl text-xs font-semibold leading-relaxed">
                {loginError}
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Admin Email Address
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="e.g. admin@nimawa.org.au"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors"
                id="login-email-input"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Security Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="e.g. admin123"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors"
                id="login-password-input"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loadingLogin}
                className="w-full py-3.5 bg-emerald-950 hover:bg-emerald-900 text-white font-extrabold text-xs rounded-xl shadow-md transition-all uppercase tracking-wider flex items-center justify-center gap-1.5"
                id="login-submit-btn"
              >
                <Key className="w-4 h-4 text-amber-400" />
                {loadingLogin ? 'Verifying Identity...' : 'Authorize Login'}
              </button>
            </div>

            <div className="border-t pt-4 text-center text-[10px] text-slate-400 leading-relaxed">
              Default Sandbox Credentials:<br/>
              Email: <code className="bg-slate-100 px-1 py-0.5 rounded font-bold text-slate-600">admin@nimawa.org.au</code> &bull; Password: <code className="bg-slate-100 px-1 py-0.5 rounded font-bold text-slate-600">admin123</code>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // --- RENDER DOCKER ADMIN DASHBOARD ---
  return (
    <div className="bg-slate-50 min-h-screen text-slate-800" id="admin-dashboard-page">
      {/* Top Welcome Title Bar */}
      <header className="bg-emerald-950 text-white border-b border-amber-400 py-6 px-4 sm:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center font-bold text-emerald-950 border border-amber-300 text-xl font-serif">
              N
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-amber-400">NiMAWA Administrator Console</h2>
              <p className="text-[10px] text-emerald-100">Welcome back, {currentUser?.name || 'Admin'} &bull; Role: {currentUser?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-emerald-900 border border-emerald-800 text-emerald-200 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            id="logout-button"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Side Navigation Control Column */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-1">
              <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 px-3.5 block mb-2">Management Console</span>
              
              {[
                { id: 'overview', label: 'Console Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
                { id: 'members', label: 'Members List', icon: <Users className="w-4 h-4" /> },
                { id: 'volunteers', label: 'Volunteer Registry', icon: <Users className="w-4 h-4" /> },
                { id: 'events', label: 'Events CMS', icon: <Calendar className="w-4 h-4" /> },
                { id: 'news', label: 'News Bulletin CMS', icon: <Newspaper className="w-4 h-4" /> },
                { id: 'announcements', label: 'Live Notices', icon: <Megaphone className="w-4 h-4" /> },
                { id: 'contact', label: 'Inquiry Inbox', icon: <Inbox className="w-4 h-4" /> },
                { id: 'donations', label: 'Donations Audit', icon: <Heart className="w-4 h-4" /> },
                { id: 'newsletter', label: 'Newsletter subs', icon: <Mail className="w-4 h-4" /> },
                { id: 'outbox', label: 'Mail Outbox Logs', icon: <Mail className="w-4 h-4" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setSearchQuery('');
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                    activeTab === tab.id
                      ? 'bg-emerald-900 text-white shadow'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                  id={`admin-tab-btn-${tab.id}`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Gemini AI Smart Assistant drafting sidebar */}
            <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white rounded-2xl p-5 border border-emerald-800 space-y-4 shadow-md">
              <div className="flex items-center gap-1.5 text-amber-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <h4 className="font-serif font-extrabold text-xs uppercase tracking-wider">Gemini Content Draft</h4>
              </div>
              <p className="text-[10px] text-emerald-100/90 leading-relaxed">
                Utilize server-side Gemini 2.5 Flash to automatically draft newsletter articles or short live notices instantly.
              </p>

              <form onSubmit={handleAISubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[9px] text-emerald-200 uppercase mb-1 font-bold">Concept / Topic</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramadan Joint Iftar food drive"
                    value={aiTopic}
                    onChange={(e) => setAiTopic(e.target.value)}
                    className="w-full bg-emerald-900/60 border border-emerald-800 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-amber-400 transition-colors placeholder:text-emerald-300/30"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-emerald-200 uppercase mb-1 font-bold">Draft Type</label>
                  <select
                    value={aiType}
                    onChange={(e) => setAiType(e.target.value as any)}
                    className="w-full bg-emerald-900/60 border border-emerald-800 rounded-xl py-2 px-3 text-xs focus:outline-none"
                  >
                    <option value="announcement">Announcement notice</option>
                    <option value="article">News Bulletin article</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={loadingAI}
                  className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold rounded-lg text-[10px] uppercase tracking-wide transition-all"
                  id="ai-generate-btn"
                >
                  {loadingAI ? 'Drafting Content...' : 'Generate with AI'}
                </button>
              </form>

              {aiOutput && (
                <div className="space-y-2 pt-2 border-t border-emerald-900">
                  <label className="block text-[9px] text-amber-400 font-bold">Preview Output:</label>
                  <div className="bg-emerald-950 border border-emerald-800 p-2.5 rounded-lg text-[10px] leading-relaxed text-emerald-100 max-h-40 overflow-y-auto font-mono">
                    {aiOutput}
                  </div>
                  <button
                    onClick={handleApplyAIPress}
                    className="w-full py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white border border-emerald-700 rounded-lg text-[10px] font-bold"
                    id="ai-apply-draft-btn"
                  >
                    Load into Editor &rarr;
                  </button>
                </div>
              )}
            </div>
          </aside>

          {/* Main CMS Display Panels */}
          <main className="lg:col-span-9 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            
            {/* SEARCH INPUT IF REQUIRED FOR LISTS */}
            {['members', 'volunteers'].includes(activeTab) && (
              <div className="mb-6">
                <input
                  type="text"
                  placeholder={`Search ${activeTab === 'members' ? 'members by name/email/state' : 'volunteers by skills/name'}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-emerald-850 transition-colors"
                  id="admin-list-search-input"
                />
              </div>
            )}

            {/* TAB PANEL 1: CONSOLE OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-8" id="tab-overview-panel">
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-900">Consolidated System Statistics</h3>
                  <p className="text-xs text-slate-500 mt-1">Real-time counts of database objects.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-slate-50 p-5 rounded-2xl border text-center">
                    <span className="text-3xl font-black text-emerald-900 block">{members.length}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1">Members</span>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-2xl border text-center">
                    <span className="text-3xl font-black text-emerald-900 block">{volunteers.length}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1">Volunteers</span>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-2xl border text-center">
                    <span className="text-3xl font-black text-emerald-900 block">{events.length}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1">Events Created</span>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-2xl border text-center">
                    <span className="text-3xl font-black text-emerald-900 block">${donations.reduce((sum, d) => sum + d.amount, 0)}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1">Total Donated</span>
                  </div>
                </div>

                {/* Live notices quick toggle list */}
                <div className="space-y-3.5">
                  <h4 className="font-bold text-sm text-slate-900 font-serif border-b pb-2">Admin Notice Board</h4>
                  <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 text-xs text-slate-700 leading-relaxed space-y-2">
                    <p className="font-bold text-emerald-950">1. Welcome to the NiMAWA Sandbox Board</p>
                    <p>All email notifications (registrations, bookings, receipts, contact replies) are fully simulated! We save the absolute HTML output files locally under <code>./data/emails/</code>. You can preview them inside the <strong>"Mail Outbox Logs"</strong> tab on the left! This lets you test the exact template designs with no configuration.</p>
                    <p>2. The <code>database.json</code> file is automatically managed. It persists all members, event listings, blog CMS creations, and newsletter subscribers perfectly between browser refreshes.</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB PANEL 2: MEMBERS LIST */}
            {activeTab === 'members' && (
              <div className="space-y-4" id="tab-members-panel">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif font-bold text-lg text-slate-900">Registered Members List ({getFilteredMembers().length})</h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 font-bold border-b">
                        <th className="p-3">Name / DOB</th>
                        <th className="p-3">Contact</th>
                        <th className="p-3">State / Origin</th>
                        <th className="p-3">Quran Class Interest</th>
                        <th className="p-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-slate-600">
                      {getFilteredMembers().map((m) => (
                        <tr key={m.id} className="hover:bg-slate-50/50">
                          <td className="p-3">
                            <span className="block font-bold text-slate-900">{m.firstName} {m.lastName}</span>
                            <span className="text-[10px] text-slate-400">DOB: {m.dob} &bull; {m.gender}</span>
                          </td>
                          <td className="p-3">
                            <span className="block font-semibold">{m.email}</span>
                            <span className="text-[10px] text-slate-400">{m.phone}</span>
                          </td>
                          <td className="p-3">
                            <span className="block font-semibold">{m.city}, {m.state}</span>
                            <span className="text-[10px] text-slate-400">Origin: {m.stateOfOrigin}</span>
                          </td>
                          <td className="p-3">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              m.quranClassInterest ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-50 text-slate-400'
                            }`}>
                              {m.quranClassInterest ? 'Interested' : 'No'}
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => handleDeleteMember(m.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-slate-100 transition-colors"
                              title="Delete Member"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB PANEL 3: VOLUNTEERS LIST */}
            {activeTab === 'volunteers' && (
              <div className="space-y-4" id="tab-volunteers-panel">
                <h3 className="font-serif font-bold text-lg text-slate-900">Volunteer Network ({getFilteredVolunteers().length})</h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 font-bold border-b">
                        <th className="p-3">Volunteer Details</th>
                        <th className="p-3">Skills Registered</th>
                        <th className="p-3">Availability / Interests</th>
                        <th className="p-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-slate-600">
                      {getFilteredVolunteers().map((v) => (
                        <tr key={v.id} className="hover:bg-slate-50/50">
                          <td className="p-3">
                            <span className="block font-bold text-slate-900">{v.fullName}</span>
                            <span className="text-[10px] text-slate-400">{v.email} &bull; {v.phone}</span>
                          </td>
                          <td className="p-3">
                            <div className="flex flex-wrap gap-1">
                              {v.skills.map((s, idx) => (
                                <span key={idx} className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[9px] font-semibold">{s}</span>
                              ))}
                            </div>
                          </td>
                          <td className="p-3 text-slate-500">
                            <p className="font-medium text-slate-700">Avail: {v.availability}</p>
                            <p className="text-[10px] truncate max-w-[200px]">Ints: {v.interests}</p>
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => handleDeleteVolunteer(v.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-slate-100 transition-colors"
                              title="Delete Volunteer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB PANEL 4: EVENTS CMS */}
            {activeTab === 'events' && (
              <div className="space-y-6" id="tab-events-cms-panel">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif font-bold text-lg text-slate-900">Events Management</h3>
                  <button
                    onClick={() => setEditingEvent({ title: '', category: 'Monthly Gathering', date: '', venue: '', time: '', speaker: '', description: '' })}
                    className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                    id="new-event-btn"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Create Event Listing
                  </button>
                </div>

                {editingEvent ? (
                  /* Event Editor Form */
                  <form onSubmit={handleSaveEvent} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
                    <h4 className="font-bold text-slate-900 text-sm border-b pb-2">{editingEvent.id ? 'Edit Event Listing' : 'Create Event Listing'}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Event Title *</label>
                        <input type="text" required value={editingEvent.title || ''} onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Category *</label>
                        <select value={editingEvent.category || 'Monthly Gathering'} onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value as any })} className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs">
                          <option value="Monthly Gathering">Monthly Gathering</option>
                          <option value="Ramadan">Ramadan Joint Iftar</option>
                          <option value="Eid">Eid Celebrations</option>
                          <option value="General">General Gatherings</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Event Date *</label>
                        <input type="date" required value={editingEvent.date || ''} onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Time Slot *</label>
                        <input type="text" required value={editingEvent.time || ''} onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })} placeholder="e.g. 14:00 - 17:00" className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Venue Address *</label>
                        <input type="text" required value={editingEvent.venue || ''} onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })} placeholder="e.g. Cannington Exhibition Center" className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Speaker / Imam</label>
                        <input type="text" value={editingEvent.speaker || ''} onChange={(e) => setEditingEvent({ ...editingEvent, speaker: e.target.value })} placeholder="e.g. Imam Yahya Ibrahim" className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Feature Banner Image URL</label>
                        <input type="text" value={editingEvent.imageUrl || ''} onChange={(e) => setEditingEvent({ ...editingEvent, imageUrl: e.target.value })} placeholder="Unsplash image link" className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Detailed Description *</label>
                      <textarea required rows={4} value={editingEvent.description || ''} onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs"></textarea>
                    </div>

                    <div className="flex gap-2">
                      <button type="submit" className="px-5 py-2.5 bg-emerald-900 text-white text-xs font-bold rounded-xl hover:bg-emerald-800 transition-colors">Save Event Listing</button>
                      <button type="button" onClick={() => setEditingEvent(null)} className="px-4 py-2.5 bg-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-300 transition-colors">Cancel</button>
                    </div>
                  </form>
                ) : (
                  /* Listings display list */
                  <div className="space-y-3">
                    {events.map((evt) => (
                      <div key={evt.id} className="flex justify-between items-center text-xs p-4 bg-slate-50 rounded-2xl border">
                        <div>
                          <span className="block font-bold text-slate-900 text-sm">{evt.title}</span>
                          <span className="text-[10px] text-slate-400">Date: {evt.date} &bull; Time: {evt.time} &bull; Venue: {evt.venue}</span>
                        </div>
                        <div className="flex gap-1">
                          <button onClick={() => setEditingEvent(evt)} className="p-1.5 text-slate-500 hover:text-emerald-800 hover:bg-white rounded border border-slate-200 bg-white"><Edit2 className="w-3.5 h-3.5" /></button>
                          <button onClick={() => handleDeleteEvent(evt.id)} className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-white rounded border border-slate-200 bg-white"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB PANEL 5: NEWS BULLETIN CMS */}
            {activeTab === 'news' && (
              <div className="space-y-6" id="tab-news-cms-panel">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif font-bold text-lg text-slate-900">News Bulletins & CMS</h3>
                  <button
                    onClick={() => setEditingNews({ title: '', category: 'Community Project', content: '', summary: '', status: 'Published' })}
                    className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                    id="new-news-btn"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Write News Article
                  </button>
                </div>

                {editingNews ? (
                  /* News Article Editor Form */
                  <form onSubmit={handleSaveNews} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
                    <h4 className="font-bold text-slate-900 text-sm border-b pb-2">{editingNews.id ? 'Edit News Article' : 'Write News Article'}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Article Title *</label>
                        <input type="text" required value={editingNews.title || ''} onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Category *</label>
                        <select value={editingNews.category || 'Community Project'} onChange={(e) => setEditingNews({ ...editingNews, category: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs">
                          <option value="Community Project">Community Project</option>
                          <option value="Welfare">Welfare & Settlers</option>
                          <option value="Education">Education</option>
                          <option value="General">General Updates</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Featured Image URL</label>
                        <input type="text" value={editingNews.imageUrl || ''} onChange={(e) => setEditingNews({ ...editingNews, imageUrl: e.target.value })} placeholder="Unsplash URL" className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Status *</label>
                        <select value={editingNews.status || 'Published'} onChange={(e) => setEditingNews({ ...editingNews, status: e.target.value as any })} className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs">
                          <option value="Published">Published</option>
                          <option value="Draft">Draft</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Short Summary *</label>
                      <input type="text" required value={editingNews.summary || ''} onChange={(e) => setEditingNews({ ...editingNews, summary: e.target.value })} placeholder="e.g. Brief 1-sentence recap of property acquisition milestones" className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs" />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Full Markdown / Text Content *</label>
                      <textarea required rows={7} value={editingNews.content || ''} onChange={(e) => setEditingNews({ ...editingNews, content: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs"></textarea>
                    </div>

                    <div className="flex gap-2">
                      <button type="submit" className="px-5 py-2.5 bg-emerald-900 text-white text-xs font-bold rounded-xl hover:bg-emerald-800 transition-colors">Publish Article</button>
                      <button type="button" onClick={() => setEditingNews(null)} className="px-4 py-2.5 bg-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-300 transition-colors">Cancel</button>
                    </div>
                  </form>
                ) : (
                  /* News List list */
                  <div className="space-y-3">
                    {news.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-xs p-4 bg-slate-50 rounded-2xl border">
                        <div>
                          <span className="block font-bold text-slate-900 text-sm">{item.title}</span>
                          <span className="text-[10px] text-slate-400">Category: {item.category} &bull; Date: {new Date(item.createdAt).toLocaleDateString()} &bull; Status: <strong className={item.status === 'Published' ? 'text-emerald-700' : 'text-amber-600'}>{item.status}</strong></span>
                        </div>
                        <div className="flex gap-1">
                          <button onClick={() => setEditingNews(item)} className="p-1.5 text-slate-500 hover:text-emerald-800 hover:bg-white rounded border border-slate-200 bg-white"><Edit2 className="w-3.5 h-3.5" /></button>
                          <button onClick={() => handleDeleteNews(item.id)} className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-white rounded border border-slate-200 bg-white"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB PANEL 6: LIVE ANNOUNCEMENTS CMS */}
            {activeTab === 'announcements' && (
              <div className="space-y-6" id="tab-announcements-cms-panel">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif font-bold text-lg text-slate-900">Live Homepage Announcements</h3>
                  <button
                    onClick={() => setEditingAnnouncement({ title: '', content: '', type: 'info', isActive: true })}
                    className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                    id="new-ann-btn"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Post Notice
                  </button>
                </div>

                {editingAnnouncement ? (
                  /* Announcement Editor Form */
                  <form onSubmit={handleSaveAnnouncement} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
                    <h4 className="font-bold text-slate-900 text-sm border-b pb-2">{editingAnnouncement.id ? 'Edit Announcement' : 'Post Announcement'}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Banner Headline *</label>
                        <input type="text" required value={editingAnnouncement.title || ''} onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, title: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Type Style *</label>
                        <select value={editingAnnouncement.type || 'info'} onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, type: e.target.value as any })} className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs">
                          <option value="info">Info Accent (Deep blue)</option>
                          <option value="success">Success Accent (Emerald)</option>
                          <option value="warning">Warning Accent (Amber)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Brief notice details (max 1 sentence) *</label>
                      <input type="text" required value={editingAnnouncement.content || ''} onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, content: e.target.value })} placeholder="e.g. Register today for Hifdh online class classes starting Term 3." className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs" />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button type="submit" className="px-5 py-2.5 bg-emerald-900 text-white text-xs font-bold rounded-xl hover:bg-emerald-800 transition-colors">Post Live Notice</button>
                      <button type="button" onClick={() => setEditingAnnouncement(null)} className="px-4 py-2.5 bg-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-300 transition-colors">Cancel</button>
                    </div>
                  </form>
                ) : (
                  /* Announcements list */
                  <div className="space-y-3">
                    {announcements.map((ann) => (
                      <div key={ann.id} className="flex justify-between items-center text-xs p-4 bg-slate-50 rounded-2xl border">
                        <div>
                          <span className="block font-bold text-slate-900 text-sm">{ann.title}</span>
                          <span className="text-[10px] text-slate-400">Content: {ann.content} &bull; Type: <code className="bg-slate-100 px-1 py-0.5 rounded font-bold">{ann.type}</code> &bull; Active: <strong className={ann.isActive ? 'text-emerald-700' : 'text-slate-400'}>{ann.isActive ? 'Yes' : 'No'}</strong></span>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => {
                              fetch(`/api/announcements/${ann.id}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ isActive: !ann.isActive })
                              }).then(() => fetchDashboardData());
                            }}
                            className={`px-2.5 py-1.5 rounded font-bold text-[10px] border ${
                              ann.isActive ? 'bg-amber-100 text-amber-850' : 'bg-white'
                            }`}
                          >
                            Toggle Active
                          </button>
                          <button onClick={() => handleDeleteAnnouncement(ann.id)} className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-white rounded border border-slate-200 bg-white"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB PANEL 7: INQUIRY INBOX */}
            {activeTab === 'contact' && (
              <div className="space-y-6" id="tab-inbox-panel">
                <h3 className="font-serif font-bold text-lg text-slate-900">Inquiry Inbox</h3>

                {replyingMessage ? (
                  /* Reply Dialog Panel Form */
                  <form onSubmit={handleReplyMessage} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
                    <h4 className="font-bold text-slate-900 text-sm border-b pb-2">Reply to: {replyingMessage.name}</h4>
                    <div className="bg-white p-3.5 rounded-xl border text-xs text-slate-500 leading-relaxed">
                      <p><strong>Sender:</strong> {replyingMessage.name} ({replyingMessage.email})</p>
                      <p><strong>Subject:</strong> {replyingMessage.subject}</p>
                      <p className="mt-2 text-slate-700 border-l-2 pl-3 italic">"{replyingMessage.message}"</p>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Your reply message *</label>
                      <textarea required rows={5} value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Assalamu Alaykum, thank you for your request..." className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-xs focus:outline-none"></textarea>
                    </div>

                    <div className="flex gap-2">
                      <button type="submit" className="px-5 py-2.5 bg-emerald-900 text-white text-xs font-bold rounded-xl hover:bg-emerald-800 transition-colors">Send Official Reply</button>
                      <button type="button" onClick={() => { setReplyingMessage(null); setReplyText(''); }} className="px-4 py-2.5 bg-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-300 transition-colors">Cancel</button>
                    </div>
                  </form>
                ) : (
                  /* Inquiries lists */
                  <div className="space-y-3">
                    {messages.map((msg) => (
                      <div key={msg.id} className="p-4 bg-slate-50 rounded-2xl border text-xs text-slate-600 space-y-3.5">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <span className="block font-bold text-slate-900 text-sm">{msg.subject}</span>
                            <span className="text-[10px] text-slate-400">By: {msg.name} ({msg.email}) &bull; Date: {new Date(msg.createdAt).toLocaleString()}</span>
                          </div>
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            msg.status === 'Unread' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-800'
                          }`}>
                            {msg.status}
                          </span>
                        </div>

                        <p className="text-slate-700 leading-relaxed font-serif p-2.5 bg-white border rounded-xl italic">
                          "{msg.message}"
                        </p>

                        {msg.replyContent && (
                          <div className="bg-emerald-900/5 p-3 rounded-xl border border-emerald-800/10 text-[11px] text-emerald-900">
                            <strong>System Reply Sent:</strong>
                            <p className="mt-1 italic">"{msg.replyContent}"</p>
                          </div>
                        )}

                        <div className="flex gap-1.5 justify-end">
                          {msg.status === 'Unread' && (
                            <button onClick={() => setReplyingMessage(msg)} className="px-3 py-1.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-lg text-[10px] font-bold flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> Reply Enquirer</button>
                          )}
                          <button onClick={() => handleDeleteMessage(msg.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-white bg-white border rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB PANEL 8: DONATIONS AUDIT */}
            {activeTab === 'donations' && (
              <div className="space-y-4" id="tab-donations-panel">
                <h3 className="font-serif font-bold text-lg text-slate-900">Donations Audit Ledgers</h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 font-bold border-b">
                        <th className="p-3">Receipt / Donor</th>
                        <th className="p-3">Funding Target</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Method</th>
                        <th className="p-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-slate-600">
                      {donations.map((d) => (
                        <tr key={d.id} className="hover:bg-slate-50/50">
                          <td className="p-3">
                            <span className="block font-mono font-bold text-slate-900">{d.receiptNumber}</span>
                            <span className="text-[10px] text-slate-400">By: {d.donorName} ({d.donorEmail})</span>
                          </td>
                          <td className="p-3 font-semibold text-slate-700">{d.target}</td>
                          <td className="p-3 font-bold text-emerald-700">${d.amount}.00 AUD</td>
                          <td className="p-3 font-mono font-semibold">{d.paymentMethod}</td>
                          <td className="p-3 text-slate-400">{new Date(d.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB PANEL 9: NEWSLETTER SUBSCRIBERS */}
            {activeTab === 'newsletter' && (
              <div className="space-y-4" id="tab-newsletter-panel">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif font-bold text-lg text-slate-900">Newsletter subscribers ({newsletterSubscribers.length})</h3>
                  <a
                    href="/api/newsletter/export-csv"
                    className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                    id="export-csv-btn"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Export CSV List
                  </a>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                  <div className="space-y-2.5">
                    {newsletterSubscribers.map((email, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs p-3 bg-white rounded-xl border border-slate-100 font-semibold text-slate-700">
                        <span>{email}</span>
                        <button
                          onClick={() => {
                            if (confirm('Unsubscribe this user?')) {
                              fetch('/api/newsletter/subscribe', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ email, unsubscribe: true }) // Mock endpoint handles deletion or similar
                              }).then(() => fetchDashboardData());
                            }
                          }}
                          className="text-[10px] font-bold text-red-500 hover:text-red-700"
                        >
                          Unsubscribe
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB PANEL 10: SYSTEM MAIL OUTBOX LOGS */}
            {activeTab === 'outbox' && (
              <div className="space-y-6" id="tab-outbox-panel">
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-900">System Mail Outbox logs</h3>
                  <p className="text-xs text-slate-500 mt-1">Explore exact HTML outbox email templates generated and dispatched by NiMAWA.</p>
                </div>

                <div className="space-y-4">
                  {outboxEmails.length === 0 ? (
                    <div className="text-center py-10 text-slate-400 text-xs">No dispatched logs found yet. Register/Donate to trigger logs!</div>
                  ) : (
                    outboxEmails.map((mail) => (
                      <div key={mail.id} className="bg-slate-50 rounded-2xl p-4 border text-xs text-slate-600 space-y-3">
                        <div className="flex justify-between items-start gap-2 border-b pb-2">
                          <div>
                            <span className="block font-bold text-slate-900">To: {mail.to}</span>
                            <span className="text-[10px] font-semibold text-emerald-800">Subject: {mail.subject}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1 shrink-0">
                            <Clock className="w-3 h-3" />
                            {new Date(mail.timestamp).toLocaleString()}
                          </span>
                        </div>

                        {/* Interactive HTML render preview box */}
                        <div className="bg-white p-4 rounded-xl border max-h-60 overflow-y-auto overflow-x-hidden shadow-inner">
                          <div dangerouslySetInnerHTML={{ __html: mail.body }}></div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}
