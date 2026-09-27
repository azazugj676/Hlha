import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      q: 'هل الحلول والشروحات الموجودة في منصة «حلّها» آمنة لتجربتها بنفسي؟',
      a: 'نعم 100%. نلتزم بفلسفة السلامة أولاً؛ جميع الحلول المعروضة برمجية وتنظيفية منزلية آمنة تماماً ولا تتطلب فك أجهزة أو لحام. وفي كل مقال نحدد بوضوح النقطة التي يجب عندها التوقف والتوجه إلى فني معتمد لحماية جهازك.'
    },
    {
      q: 'كيف يمكنني استخدام أداة طرد ماء السماعات؟',
      a: 'من خلال الضغط على زر "أدوات الفحص" في الشريط العلوي ثم اختيار "طارد ماء السماعات"، ستقوم الأداة بتشغيل موجة صوتية نقية بتردد 165Hz مع اهتزازات فيزيائية تساعد في تفتيت قطرات الماء السطحية ودفعها خارج شبكة السماعة.'
    },
    {
      q: 'هل أحتاج لدفع أي رسوم أو تسجيل حساب لقراءة المقالات أو استخدام الأدوات؟',
      a: 'منصة «حلّها» مجانية تماماً ومتاحة للجميع بدون أي رسوم، وبدون اشتراكات أو جمع بيانات سرية. هدفنا إثراء المحتوى التقني العربي بجودة تفوق المواقع العالمية.'
    },
    {
      q: 'لدي مشكلة تقنية غريبة لم أجد لها حلاً هنا، ماذا أفعل؟',
      a: 'يمكنك ببساطة الضغط على زر "اطلب حلاً" في أعلى الصفحة، وكتابة تفاصيل مشكلتك ونوع جهازك. يقوم فريقنا بمراجعة الاقتراحات وإعداد تجارب عملية ونشر دليل مخصص لها.'
    },
    {
      q: 'ما الفرق بين منصة «حلّها» والمنتديات والمواقع التقنية الأخرى؟',
      a: 'نحن لا نعتمد على الترجمة الآلية الركيكة أو حشو الكلمات لتطويل المقالات. كل مقال يحتوي على زبدة الحل، خطوات مرقمة، تنبيهات أمان، وأمثلة واقعية ملموسة مجربة بأيدينا.'
    }
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-14" id="faq" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f1ff] text-[#0071e3] text-xs font-semibold mb-3">
            <HelpCircle size={14} />
            <span>إجابات واضحة وسريعة</span>
          </span>
          <h2 className="text-3xl font-extrabold font-heading text-[#1d1d1f]">
            الأسئلة الشائعة حول المنصة
          </h2>
          <p className="text-sm text-[#6e6e73] mt-2">
            كل ما تود معرفته عن طريقة عمل منصة «حلّها» وضمانات المحتوى
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#e8e8ed] overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-right flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#1d1d1f] hover:text-[#0071e3] transition-colors"
                >
                  <span>{faq.q}</span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#f5f5f7] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#e8f1ff] text-[#0071e3]' : 'text-[#6e6e73]'
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-[#424245] leading-relaxed border-t border-[#f5f5f7]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
