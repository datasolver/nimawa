import { useState, useEffect } from 'react';
import { Search, Calendar, User, ArrowLeft, BookOpen, AlertCircle } from 'lucide-react';
import { NewsArticle } from '../types';

export default function News() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // Search & Filtering States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState<string[]>(['All']);

  // Loading / Error
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const published = data.articles.filter((a: NewsArticle) => a.status === 'Published');
          setArticles(published);
          setFilteredArticles(published);

          // Extract unique categories
          const cats = ['All', ...new Set(published.map((a: NewsArticle) => a.category))];
          setCategories(cats);
        }
      })
      .catch((err) => console.error('Error fetching news:', err))
      .finally(() => setLoading(false));
  }, []);

  // Filter and search handling
  useEffect(() => {
    let result = articles;

    if (selectedCategory !== 'All') {
      result = result.filter((a) => a.category === selectedCategory);
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.content.toLowerCase().includes(q)
      );
    }

    setFilteredArticles(result);
  }, [searchQuery, selectedCategory, articles]);

  return (
    <div className="bg-slate-50 min-h-screen pb-16" id="news-page">
      {/* Page Title Header */}
      <section className="bg-emerald-950 text-white py-16 text-center relative overflow-hidden border-b border-amber-400">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-3">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-emerald-900/60 px-3 py-1 rounded border border-emerald-800">
            Official Bulletin
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
            NiMAWA News, Projects & updates
          </h1>
          <p className="text-sm text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            Follow the progression of our Islamic Center Property acquisitions, welfare initiatives, and essential community newsletters.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {selectedArticle ? (
          /* Detailed News Article View */
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-10 max-w-4xl mx-auto space-y-6" id="news-article-detail">
            <button
              onClick={() => setSelectedArticle(null)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all inline-flex items-center gap-1.5"
              id="back-to-news-btn"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to News List
            </button>

            {selectedArticle.imageUrl && (
              <img
                src={selectedArticle.imageUrl}
                alt={selectedArticle.title}
                className="w-full h-80 object-cover rounded-2xl border border-slate-100"
                referrerPolicy="no-referrer"
              />
            )}

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 border-b pb-4">
                <span className="text-amber-600 font-bold uppercase bg-amber-50 border border-amber-100 px-2 py-0.5 rounded">
                  {selectedArticle.category}
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(selectedArticle.createdAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  <strong>Author:</strong> {selectedArticle.author}
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {selectedArticle.title}
              </h2>

              <p className="font-semibold text-slate-700 text-sm italic leading-relaxed border-l-4 border-amber-400 pl-4 py-1 bg-slate-50 rounded-r-xl">
                {selectedArticle.summary}
              </p>

              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-4 whitespace-pre-wrap pt-4">
                {selectedArticle.content}
              </div>
            </div>
          </div>
        ) : (
          /* General Listing View */
          <div className="space-y-8">
            {/* Search and Category Filter Toolbar */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Category buttons */}
              <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      selectedCategory === cat
                        ? 'bg-emerald-900 text-white'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                    id={`category-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search input bar */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 pl-10 text-xs focus:outline-none focus:border-emerald-800 transition-colors"
                  id="news-search-input"
                />
              </div>
            </div>

            {loading ? (
              <div className="text-center py-20 text-slate-500 text-xs">Loading bulletin articles...</div>
            ) : filteredArticles.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-slate-100 space-y-3">
                <AlertCircle className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-slate-500 font-medium text-xs">No matching articles found.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                  id="reset-search-btn"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              /* News Cards Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((news) => (
                  <article
                    key={news.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md hover:scale-[1.01] transition-all flex flex-col justify-between"
                  >
                    <div>
                      {news.imageUrl && (
                        <img
                          src={news.imageUrl}
                          alt={news.title}
                          className="w-full h-48 object-cover"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <div className="p-6 space-y-3">
                        <div className="flex justify-between items-center text-[10px] text-slate-400">
                          <span className="text-amber-600 font-bold bg-amber-50 border border-amber-100 px-2.5 py-0.5 rounded">
                            {news.category}
                          </span>
                          <span className="font-mono">
                            {new Date(news.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="font-serif text-base font-bold text-slate-900 leading-snug line-clamp-2">
                          {news.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                          {news.summary}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 border-t border-slate-50 bg-slate-50/20 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-medium truncate max-w-[60%]">
                        By: {news.author}
                      </span>
                      <button
                        onClick={() => setSelectedArticle(news)}
                        className="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1 shrink-0"
                        id={`read-article-btn-${news.id}`}
                      >
                        Read Full Story
                        <BookOpen className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
