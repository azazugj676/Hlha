import React from 'react';
import { Guide } from '../types';
import { ArrowLeft, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';

interface StartHereSectionProps {
  guides: Guide[];
  onOpenGuide: (id: string) => void;
}

export const StartHereSection: React.FC<StartHereSectionProps> = ({ guides, onOpenGuide }) => {
  const startGuides = guides.filter((g) => g.startHere).slice(0, 4);

  return (
    <section className="py-12 bg-gradient-to-b from-[#fbfbfd] via-[#f4f7fc] to-[#fbfbfd] border-y border-[#e8e8ed]" id="start-here" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 text-right">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0071e3] text-white text-xs font-bold mb-3 shadow-xs">
              <Sparkles size={13} />
              <span>جديد في عالم الصيانة والتقنية؟</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#1d1d1f]">
              ابدأ من هنا: الأساسيات التقنية التي تهم كل مستخدم
            </h2>
            <p className="text-sm text-[#6e6e73] mt-1">
              مجموعة مختارة بعناية لحماية أجهزتك وحساباتك وتسريع حاسوبك من اليوم الأول
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {startGuides.map((guide, idx) => (
            <div
              key={guide.id}
              onClick={() => onOpenGuide(guide.id)}
              className="bg-white rounded-2xl border border-[#e2e8f0] p-5 flex flex-col justify-between hover:shadow-lg hover:border-[#0071e3] transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-1.5 h-full bg-[#0071e3] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl group-hover:scale-110 transition-transform">
                    {guide.icon}
                  </span>
                  <span className="text-[11px] font-bold text-[#0071e3] bg-[#e8f1ff] px-2.5 py-0.5 rounded-full">
                    خطوة {idx + 1}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-[#1d1d1f] font-heading group-hover:text-[#0071e3] transition-colors line-clamp-2 mb-2 leading-snug">
                  {guide.title}
                </h3>
                <p className="text-xs text-[#6e6e73] line-clamp-2 leading-relaxed">
                  {guide.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#f5f5f7] flex items-center justify-between text-xs text-[#8e8e93]">
                <span>{guide.readTime} دقائق قراءة</span>
                <span className="text-[#0071e3] font-semibold flex items-center gap-1 group-hover:-translate-x-1 transition-transform">
                  <span>اقرأ الآن</span>
                  <ArrowLeft size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
