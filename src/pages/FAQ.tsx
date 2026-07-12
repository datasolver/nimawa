import { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, AlertCircle, HelpCircle } from 'lucide-react';
import { FAQItem } from '../types';

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/faqs')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFaqs(data.faqs);
        }
      })
      .catch((err) => console.error('Error fetching FAQs:', err));
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-16" id="faq-page">
      {/* Header */}
      <section className="bg-emerald-950 text-white py-16 text-center relative overflow-hidden border-b border-amber-400">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-3">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-emerald-900/60 px-3 py-1 rounded border border-emerald-800">
            Support center
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            Get clear, comprehensive answers to questions regarding membership, volunteering, Quran academy, donations, and events in Perth.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-6">
          
          {/* Search bar */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4.5 top-5" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 pl-12 text-xs focus:outline-none focus:border-emerald-800 transition-colors"
              id="faq-search-input"
            />
          </div>

          {/* Accordion List */}
          {filteredFAQs.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-slate-100 space-y-3">
              <AlertCircle className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-slate-500 font-medium text-xs">No matching questions found.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                id="reset-faq-btn"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {filteredFAQs.map((faq) => {
                const isOpen = expandedId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-200"
                    id={`faq-accordion-${faq.id}`}
                  >
                    {/* Header trigger */}
                    <button
                      onClick={() => toggleExpand(faq.id)}
                      className="w-full p-5 text-left flex justify-between items-center gap-4 hover:bg-slate-50/50 transition-colors focus:outline-none"
                    >
                      <div className="flex items-start gap-2.5">
                        <HelpCircle className="w-4.5 h-4.5 text-emerald-800 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[9px] font-mono font-bold uppercase text-amber-600 block mb-0.5">{faq.category}</span>
                          <span className="font-serif font-bold text-slate-900 text-xs sm:text-sm leading-snug">{faq.question}</span>
                        </div>
                      </div>
                      <span className="p-1 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-slate-500">
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </span>
                    </button>

                    {/* Expandable Body */}
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 border-t border-slate-50 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/30">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Contact help block */}
          <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 text-center space-y-3 mt-10">
            <h4 className="font-bold text-slate-900 font-serif text-sm">Have an Unanswered Question?</h4>
            <p className="text-xs text-slate-600">
              Our support team is always active. Contact our general inquiries team or welfare coordinator and we will assist you immediately.
            </p>
            <a
              href="/contact"
              className="inline-block px-5 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-all shadow-sm"
              id="faq-contact-btn"
            >
              Ask our Secretariat &rarr;
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
