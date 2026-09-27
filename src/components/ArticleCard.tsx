import React from 'react';
import { Guide } from '../types';
import { Bookmark, Clock, ArrowLeft, Eye, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

interface ArticleCardProps {
  guide: Guide;
  onOpen: (guideId: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (guideId: string, e: React.MouseEvent) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  guide,
  onOpen,
  isBookmarked,
  onToggleBookmark,
}) => {
  const categoryName = CATEGORIES.find((c) => c.id === guide.category)?.name || guide.category;

  const difficultyColors = {
    سهل: 'text-emerald-700 bg-emerald-50',
    متوسط: 'text-amber-700 bg-amber-50',
    متقدم: 'text-rose-700 bg-rose-50',
  };

  return (
    <article
      onClick={() => onOpen(guide.id)}
      className="group bg-white rounded-3xl border border-[#e8e8ed] hover:border-transparent hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer relative"
    >
      {/* Visual Header / Hero icon box */}
      <div className="h-44 bg-gradient-to-br from-[#f2f6fc] via-[#f7f9fc] to-[#f4f7fd] flex items-center justify-center relative overflow-hidden group-hover:from-[#eaf1fc] group-hover:to-[#edf3fd] transition-colors">
        <span className="text-6xl transform group-hover:scale-115 group-hover:-rotate-3 transition-transform duration-300 select-none">
          {guide.icon}
        </span>

        {/* Featured Tag if applicable */}
        {guide.featured && (
          <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-[#1d1d1f]/85 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1">
            <Sparkles size={11} className="text-[#febc2e]" />
            <span>مميز</span>
          </div>
        )}

        {/* Bookmark button */}
        <button
          onClick={(e) => onToggleBookmark(guide.id, e)}
          className={`absolute top-3.5 left-3.5 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer ${
            isBookmarked
              ? 'bg-[#0071e3] text-white shadow-sm'
              : 'bg-white/80 text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-white'
          }`}
          title={isBookmarked ? 'إزالة من المحفوظات' : 'حفظ المقال للرجوع إليه'}
          aria-label="حفظ"
        >
          <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1 text-right">
        {/* Anti-slop unboxed metadata: quiet inline text with typographical separator */}
        <div className="flex items-center gap-2 text-xs text-[#8e8e93] mb-2.5 flex-wrap">
          <span className="font-semibold text-[#0071e3]">{categoryName}</span>
          <span aria-hidden="true">·</span>
          <span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${difficultyColors[guide.difficulty] || 'text-[#6e6e73]'}`}>
            {guide.difficulty}
          </span>
          {guide.viewsCount && (
            <>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-[11px] text-[#8e8e93]">
                <Eye size={12} />
                <span>{guide.viewsCount.toLocaleString()}</span>
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="font-bold text-base sm:text-lg font-heading text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors leading-snug mb-2 line-clamp-2">
          {guide.title}
        </h3>

        {/* Excerpt */}
        <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed line-clamp-2 mb-5 flex-1">
          {guide.excerpt}
        </p>

        {/* Footer meta info */}
        <div className="pt-4 border-t border-[#f5f5f7] flex items-center justify-between text-xs text-[#8e8e93]">
          <div className="flex items-center gap-1.5 font-medium">
            <Clock size={13} />
            <span>{guide.readTime} دقائق قراءة</span>
          </div>

          <div className="flex items-center gap-1 font-semibold text-[#0071e3] group-hover:-translate-x-1 transition-transform">
            <span>عرض الخطوات</span>
            <ArrowLeft size={13} />
          </div>
        </div>
      </div>
    </article>
  );
};
