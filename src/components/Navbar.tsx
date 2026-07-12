import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Shield, LogOut, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminName, setAdminName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const adminStr = localStorage.getItem('nimawa_admin_user');
    if (adminStr) {
      const admin = JSON.parse(adminStr);
      setIsAdminLoggedIn(true);
      setAdminName(admin.name);
    } else {
      setIsAdminLoggedIn(false);
    }
  }, [location.pathname]); // Update state on page changes

  const handleLogout = () => {
    localStorage.removeItem('nimawa_admin_user');
    localStorage.removeItem('nimawa_admin_token');
    setIsAdminLoggedIn(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Quran Class', path: '/quran-class' },
    { name: 'News & Projects', path: '/news' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Donate', path: '/donate' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <nav id="app-navbar" className="bg-emerald-950 text-white sticky top-0 z-40 shadow-md border-b border-emerald-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-4 group" id="navbar-brand">
              <div className="w-10 h-10 bg-emerald-900 border border-amber-500/30 rounded-lg flex items-center justify-center transform rotate-45 shadow-md group-hover:rotate-[225deg] transition-all duration-500">
                <div className="transform -rotate-45 font-serif text-lg font-bold text-amber-400">N</div>
              </div>
              <div>
                <span className="font-serif text-lg font-bold tracking-wider text-amber-400 block group-hover:text-amber-300 transition-colors uppercase leading-none">
                  NiMAWA
                </span>
                <span className="text-[8px] uppercase tracking-[0.18em] text-emerald-200 block font-semibold mt-1">
                  Western Australia
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'text-emerald-100/80 hover:bg-emerald-900/60 hover:text-white'
                  }`
                }
                id={`nav-link-${link.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* User/Admin Login Control */}
          <div className="hidden lg:flex items-center gap-3">
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/admin"
                  className="px-3 py-2 bg-emerald-900 border border-emerald-800 text-amber-400 hover:bg-emerald-800 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  id="navbar-admin-dash-btn"
                >
                  <Shield className="w-3 h-3" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-emerald-200 hover:text-white hover:bg-emerald-900/60 rounded-lg transition-colors"
                  title="Logout"
                  id="navbar-logout-btn"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                to="/admin"
                className="px-3 py-2 border border-emerald-800 hover:border-emerald-700 text-emerald-200 hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
                id="navbar-admin-login-btn"
              >
                <Shield className="w-3 h-3" />
                Admin Portal
              </Link>
            )}
            <Link
              to="/register"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-full text-[10px] uppercase tracking-widest shadow-md transition-all"
              id="navbar-join-btn"
            >
              Join Association
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-emerald-900 focus:outline-none transition-colors"
              id="mobile-menu-btn"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-emerald-950 border-t border-emerald-900 px-2 pt-2 pb-4 space-y-1 shadow-inner">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-amber-400 text-emerald-950 font-semibold'
                    : 'text-emerald-100 hover:bg-emerald-900'
                }`
              }
              id={`nav-link-mobile-${link.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            >
              {link.name}
            </NavLink>
          ))}
          <div className="border-t border-emerald-900 pt-4 pb-2 space-y-2 px-4">
            {isAdminLoggedIn ? (
              <div className="space-y-2">
                <p className="text-[11px] text-emerald-300">Logged in as {adminName}</p>
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-900 text-amber-400 rounded-lg text-xs font-semibold"
                  id="mobile-admin-btn"
                >
                  <Shield className="w-4 h-4" />
                  Admin Dashboard
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-emerald-900 text-emerald-200 rounded-lg text-xs font-semibold"
                  id="mobile-logout-btn"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-emerald-900 text-emerald-200 rounded-lg text-xs font-semibold"
                id="mobile-portal-btn"
              >
                <Shield className="w-4 h-4" />
                Admin Portal
              </Link>
            )}
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center px-4 py-2 bg-amber-500 text-emerald-950 font-bold rounded-lg text-xs"
              id="mobile-join-btn"
            >
              Join Association
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
