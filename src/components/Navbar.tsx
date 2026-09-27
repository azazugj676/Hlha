import React, { useState, useEffect } from 'react';
import { Bookmark, Wrench, Menu, X, Sparkles, Search, MessageSquarePlus, Compass } from 'lucide-react';
import { PageView } from '../types';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  bookmarksCount: number;
  onOpenBookmarks: () => void;
  onOpenTools: () => void;
  onOpenDiagnostic: () => void;
  onRequestGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  bookmarksCount,
  onOpenBookmarks,
  onOpenTools,
  onOpenDiagnostic,
  onRequestGuide,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/85 backdrop-blur-xl border-b border-[#e8e8ed] shadow-xs'
            : 'bg-[#fbfbfd]/80 backdrop-blur-md border-b border-transparent'
        }`}
        dir="rtl"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-17 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-2xl font-black font-heading tracking-tight text-[#1d1d1f] flex items-center gap-1 group"
            >
              <span>حل</span>
              <span className="text-[#0071e3] font-black">ّها</span>
              <span className="text-[10px] font-sans text-[#8e8e93] font-normal mr-1 hidden sm:inline">
                Halha
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-[#424245]">
              <button
                onClick={() => {
                  onNavigate('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  currentPage === 'home'
                    ? 'text-[#0071e3] font-bold bg-[#e8f1ff]'
                    : 'hover:text-[#1d1d1f] hover:bg-[#f5f5f7]'
                }`}
              >
                الرئيسية
              </button>
              <button
                onClick={() => scrollToSection('articles')}
                className="px-3 py-1.5 rounded-full hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors"
              >
                المقالات والحلول
              </button>
              <button
                onClick={() => scrollToSection('start-here')}
                className="px-3 py-1.5 rounded-full hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors flex items-center gap-1"
              >
                <Compass size={14} className="text-[#0071e3]" />
                <span>ابدأ من هنا</span>
              </button>
              <button
                onClick={onOpenDiagnostic}
                className="px-3 py-1.5 rounded-full hover:text-[#0071e3] hover:bg-[#e8f1ff] transition-colors flex items-center gap-1.5"
              >
                <Sparkles size={14} className="text-[#0071e3]" />
                <span>التشخيص الذكي</span>
              </button>
              <button
                onClick={onOpenTools}
                className="px-3 py-1.5 rounded-full hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors flex items-center gap-1.5"
              >
                <Wrench size={14} />
                <span>أدوات الفحص</span>
              </button>
              <button
                onClick={() => onNavigate('search')}
                className={`px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
                  currentPage === 'search'
                    ? 'text-[#0071e3] font-bold bg-[#e8f1ff]'
                    : 'hover:text-[#1d1d1f] hover:bg-[#f5f5f7]'
                }`}
              >
                <Search size={14} />
                <span>بحث متقدم</span>
              </button>
            </nav>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            {/* Search Icon button on mobile */}
            <button
              onClick={() => onNavigate('search')}
              className="p-2.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] transition-all flex items-center justify-center md:hidden"
              title="البحث المتقدم"
              aria-label="البحث"
            >
              <Search size={17} />
            </button>

            {/* Bookmarks toggle button */}
            <button
              onClick={onOpenBookmarks}
              className="relative p-2.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] transition-all flex items-center justify-center cursor-pointer"
              title="المقالات المحفوظة"
              aria-label="المحفوظات"
            >
              <Bookmark size={17} />
              {bookmarksCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-[#0071e3] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {bookmarksCount}
                </span>
              )}
            </button>

            {/* Request a guide CTA */}
            <button
              onClick={onRequestGuide}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1d1d1f] hover:bg-black text-white text-xs font-semibold transition-all hover:scale-102 cursor-pointer"
            >
              <MessageSquarePlus size={14} />
              <span>اطلب حلاً</span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-[#f5f5f7] text-[#1d1d1f]"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-17 z-30 bg-white/95 backdrop-blur-xl border-b border-[#e8e8ed] p-6 shadow-xl md:hidden animate-fade-in text-right" dir="rtl">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('home');
              }}
              className="w-full text-right p-3 rounded-2xl hover:bg-[#f5f5f7] text-base font-semibold text-[#1d1d1f]"
            >
              الرئيسية
            </button>
            <button
              onClick={() => scrollToSection('articles')}
              className="w-full text-right p-3 rounded-2xl hover:bg-[#f5f5f7] text-base font-semibold text-[#1d1d1f]"
            >
              المقالات والحلول
            </button>
            <button
              onClick={() => scrollToSection('start-here')}
              className="w-full text-right p-3 rounded-2xl hover:bg-[#f5f5f7] text-base font-semibold text-[#1d1d1f] flex items-center justify-between"
            >
              <span>ابدأ من هنا</span>
              <Compass size={16} className="text-[#0071e3]" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('search');
              }}
              className="w-full text-right p-3 rounded-2xl hover:bg-[#f5f5f7] text-base font-semibold text-[#1d1d1f] flex items-center justify-between"
            >
              <span>البحث المتقدم</span>
              <Search size={16} />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDiagnostic();
              }}
              className="w-full text-right p-3 rounded-2xl hover:bg-[#e8f1ff] text-base font-semibold text-[#0071e3] flex items-center justify-between"
            >
              <span>التشخيص الذكي</span>
              <Sparkles size={16} />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTools();
              }}
              className="w-full text-right p-3 rounded-2xl hover:bg-[#f5f5f7] text-base font-semibold text-[#1d1d1f] flex items-center justify-between"
            >
              <span>مختبر فحص الجهاز (طرد الماء، الشاشة، البنغ)</span>
              <Wrench size={16} />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookmarks();
              }}
              className="w-full text-right p-3 rounded-2xl hover:bg-[#f5f5f7] text-base font-semibold text-[#1d1d1f] flex items-center justify-between"
            >
              <span>المقالات المحفوظة ({bookmarksCount})</span>
              <Bookmark size={16} />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('about');
              }}
              className="w-full text-right p-3 rounded-2xl hover:bg-[#f5f5f7] text-base font-semibold text-[#1d1d1f]"
            >
              عن موقع حلّها
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestGuide();
              }}
              className="w-full mt-2 p-3.5 rounded-2xl bg-[#0071e3] text-white text-center font-bold text-sm shadow-md"
            >
              اطلب حلاً لمشكلة جديدة
            </button>
          </div>
        </div>
      )}
    </>
  );
};
