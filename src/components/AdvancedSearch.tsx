import React, { useState } from 'react';
import { Guide, Category } from '../types';
import { ArticleCard } from './ArticleCard';
import { Search, Filter, X, ArrowLeft } from 'lucide-react';
import { AdSlot } from './AdSlot';

interface AdvancedSearchProps {
  guides: Guide[];
  categories: Category[];
  initialQuery?: string;
  onOpenGuide: (id: string) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onRequestGuide: () => void;
  onBackToHome: () => void;
}

export const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  guides,
  categories,
  initialQuery = '',
  onOpenGuide,
  bookmarkedIds,
  onToggleBookmark,
  onRequestGuide,
  onBackToHome,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredResults = guides.filter((guide) => {
    // Category filter
    if (selectedCategory !== 'all' && guide.category !== selectedCategory) {
      return false;
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all' && guide.difficulty !== selectedDifficulty) {
      return false;
    }

    // Query search inside title, excerpt, intro, steps, symptoms, tags
    const q = query.trim().toLowerCase();
    if (!q) return true;

    const fullContent = [
      guide.title,
      guide.excerpt,
      guide.intro,
      guide.tags.join(' '),
      guide.symptoms.join(' '),
      guide.devicesAffected.join(' '),
      ...guide.steps.map((s) => `${s.title} ${s.detail}`),
      ...(guide.practicalExamples || []),
      ...(guide.faqs?.map((f) => `${f.question} ${f.answer}`) || []),
    ]
      .join(' ')
      .toLowerCase();

    return fullContent.includes(q);
  });

  return (
    <div className="py-10 max-w-6xl mx-auto px-4 sm:px-6" dir="rtl">
      {/* Header and Back navigation */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[#e8e8ed]">
        <div>
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071e3] hover:underline mb-2"
          >
            <ArrowLeft size={14} className="rotate-180" />
            <span>العودة للرئيسية</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#1d1d1f]">
            محرك البحث المتقدم في الحلول والمقالات
          </h1>
          <p className="text-xs sm:text-sm text-[#6e6e73] mt-1">
            ابحث بالكلمة المفتاحية، رمز العطل، نوع الجهاز، أو تصفح حسب مستوى الصعوبة
          </p>
        </div>
      </div>

      {/* Main search bar */}
      <div className="bg-white rounded-3xl border border-[#e8e8ed] p-5 shadow-sm mb-8">
        <div className="relative flex items-center mb-4">
          <Search size={22} className="absolute right-4 text-[#8e8e93] pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="مثال: الآيفون لا يشحن، شاشة زرقاء، بطء النت، تسريع ويندوز، ذكاء اصطناعي..."
            className="w-full h-14 pr-12 pl-12 rounded-2xl bg-[#f5f5f7] border border-transparent focus:border-[#0071e3] focus:bg-white text-base text-[#1d1d1f] placeholder:text-[#8e8e93] outline-none transition-all font-medium"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute left-4 p-1.5 rounded-full hover:bg-black/5 text-[#8e8e93] hover:text-[#1d1d1f]"
              aria-label="مسح البحث"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Filter controls row */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#f5f5f7] text-xs">
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-[#6e6e73]" />
            <span className="font-bold text-[#1d1d1f]">تصفية النتائج:</span>
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#f5f5f7] border border-[#e8e8ed] rounded-xl px-3 py-1.5 text-xs text-[#1d1d1f] font-medium outline-none focus:border-[#0071e3]"
          >
            <option value="all">جميع التصنيفات</option>
            {categories
              .filter((c) => c.id !== 'all')
              .map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
          </select>

          {/* Difficulty Dropdown */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-[#f5f5f7] border border-[#e8e8ed] rounded-xl px-3 py-1.5 text-xs text-[#1d1d1f] font-medium outline-none focus:border-[#0071e3]"
          >
            <option value="all">جميع مستويات الصعوبة</option>
            <option value="سهل">سهل (إعدادات منزلية)</option>
            <option value="متوسط">متوسط (إعدادات راوتر ونظام)</option>
            <option value="متقدم">متقدم (أوامر وفحص قطع)</option>
          </select>

          {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || query) && (
            <button
              onClick={() => {
                setQuery('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
              }}
              className="text-[#0071e3] font-semibold hover:underline mr-auto"
            >
              إعادة ضبط الفلاتر
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-bold text-[#1d1d1f]">
          تم العثور على {filteredResults.length} حل ومقال مطابق
        </span>
      </div>

      {/* Results Grid or Empty State */}
      {filteredResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map((guide) => (
            <ArticleCard
              key={guide.id}
              guide={guide}
              onOpen={onOpenGuide}
              isBookmarked={bookmarkedIds.includes(guide.id)}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#e8e8ed] p-12 text-center max-w-lg mx-auto my-8">
          <div className="w-16 h-16 rounded-full bg-[#f5f5f7] text-3xl flex items-center justify-center mx-auto mb-4">
            🔎
          </div>
          <h3 className="text-xl font-bold text-[#1d1d1f] font-heading mb-2">
            لم نتمكن من إيجاد حل يتطابق مع بحثك
          </h3>
          <p className="text-sm text-[#6e6e73] mb-6 leading-relaxed">
            جرّب تقليل كلمات البحث، أو اختر تصنيفاً عاماً، أو اقترح علينا كتابة حل مخصص لهذه المشكلة.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setQuery('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
              }}
              className="px-5 py-2.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-xs font-bold text-[#1d1d1f] transition-colors w-full sm:w-auto"
            >
              إلغاء التصفية وعرض الكل
            </button>
            <button
              onClick={onRequestGuide}
              className="px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-xs font-bold text-white transition-colors w-full sm:w-auto shadow-sm"
            >
              اطلب حلاً لمشكلتك الآن
            </button>
          </div>
        </div>
      )}

      {/* Ad slot in search results */}
      <AdSlot slotId="search-results-bottom-slot" format="banner" className="mt-12" />
    </div>
  );
};
