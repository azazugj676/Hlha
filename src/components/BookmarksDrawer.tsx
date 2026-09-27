import React from 'react';
import { Guide } from '../types';
import { X, Trash2, Bookmark, ArrowLeft, Clock } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedGuides: Guide[];
  onOpenGuide: (guideId: string) => void;
  onRemoveBookmark: (guideId: string) => void;
  onClearAll: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedGuides,
  onOpenGuide,
  onRemoveBookmark,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in"
      dir="rtl"
    >
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <aside className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-r border-[#e8e8ed] animate-slide-left">
        {/* Header */}
        <div className="p-5 border-b border-[#f0f0f3] flex items-center justify-between bg-[#fbfbfd]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#e8f1ff] text-[#0071e3] flex items-center justify-center">
              <Bookmark size={16} fill="currentColor" />
            </div>
            <div>
              <h3 className="font-bold text-[#1d1d1f] font-heading text-base">
                المقالات المحفوظة
              </h3>
              <span className="text-xs text-[#8e8e93]">
                {bookmarkedGuides.length} مقالات محفوظة للرجوع السريع
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {bookmarkedGuides.length > 0 && (
              <button
                onClick={onClearAll}
                className="p-2 text-xs text-[#ff3b30] hover:bg-[#fff2f2] rounded-lg transition-colors flex items-center gap-1"
                title="مسح الكل"
              >
                <Trash2 size={14} />
                <span className="hidden sm:inline">مسح الكل</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#f5f5f7] text-[#1d1d1f] transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {bookmarkedGuides.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#f5f5f7] text-[#8e8e93] flex items-center justify-center mx-auto text-2xl">
                🔖
              </div>
              <h4 className="font-bold text-[#1d1d1f] text-sm">
                لا توجد مقالات محفوظة بعد
              </h4>
              <p className="text-xs text-[#8e8e93] max-w-xs mx-auto leading-relaxed">
                اضغط على أيقونة الإشارة المرجعية (🔖) على أي مقال لحفظه في جهازك وقراءته لاحقاً دون بحث.
              </p>
            </div>
          ) : (
            bookmarkedGuides.map((guide) => {
              const categoryName =
                CATEGORIES.find((c) => c.id === guide.category)?.name || guide.category;

              return (
                <div
                  key={guide.id}
                  className="p-3.5 rounded-2xl border border-[#e8e8ed] hover:border-[#0071e3] transition-all bg-[#fbfbfd] hover:bg-white flex items-start gap-3 group"
                >
                  <span className="text-3xl shrink-0 mt-1">{guide.icon}</span>

                  <div className="flex-1 text-right">
                    <span className="text-[11px] font-semibold text-[#0071e3] block mb-0.5">
                      {categoryName}
                    </span>
                    <h4
                      onClick={() => {
                        onClose();
                        onOpenGuide(guide.id);
                      }}
                      className="text-sm font-bold text-[#1d1d1f] group-hover:text-[#0071e3] cursor-pointer line-clamp-2 leading-snug"
                    >
                      {guide.title}
                    </h4>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#f0f0f3] text-[11px] text-[#8e8e93]">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {guide.readTime} دقائق
                      </span>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            onClose();
                            onOpenGuide(guide.id);
                          }}
                          className="text-[#0071e3] font-bold flex items-center gap-1 hover:underline"
                        >
                          فتح
                          <ArrowLeft size={12} />
                        </button>

                        <button
                          onClick={() => onRemoveBookmark(guide.id)}
                          className="text-[#8e8e93] hover:text-[#ff3b30] transition-colors"
                          title="إزالة"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </aside>
    </div>
  );
};
