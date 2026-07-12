import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnnouncementsBar from './components/AnnouncementsBar';

// Page Imports
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import QuranClass from './pages/QuranClass';
import News from './pages/News';
import Gallery from './pages/Gallery';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="flex flex-col min-h-screen bg-slate-50 font-sans antialiased text-slate-800" id="app-root-container">
        {/* Top Announcements Notice Bar */}
        <AnnouncementsBar />

        {/* Global Navigation Header Bar */}
        <Navbar />

        {/* Primary Page Router Views */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/quran-class" element={<QuranClass />} />
            <Route path="/news" element={<News />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        {/* Persistent footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
