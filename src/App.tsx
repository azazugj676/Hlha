import React, { useState, useEffect, useMemo } from 'react';
import { GUIDES } from './data/guides';
import { CATEGORIES } from './data/categories';
import { CategoryId, Guide, PageView } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ArticleCard } from './components/ArticleCard';
import { ArticleModal } from './components/ArticleModal';
import { DiagnosticWizard } from './components/DiagnosticWizard';
import { QuickToolsModal } from './components/QuickToolsModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { RequestGuideModal } from './components/RequestGuideModal';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { StartHereSection } from './components/StartHereSection';
import { FAQSection } from './components/FAQSection';
import { AdvancedSearch } from './components/AdvancedSearch';
import { StaticPages } from './components/StaticPages';
import { AdSlot } from './components/AdSlot';
import { ArrowLeft, Sparkles, TrendingUp, Compass, ArrowUp } from 'lucide-react';

const STORAGE_KEY_BOOKMARKS = 'halha_bookmarks_v1';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGuideId, setActiveGuideId] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [showQuickTools, setShowQuickTools] = useState(false);
  const [quickToolDefault, setQuickToolDefault] = useState<'water' | 'touch' | 'screen' | 'network'>('water');
  const [showBookmarksDrawer, setShowBookmarksDrawer] = useState(false);
  const [showRequestGuideModal, setShowRequestGuideModal] = useState(false);
  const [showDiagnosticSection, setShowDiagnosticSection] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Monitor scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync title and SEO metadata dynamically based on active page or article
  useEffect(() => {
    if (activeGuideId) {
      const g = GUIDES.find((item) => item.id === activeGuideId);
      if (g) {
        document.title = `${g.title} | حلّها`;
        return;
      }
    }

    switch (currentPage) {
      case 'about':
        document.title = 'من نحن | منصة حلّها للحلول والشروحات التقنية';
        break;
      case 'contact':
        document.title = 'تواصل معنا | منصة حلّها';
        break;
      case 'privacy':
        document.title = 'سياسة الخصوصية | حلّها';
        break;
      case 'cookies':
        document.title = 'سياسة ملفات تعريف الارتباط | حلّها';
        break;
      case 'disclaimer':
        document.title = 'إخلاء المسؤولية | حلّها';
        break;
      case 'terms':
        document.title = 'شروط الاستخدام | حلّها';
        break;
      case 'search':
        document.title = 'البحث المتقدم في الحلول والشروحات | حلّها';
        break;
      default:
        document.title = 'حلّها | Halha - حلول تقنية وشروحات عربية مبسطة';
    }
  }, [currentPage, activeGuideId]);

  // Load bookmarks on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BOOKMARKS);
      if (saved) {
        setBookmarkedIds(JSON.parse(saved));
      }
    } catch {
      // Ignored
    }
  }, []);

  // Save bookmarks
  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(next));
      } catch {
        // Ignored
      }
      return next;
    });
  };

  const clearAllBookmarks = () => {
    setBookmarkedIds([]);
    try {
      localStorage.removeItem(STORAGE_KEY_BOOKMARKS);
    } catch {
      // Ignored
    }
  };

  // Filtered guides based on category and search query
  const filteredGuides = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return GUIDES.filter((guide) => {
      // Category match
      if (activeCategory !== 'all' && guide.category !== activeCategory) {
        return false;
      }

      // Search match
      if (!q) return true;

      const haystack = [
        guide.title,
        guide.excerpt,
        guide.intro,
        guide.tags.join(' '),
        guide.symptoms.join(' '),
        guide.devicesAffected.join(' '),
        ...guide.steps.map((s) => `${s.title} ${s.detail}`),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [activeCategory, searchQuery]);

  // Top Most Read Guides
  const topReadGuides = useMemo(() => {
    return [...GUIDES]
      .sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0))
      .slice(0, 3);
  }, []);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: GUIDES.length };
    GUIDES.forEach((g) => {
      counts[g.category] = (counts[g.category] || 0) + 1;
    });
    return counts;
  }, []);

  const activeGuide = activeGuideId
    ? GUIDES.find((g) => g.id === activeGuideId) || null
    : null;

  const bookmarkedGuides = GUIDES.filter((g) => bookmarkedIds.includes(g.id));

  const handleSelectQuickTag = (tag: string) => {
    setSearchQuery(tag);
    setActiveCategory('all');
    setCurrentPage('home');
    const el = document.getElementById('articles');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenDiagnostic = () => {
    if (currentPage !== 'home') setCurrentPage('home');
    setShowDiagnosticSection(true);
    setTimeout(() => {
      const el = document.getElementById('diagnostic-section');
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleOpenTool = (tool: 'water' | 'touch' | 'screen' | 'network' = 'water') => {
    setQuickToolDefault(tool);
    setShowQuickTools(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] flex flex-col font-sans selection:bg-[#0071e3]/15 selection:text-[#0071e3]">
      {/* Dynamic SEO Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'حلّها | Halha',
            url: 'https://halha.tech/',
            description: 'منصة تقنية عربية شاملة للحلول والشروحات التقنية المبسطة وأدوات فحص الأجهزة.',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://halha.tech/?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />

      {/* Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={(p) => {
          setCurrentPage(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        bookmarksCount={bookmarkedIds.length}
        onOpenBookmarks={() => setShowBookmarksDrawer(true)}
        onOpenTools={() => handleOpenTool('water')}
        onOpenDiagnostic={handleOpenDiagnostic}
        onRequestGuide={() => setShowRequestGuideModal(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            {/* Hero Section */}
            <Hero
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSelectQuickTag={handleSelectQuickTag}
              onOpenDiagnostic={handleOpenDiagnostic}
              onOpenTools={() => handleOpenTool('water')}
            />

            {/* Diagnostic Wizard Section (Expandable) */}
            {showDiagnosticSection && (
              <section id="diagnostic-section" className="py-6 scroll-mt-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                  <DiagnosticWizard
                    guides={GUIDES}
                    onSelectGuide={(id) => setActiveGuideId(id)}
                    onClose={() => setShowDiagnosticSection(false)}
                  />
                </div>
              </section>
            )}

            {/* Quick Introduction Banner */}
            <section className="py-6 border-y border-[#e8e8ed] bg-white text-right" dir="rtl">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl p-2 rounded-xl bg-[#e8f1ff] text-[#0071e3] shrink-0">⚡</span>
                    <div>
                      <h4 className="font-bold text-[#1d1d1f] mb-1">حلول فورية ومباشرة</h4>
                      <p className="text-xs text-[#6e6e73] leading-relaxed">
                        خطوات مرقمة ومختبرة لحل مشاكل الشحن، التعليق، والبطء في دقائق معدودة.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl p-2 rounded-xl bg-[#f0f9f3] text-[#34c759] shrink-0">🛠️</span>
                    <div>
                      <h4 className="font-bold text-[#1d1d1f] mb-1">مختبر فحص تفاعلي</h4>
                      <p className="text-xs text-[#6e6e73] leading-relaxed">
                        أدوات ويب لطرد الماء من السماعات، كاشف البيكسلات العالقة، واختبار حساسية اللمس.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl p-2 rounded-xl bg-[#fff9f2] text-[#ff9500] shrink-0">🛡️</span>
                    <div>
                      <h4 className="font-bold text-[#1d1d1f] mb-1">أمان ومصداقية 100%</h4>
                      <p className="text-xs text-[#6e6e73] leading-relaxed">
                        نوضح لك متى يمكنك الإصلاح بنفسك بأمان ومتى يجب التوجه للصيانة المعتمدة.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Start Here Section (ابدأ من هنا) */}
            <StartHereSection
              guides={GUIDES}
              onOpenGuide={(id) => setActiveGuideId(id)}
            />

            {/* Categories Section */}
            <section className="py-12" id="categories" dir="rtl">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex items-end justify-between mb-6 text-right">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#1d1d1f]">
                      أقسام المحتوى والتصنيفات
                    </h2>
                    <p className="text-xs sm:text-sm text-[#6e6e73] mt-1">
                      اختر المجال أو نوع الجهاز لتصفح الشروحات المخصصة
                    </p>
                  </div>
                </div>

                {/* Category Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {CATEGORIES.map((cat) => {
                    const count = categoryCounts[cat.id] || 0;
                    const isActive = activeCategory === cat.id;

                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setActiveCategory(cat.id);
                          const el = document.getElementById('articles');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`p-4 rounded-2xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center group ${
                          isActive
                            ? 'bg-[#1d1d1f] text-white border-transparent shadow-lg scale-102'
                            : 'bg-white border-[#e8e8ed] text-[#1d1d1f] hover:border-transparent hover:shadow-md'
                        }`}
                      >
                        <span className="text-2xl sm:text-3xl mb-2 group-hover:scale-115 transition-transform duration-200">
                          {cat.icon}
                        </span>
                        <span className="font-bold text-xs sm:text-sm font-heading block line-clamp-1">
                          {cat.name}
                        </span>
                        <span
                          className={`text-[11px] mt-0.5 font-medium ${
                            isActive ? 'text-white/60' : 'text-[#8e8e93]'
                          }`}
                        >
                          {count} مقال
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Most Read Articles Section (المقالات الأكثر قراءة) */}
            <section className="py-8 bg-[#f4f7fc]/50" dir="rtl">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex items-center gap-2 mb-6 text-right">
                  <div className="p-2 rounded-xl bg-[#0071e3] text-white">
                    <TrendingUp size={18} />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black font-heading text-[#1d1d1f]">
                      المقالات الأكثر قراءة وإفادة هذا الشهر
                    </h2>
                    <p className="text-xs text-[#6e6e73]">الشروحات التي ساعدت آلاف المستخدمين في حل مشاكلهم</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {topReadGuides.map((guide) => (
                    <ArticleCard
                      key={`top-${guide.id}`}
                      guide={guide}
                      onOpen={(id) => setActiveGuideId(id)}
                      isBookmarked={bookmarkedIds.includes(guide.id)}
                      onToggleBookmark={toggleBookmark}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Ad Slot between sections */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <AdSlot slotId="home-middle-banner" format="banner" />
            </div>

            {/* All Articles Section */}
            <section className="py-12" id="articles" dir="rtl">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 text-right pb-4 border-b border-[#f0f0f3]">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#1d1d1f]">
                      {searchQuery
                        ? `نتائج البحث عن: "${searchQuery}"`
                        : activeCategory === 'all'
                        ? 'أحدث المقالات والحلول التقنية'
                        : `مقالات تصنيف: ${CATEGORIES.find((c) => c.id === activeCategory)?.name}`}
                    </h2>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-[#6e6e73] mt-1">
                      <span>{filteredGuides.length} شروحات مجرّبة متوفرة</span>
                      {searchQuery && (
                        <>
                          <span aria-hidden="true">·</span>
                          <button
                            onClick={() => setSearchQuery('')}
                            className="text-[#0071e3] font-semibold hover:underline cursor-pointer"
                          >
                            مسح تصفية البحث
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Reset Category button */}
                  {activeCategory !== 'all' && (
                    <button
                      onClick={() => setActiveCategory('all')}
                      className="self-start sm:self-auto text-xs font-semibold text-[#0071e3] bg-[#e8f1ff] hover:bg-[#d8e8ff] px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>عرض جميع الأقسام</span>
                      <ArrowLeft size={13} />
                    </button>
                  )}
                </div>

                {/* Articles Grid */}
                {filteredGuides.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGuides.map((guide) => (
                      <ArticleCard
                        key={guide.id}
                        guide={guide}
                        onOpen={(id) => setActiveGuideId(id)}
                        isBookmarked={bookmarkedIds.includes(guide.id)}
                        onToggleBookmark={toggleBookmark}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-[#e8e8ed] p-12 text-center max-w-lg mx-auto my-8">
                    <div className="w-16 h-16 rounded-full bg-[#f5f5f7] text-3xl flex items-center justify-center mx-auto mb-4">
                      🔍
                    </div>
                    <h3 className="text-xl font-bold text-[#1d1d1f] font-heading mb-2">
                      لم نعثر على حل مطابق لبحثك
                    </h3>
                    <p className="text-sm text-[#6e6e73] mb-6 leading-relaxed">
                      تأكد من كتابة الكلمات بشكل صحيح، أو اقترح هذه المشكلة ليقوم فريقنا بتجهيز حل مجرب لها ونشره.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setActiveCategory('all');
                        }}
                        className="px-5 py-2.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-xs font-bold text-[#1d1d1f] transition-colors w-full sm:w-auto cursor-pointer"
                      >
                        عرض جميع المقالات
                      </button>
                      <button
                        onClick={() => setShowRequestGuideModal(true)}
                        className="px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-xs font-bold text-white transition-colors w-full sm:w-auto shadow-sm cursor-pointer"
                      >
                        اطلب كتابة حل لهذه المشكلة
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Interactive Quick Tools Showcase Strip */}
            <section className="py-6" dir="rtl">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="bg-gradient-to-r from-[#eef4ff] to-[#f5f5f7] border border-[#dce6f5] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-right">
                  <div>
                    <span className="text-xs font-bold text-[#0071e3] uppercase tracking-wider block mb-1">
                      أدوات مجانية تفاعلية 100%
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black font-heading text-[#1d1d1f] mb-2">
                      مختبر فحص الجهاز الفوري داخل المتصفح
                    </h3>
                    <p className="text-xs sm:text-sm text-[#424245] max-w-xl leading-relaxed">
                      توليد تردد 165Hz لطرد الماء والغبار من السماعات، فحص حساسية لمس الشاشة لمناطق اللمس الميتة، كاشف البيكسلات العالقة، واختبار زمن استجابة الإنترنت.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 flex-wrap">
                    <button
                      onClick={() => handleOpenTool('water')}
                      className="px-5 py-2.5 rounded-full bg-white hover:bg-[#fbfbfd] border border-[#e8e8ed] text-xs font-bold text-[#1d1d1f] shadow-xs hover:border-[#0071e3] transition-all cursor-pointer"
                    >
                      🔊 طرد ماء السماعات
                    </button>
                    <button
                      onClick={() => handleOpenTool('touch')}
                      className="px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-bold shadow-md shadow-[#0071e3]/20 transition-all hover:scale-102 cursor-pointer"
                    >
                      فتح مختبر الفحص 🛠️
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <FAQSection />

            {/* About Philosophy Section */}
            <AboutSection onRequestGuide={() => setShowRequestGuideModal(true)} />
          </>
        )}

        {/* Advanced Search Page */}
        {currentPage === 'search' && (
          <AdvancedSearch
            guides={GUIDES}
            categories={CATEGORIES}
            onOpenGuide={(id) => setActiveGuideId(id)}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={toggleBookmark}
            onRequestGuide={() => setShowRequestGuideModal(true)}
            onBackToHome={() => setCurrentPage('home')}
          />
        )}

        {/* Static Institutional Pages (About, Contact, Privacy, Cookies, Terms, Disclaimer) */}
        {['about', 'contact', 'privacy', 'cookies', 'terms', 'disclaimer'].includes(currentPage) && (
          <StaticPages
            page={currentPage}
            onNavigate={(p) => {
              setCurrentPage(p);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRequestGuide={() => setShowRequestGuideModal(true)}
          />
        )}
      </main>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-[#1d1d1f] text-white shadow-xl hover:bg-[#0071e3] transition-all hover:scale-110 cursor-pointer"
          title="العودة لأعلى الصفحة"
          aria-label="الرجوع للأعلى"
        >
          <ArrowUp size={18} />
        </button>
      )}

      {/* Footer */}
      <Footer
        onSelectCategory={(id) => {
          setActiveCategory(id as CategoryId);
          setCurrentPage('home');
        }}
        onOpenTools={() => handleOpenTool('water')}
        onRequestGuide={() => setShowRequestGuideModal(true)}
        onNavigate={(p) => {
          setCurrentPage(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Modals & Drawers */}
      <ArticleModal
        guide={activeGuide}
        allGuides={GUIDES}
        onClose={() => setActiveGuideId(null)}
        onOpenGuide={(id) => setActiveGuideId(id)}
        isBookmarked={activeGuideId ? bookmarkedIds.includes(activeGuideId) : false}
        onToggleBookmark={(id) => toggleBookmark(id)}
      />

      <QuickToolsModal
        isOpen={showQuickTools}
        onClose={() => setShowQuickTools(false)}
        defaultTool={quickToolDefault}
      />

      <BookmarksDrawer
        isOpen={showBookmarksDrawer}
        onClose={() => setShowBookmarksDrawer(false)}
        bookmarkedGuides={bookmarkedGuides}
        onOpenGuide={(id) => setActiveGuideId(id)}
        onRemoveBookmark={(id) => toggleBookmark(id)}
        onClearAll={clearAllBookmarks}
      />

      <RequestGuideModal
        isOpen={showRequestGuideModal}
        onClose={() => setShowRequestGuideModal(false)}
        allGuides={GUIDES}
        onSelectExistingGuide={(id) => setActiveGuideId(id)}
      />
    </div>
  );
}
