import React from 'react';
import { Check, Terminal } from 'lucide-react';

interface AboutSectionProps {
  onRequestGuide: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onRequestGuide }) => {
  return (
    <section className="py-16" id="about" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-[#e8e8ed] rounded-3xl p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center shadow-xs text-right">
          {/* Text Content */}
          <div className="lg:col-span-7">
            <span className="inline-block text-xs font-bold text-[#0071e3] bg-[#e8f1ff] px-3 py-1 rounded-full mb-4">
              فلسفتنا في الكتابة
            </span>

            <h2 className="text-3xl sm:text-4xl font-black font-heading text-[#1d1d1f] tracking-tight mb-4">
              لماذا منصة حلّها؟
            </h2>

            <p className="text-base sm:text-lg text-[#6e6e73] leading-relaxed mb-8">
              الإنترنت مليء بمقالات محشوة بكلمات لا فائدة منها لإطالة وقت الزيارة، أو شروحات قديمة لم تعد تعمل مع التحديثات الحديثة. في «حلّها»، نجرّب كل حل ميكانيكياً وبرمجياً قبل كتابته، ونقدم لك الزبدة في خطوات واضحة ومباشرة.
            </p>

            <ul className="space-y-3.5 mb-8">
              {[
                'خطوات مرقّمة ومرتبة منطقياً من الأسهل للأصعب لتوفير وقتك',
                'بدون تعقيدات أو مصطلحات أجنبية غامضة؛ لغة عربية سليمة ومبسطة',
                'محدَّث ومجرّب مع أنظمة iOS 18 و Android 15 و Windows 11',
                'فحوصات مجانية متقدمة في المتصفح مثل طرد الماء وفحص اللمس',
                'تنبيهات أمان واضحة تحميك من إتلاف اللوحة الأم أو بطارية جهازك',
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm text-[#424245] font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#e8f1ff] text-[#0071e3] flex items-center justify-center shrink-0">
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={onRequestGuide}
              className="px-6 py-3 bg-[#1d1d1f] hover:bg-black text-white rounded-full font-semibold text-sm transition-all shadow-sm hover:scale-102"
            >
              اقترح مشكلة نغطيها في المقال القادم
            </button>
          </div>

          {/* Clean Code/Visual Window */}
          <div className="lg:col-span-5 ltr:text-left" style={{ direction: 'ltr' }}>
            <div className="bg-[#1d1d1f] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <div className="flex items-center gap-1.5 px-4 py-3 bg-[#2a2a2c] border-b border-white/5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="text-[11px] font-mono text-white/40 ml-2">halha_engine.ts</span>
              </div>
              <div className="p-5 font-mono text-xs text-white/80 leading-loose">
                <p className="text-white/40">// 1. المشكلة التي تواجهك</p>
                <p>
                  <span className="text-purple-400">const</span> problem ={' '}
                  <span className="text-emerald-300">"الآيفون_لا_يشحن"</span>;
                </p>
                <p className="mt-2 text-white/40">// 2. خوارزمية التشخيص</p>
                <p>
                  <span className="text-purple-400">const</span> solution ={' '}
                  <span className="text-sky-300">halha</span>(problem);
                </p>
                <p className="mt-2 text-white/40">// ➔ خطوات عملية مجرّبة ✓</p>
                <p>
                  <span className="text-yellow-300">console</span>.log(solution);
                </p>
                <p className="text-emerald-400 mt-2">
                  ✓ [1. تنظيف المنفذ] ➔ [2. تجربة كابل MFi] ➔ [3. فورس ريستارت]
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
