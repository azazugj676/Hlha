import React from 'react';
import { ArrowUp, Mail, ShieldAlert, Heart, FileText, Lock, Cookie, Scale, HelpCircle } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { PageView } from '../types';

interface FooterProps {
  onSelectCategory: (catId: string) => void;
  onOpenTools: () => void;
  onRequestGuide: () => void;
  onNavigate: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenTools,
  onRequestGuide,
  onNavigate,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1d1d1f] text-white pt-16 pb-12 mt-20 border-t border-white/5" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10 text-right">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-1.5 text-2xl font-black font-heading text-white">
              <span>حل</span>
              <span className="text-[#0071e3]">ّها</span>
              <span className="text-xs text-white/40 font-normal mr-1">Halha</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-sm">
              أول منصة عربية تقنية متخصصة في توفير حلول مجرّبة وشروحات صيانة منزلية آمنة لمشاكل الهواتف والكمبيوتر والشاشات والشبكات والذكاء الاصطناعي.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <Mail size={13} />
                <span>تواصل معنا</span>
              </button>
              <button
                onClick={onRequestGuide}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>اقترح موضوعاً</span>
              </button>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              التصنيفات الرئيسية
            </h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              {CATEGORIES.slice(1, 7).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.id);
                      onNavigate('home');
                      const el = document.getElementById('articles');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-right"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Tools */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              أدوات وميزات المنصة
            </h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>
                <button onClick={onOpenTools} className="hover:text-white transition-colors cursor-pointer">
                  طارد ماء السماعات (165Hz)
                </button>
              </li>
              <li>
                <button onClick={onOpenTools} className="hover:text-white transition-colors cursor-pointer">
                  فاحص لمس الشاشة (Touch Test)
                </button>
              </li>
              <li>
                <button onClick={onOpenTools} className="hover:text-white transition-colors cursor-pointer">
                  كاشف البيكسلات العالقة
                </button>
              </li>
              <li>
                <button onClick={onOpenTools} className="hover:text-white transition-colors cursor-pointer">
                  فحص استقرار البنغ (Ping)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('search')} className="hover:text-white transition-colors cursor-pointer">
                  محرك البحث المتقدم
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Institutional Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              معلومات وسياسات
            </h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  من نحن
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  تواصل معنا
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  سياسة الخصوصية
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cookies')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  ملفات تعريف الارتباط (Cookies)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('disclaimer')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  إخلاء المسؤولية
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  شروط الاستخدام
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Safety Disclaimer Banner */}
        <div className="py-6 border-b border-white/10 text-xs text-white/50 leading-relaxed text-right flex items-start gap-2.5">
          <ShieldAlert size={16} className="text-amber-400 shrink-0 mt-0.5" />
          <p>
            تنويه أمان: الشروحات المتوفرة في «حلّها» استرشادية مخصصة للأعطال البرمجية والتنظيف السطحي. لا نتحمل مسؤولية فتح الأجهزة أو إتلاف القطع تحت الضمان. ننصح دائماً بالتوجه لمراكز الصيانة المعتمدة عند الشك.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} منصة حلّها (Halha) — أول منصة حلول وشروحات تقنية عربية مجربة</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-white transition-colors group cursor-pointer"
          >
            <span>العودة للأعلى</span>
            <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
              <ArrowUp size={12} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
