import React, { useState } from 'react';
import { PageView } from '../types';
import { ArrowLeft, CheckCircle2, Mail, ShieldCheck, FileText, Send, Lock } from 'lucide-react';

interface StaticPagesProps {
  page: PageView;
  onNavigate: (page: PageView) => void;
  onRequestGuide: () => void;
}

export const StaticPages: React.FC<StaticPagesProps> = ({ page, onNavigate, onRequestGuide }) => {
  const [contactSent, setContactSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
  };

  const renderContent = () => {
    switch (page) {
      case 'about':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-black font-heading text-[#1d1d1f]">
              عن منصة «حلّها» (Halha)
            </h1>
            <p className="text-lg text-[#424245] leading-relaxed">
              «حلّها» هي منصة تقنية عربية مستقلة تأسست بهدف سد الفجوة في المحتوى التقني العربي وتقديم شروحات وحلول عملية مجرّبة بمصداقية مطلقة، بعيداً عن أسلوب العناوين المضللة وحشو الكلمات غير المفيد.
            </p>

            <h2 className="text-2xl font-bold font-heading text-[#1d1d1f] pt-4">رسالتنا وقيمنا</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-[#f5f5f7] border border-[#e8e8ed]">
                <span className="text-2xl mb-2 block">🎯</span>
                <h3 className="font-bold text-base text-[#1d1d1f] mb-1">المباشرة والوضوح</h3>
                <p className="text-xs text-[#6e6e73] leading-relaxed">
                  نكتب الخطوات بشكل مرقم ومباشر بدون مقدمات إنشائية لا تفيد القارئ.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#f5f5f7] border border-[#e8e8ed]">
                <span className="text-2xl mb-2 block">🧪</span>
                <h3 className="font-bold text-base text-[#1d1d1f] mb-1">التجربة المسبقة</h3>
                <p className="text-xs text-[#6e6e73] leading-relaxed">
                  نختبر كل خطوة برمجة أو تنظيف فيزيائي على أجهزة حقيقية قبل اعتماد المقال.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#f5f5f7] border border-[#e8e8ed]">
                <span className="text-2xl mb-2 block">🛡️</span>
                <h3 className="font-bold text-base text-[#1d1d1f] mb-1">الأمان أولاً</h3>
                <p className="text-xs text-[#6e6e73] leading-relaxed">
                  نحدد للمستخدم متى يمكنه حل المشكلة بنفسه ومتى يجب عليه التوجه لمركز صيانة معتمد.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold font-heading text-[#1d1d1f] pt-4">فريق العمل والخبرة</h2>
            <p className="text-sm text-[#424245] leading-relaxed">
              يضم فريقنا مهندسي برمجيات وفنيي صيانة شبكات ومحررين تقنيين شغوفين بنشر المعرفة الرقمية في العالم العربي، ومتابعة أحدث إصدارات أنظمة التشغيل ومستجدات عتاد الهواتف والذكاء الاصطناعي.
            </p>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-black font-heading text-[#1d1d1f]">
              تواصل معنا
            </h1>
            <p className="text-base text-[#6e6e73]">
              يسعدنا دائماً استقبال استفساراتكم، مقترحاتكم لتحسين المنصة، أو الإبلاغ عن أخطاء تقنية.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
              <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#e8e8ed]">
                {contactSent ? (
                  <div className="text-center py-10">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-[#1d1d1f] mb-2">تم استلام رسالتك بنجاح!</h3>
                    <p className="text-sm text-[#6e6e73]">
                      شكراً لتواصلك معنا. سنقوم بالرد عليك عبر البريد الإلكتروني في غضون 24-48 ساعة.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4 text-right">
                    <div>
                      <label className="block text-xs font-bold text-[#1d1d1f] mb-1.5">الاسم الكريم</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="أدخل اسمك"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e8e8ed] bg-[#fbfbfd] text-sm focus:border-[#0071e3] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1d1d1f] mb-1.5">البريد الإلكتروني</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="example@domain.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e8e8ed] bg-[#fbfbfd] text-sm focus:border-[#0071e3] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1d1d1f] mb-1.5">موضوع الرسالة</label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="استفسار، شراكة، اقتراح موضوع..."
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e8e8ed] bg-[#fbfbfd] text-sm focus:border-[#0071e3] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1d1d1f] mb-1.5">نص الرسالة</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="اكتب تفاصيل استفسارك هنا..."
                        className="w-full p-4 rounded-xl border border-[#e8e8ed] bg-[#fbfbfd] text-sm focus:border-[#0071e3] outline-none resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#0071e3] hover:bg-[#0077ed] text-white font-bold text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                    >
                      <Send size={16} />
                      <span>إرسال الرسالة</span>
                    </button>
                  </form>
                )}
              </div>

              <div className="md:col-span-5 space-y-4">
                <div className="p-6 rounded-3xl bg-[#f5f5f7] border border-[#e8e8ed] space-y-3">
                  <h3 className="font-bold text-base text-[#1d1d1f] flex items-center gap-2">
                    <Mail size={18} className="text-[#0071e3]" />
                    <span>البريد الإلكتروني المباشر</span>
                  </h3>
                  <p className="text-xs text-[#6e6e73]">
                    للمراسلات الرسمية والشراكات الإعلامية:
                  </p>
                  <p className="text-sm font-mono text-[#0071e3] font-semibold">
                    contact@halha.tech
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-[#f5f5f7] border border-[#e8e8ed] space-y-3">
                  <h3 className="font-bold text-base text-[#1d1d1f]">تريد حلاً لمشكلة بجهازك؟</h3>
                  <p className="text-xs text-[#6e6e73] leading-relaxed">
                    إذا كان طلبك متعلقاً بعطل تقني في جهازك، فنوصيك باستخدام نموذج اقتراح الحلول ليقوم فريق التحرير ببرمجته وتجربته فوراً.
                  </p>
                  <button
                    onClick={onRequestGuide}
                    className="w-full py-2.5 rounded-xl bg-white border border-[#e8e8ed] text-xs font-bold text-[#1d1d1f] hover:bg-[#fbfbfd] transition-colors"
                  >
                    فتح نموذج طلب حل عطل
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-black font-heading text-[#1d1d1f]">
              سياسة الخصوصية (Privacy Policy)
            </h1>
            <p className="text-xs text-[#8e8e93]">آخر تحديث: 27 سبتمبر 2026</p>

            <p className="text-sm text-[#424245] leading-relaxed">
              في منصة «حلّها» (Halha)، نولي خصوصية زوارنا الكرام أهمية قصوى. توضح هذه الوثيقة طبيعة المعلومات التي نتلقاها ونجمعها عند زيارتك للموقع وكيفية حمايتها.
            </p>

            <h2 className="text-xl font-bold font-heading text-[#1d1d1f]">1. المعلومات التي نجمعها</h2>
            <p className="text-sm text-[#424245] leading-relaxed">
              - **معلومات التصفح العامة:** مثل نوع المتصفح، نظام التشغيل، والصفحات التي تمت زيارتها عبر سجلات الخادم القياسية لتحسين سرعة الموقع.
              <br />
              - **المحفوظات المحلية (Bookmarks):** يتم تخزين المقالات المحفوظة الخاصة بك حصرياً في ذاكرة التخزين المحلية لمتصفحك (LocalStorage) ولا يتم إرسالها إلى خوادمنا نهائياً.
            </p>

            <h2 className="text-xl font-bold font-heading text-[#1d1d1f]">2. شركاء الإعلانات (Google AdSense)</h2>
            <p className="text-sm text-[#424245] leading-relaxed">
              قد نستخدم شركات إعلانية تابعة لطرف ثالث (مثل Google AdSense) لعرض الإعلانات عند زيارة موقعنا. قد تستخدم هذه الشركات ملفات تعريف الارتباط لعرض إعلانات مناسبة لاهتماماتك. يمكنك تعطيل الإعلانات المخصصة عبر زيارة إعدادات إعلانات Google.
            </p>

            <h2 className="text-xl font-bold font-heading text-[#1d1d1f]">3. حماية البيانات</h2>
            <p className="text-sm text-[#424245] leading-relaxed">
              نلتزم بعدم بيع أو تأجير أو مشاركة أي بيانات شخصية أو عناوين بريد إلكتروني مقدمة عبر نماذج التواصل مع أي طرف ثالث لأغراض تسويقية.
            </p>
          </div>
        );

      case 'cookies':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-black font-heading text-[#1d1d1f]">
              سياسة ملفات تعريف الارتباط (Cookies)
            </h1>
            <p className="text-xs text-[#8e8e93]">آخر تحديث: 27 سبتمبر 2026</p>

            <p className="text-sm text-[#424245] leading-relaxed">
              ملفات تعريف الارتباط هي ملفات نصية صغيرة تُحفظ على جهازك عند زيارة مواقع الويب لتذكر تفضيلاتك وتسهيل التصفح.
            </p>

            <h2 className="text-xl font-bold font-heading text-[#1d1d1f]">كيف نستخدم ملفات الكوكيز؟</h2>
            <ul className="list-disc pr-6 space-y-2 text-sm text-[#424245]">
              <li><strong>ملفات أساسية:</strong> لضمان عمل واجهة الموقع بشكل متجاوب وسريع.</li>
              <li><strong>ملفات التحليل:</strong> لقياس المقالات الأكثر قراءة وتطوير المواضيع الأكثر طلباً من الزوار.</li>
              <li><strong>ملفات الإعلانات:</strong> لعرض إعلانات ذات صلة وتفادي تكرار نفس الإعلان للمستخدم.</li>
            </ul>

            <h2 className="text-xl font-bold font-heading text-[#1d1d1f]">كيف يمكنك التحكم في الكوكيز؟</h2>
            <p className="text-sm text-[#424245] leading-relaxed">
              يمكنك في أي وقت مسح أو حظر ملفات تعريف الارتباط من خلال إعدادات متصفحك (Chrome, Safari, Edge, Firefox). يرجى ملاحظة أن حظرها قد يؤثر على تذكر بعض تفضيلات التصفح.
            </p>
          </div>
        );

      case 'disclaimer':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-black font-heading text-[#1d1d1f] flex items-center gap-2">
              <ShieldCheck className="text-[#0071e3]" size={32} />
              <span>إخلاء المسؤولية القانونية والتقنية</span>
            </h1>
            <p className="text-xs text-[#8e8e93]">تنبيه واجب ومهم لجميع الزوار</p>

            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm leading-relaxed">
              ⚠️ جميع الشروحات والنصائح والأدوات التفاعلية المتوفرة في منصة «حلّها» مقدمة لأغراض إرشادية وتثقيفية فقط.
            </div>

            <p className="text-sm text-[#424245] leading-relaxed">
              1. <strong>الأجهزة تحت الضمان:</strong> إذا كان جهازك لا يزال مشمولاً بالضمان الرسمي لشركة Apple أو Samsung أو الوكيل المعتمد، فننصحك دائماً بمراجعة الوكيل أولاً قبل إجراء أي صيانة ذاتية قد تسقط الضمان.
            </p>
            <p className="text-sm text-[#424245] leading-relaxed">
              2. <strong>الأعطال الميكانيكية العميقة:</strong> نحن نوصي بحلول منزلية وبرمجية آمنة (تنظيف السطح، فحص الكابلات، إعادة التشغيل القسري، ضبط النظام). ولا نتحمل أي مسؤولية عن أي ضرر ناتج عن الاستخدام الخاطئ أو فتح جسم الهاتف واستخدام أدوات حادة غير مخصصة.
            </p>
            <p className="text-sm text-[#424245] leading-relaxed">
              3. <strong>العلامات التجارية:</strong> أسماء iPhone و Samsung و Windows وغيرها من العلامات التجارية المذكورة هي ملك لأصحابها الشرعيين وتُذكر هنا لأغراض الوصف والشرح التقني التوضيحي فقط.
            </p>
          </div>
        );

      case 'terms':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-black font-heading text-[#1d1d1f]">
              شروط وأحكام الاستخدام
            </h1>
            <p className="text-xs text-[#8e8e93]">آخر تحديث: 27 سبتمبر 2026</p>

            <h2 className="text-xl font-bold font-heading text-[#1d1d1f]">1. قبول الشروط</h2>
            <p className="text-sm text-[#424245] leading-relaxed">
              باستخدامك لموقع «حلّها»، فإنك تقر وتوافق على الالتزام بكافة الشروط والأحكام وسياسة الخصوصية المعمول بها في هذا الموقع.
            </p>

            <h2 className="text-xl font-bold font-heading text-[#1d1d1f]">2. حقوق الملكية الفكرية</h2>
            <p className="text-sm text-[#424245] leading-relaxed">
              جميع المقالات، والتنسيقات، والأدوات البرمجية، والمحتوى المكتوب في منصة «حلّها» هو ملكية حصرية للمنصة. يُسمح بمشاركة روابط المقالات والاقتباس القصير مع ذكر المصدر ورابط صريح للموقع، ولا يُسمح بالنسخ الكامل أو إعادة النشر التجاري بدون إذن خطي مسبق.
            </p>

            <h2 className="text-xl font-bold font-heading text-[#1d1d1f]">3. التعديلات على الخدمة</h2>
            <p className="text-sm text-[#424245] leading-relaxed">
              تحتفظ المنصة بحق تعديل أو إيقاف أو تحديث أي محتوى أو أداة في أي وقت لضمان مواكبة أحدث التطورات التقنية.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6" dir="rtl">
      {/* Back button */}
      <button
        onClick={() => onNavigate('home')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071e3] hover:underline mb-8"
      >
        <ArrowLeft size={14} className="rotate-180" />
        <span>العودة للصفحة الرئيسية</span>
      </button>

      {/* Main card */}
      <div className="bg-white rounded-3xl border border-[#e8e8ed] p-6 sm:p-10 shadow-xs text-right">
        {renderContent()}
      </div>
    </div>
  );
};
