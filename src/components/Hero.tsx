import React from 'react';
import { Search, X, Sparkles, Wrench } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectQuickTag: (tag: string) => void;
  onOpenDiagnostic: () => void;
  onOpenTools: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onSelectQuickTag,
  onOpenDiagnostic,
  onOpenTools,
}) => {
  const quickSearches = [
    'الآيفون لا يشحن',
    'شاشة سوداء',
    'تعليق سامسونج',
    'الواي فاي ضعيف',
    'حرارة الآيفون',
    'طرد الماء',
  ];

  return (
    <section className="relative pt-12 pb-16 overflow-hidden text-center" dir="rtl">
      {/* Background Soft Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-radial from-[#0071e3]/12 to-transparent rounded-full pointer-events-none -z-10 blur-2xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8f1ff] text-[#0071e3] text-xs font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-[#34c759] shadow-xs animate-ping" />
          <span>محتوى تقني عربي مجرَّب ومحدَّث لعام 2026</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-[#1d1d1f] mb-6 leading-[1.1]">
          واجهتك مشكلة تقنية؟
          <br />
          <span className="text-[#0071e3]">حلّها ببساطة.</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-[#6e6e73] text-base sm:text-lg leading-relaxed mb-8">
          شروحات تقنية واضحة ومباشرة تساعدك في حل مشاكل هاتفك والكمبيوتر والشاشات
          خطوة بخطوة وبدون تعقيد — مجرّبة بأيدينا قبل نشرها.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative mb-6">
          <div className="relative flex items-center">
            <Search
              size={20}
              className="absolute right-4.5 text-[#8e8e93] pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ابحث عن عطل أو جهازك… مثلاً: الآيفون لا يشحن، شاشة ترمش، الواي فاي"
              className="w-full h-15 pr-13 pl-12 rounded-2xl bg-white border border-[#e8e8ed] text-base text-[#1d1d1f] placeholder:text-[#8e8e93] shadow-md shadow-black/3 focus:outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute left-4 p-1.5 rounded-full hover:bg-[#f5f5f7] text-[#8e8e93] hover:text-[#1d1d1f] transition-colors"
                title="مسح البحث"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="flex items-center justify-center gap-2 flex-wrap text-xs text-[#8e8e93] mb-8">
          <span className="font-medium">أكثر المشاكل بحثاً:</span>
          {quickSearches.map((tag) => (
            <button
              key={tag}
              onClick={() => onSelectQuickTag(tag)}
              className="px-3 py-1 rounded-full bg-white hover:bg-[#f5f5f7] border border-[#e8e8ed] text-[#424245] hover:text-[#0071e3] hover:border-[#0071e3]/30 transition-all font-medium"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Direct Action Dual Cards */}
        <div className="max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 text-right">
          <button
            onClick={onOpenDiagnostic}
            className="p-3.5 rounded-2xl bg-[#f5f5f7] hover:bg-[#e8f1ff] border border-transparent hover:border-[#0071e3]/20 transition-all flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-white text-[#0071e3] shadow-xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Sparkles size={18} />
            </div>
            <div>
              <span className="block text-xs font-bold text-[#1d1d1f] group-hover:text-[#0071e3]">
                تشخيص المشكلة خطوة بخطوة
              </span>
              <span className="text-[11px] text-[#8e8e93]">
                اختر جهازك والعَرَض الظاهر
              </span>
            </div>
          </button>

          <button
            onClick={onOpenTools}
            className="p-3.5 rounded-2xl bg-[#f5f5f7] hover:bg-[#e8f1ff] border border-transparent hover:border-[#0071e3]/20 transition-all flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-white text-[#0071e3] shadow-xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Wrench size={18} />
            </div>
            <div>
              <span className="block text-xs font-bold text-[#1d1d1f] group-hover:text-[#0071e3]">
                أدوات فحص الجهاز الفورية
              </span>
              <span className="text-[11px] text-[#8e8e93]">
                طرد الماء، فحص اللمس، البنغ
              </span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
