import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2, Search } from 'lucide-react';
import { Guide } from '../types';

interface RequestGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  allGuides: Guide[];
  onSelectExistingGuide: (guideId: string) => void;
}

export const RequestGuideModal: React.FC<RequestGuideModalProps> = ({
  isOpen,
  onClose,
  allGuides,
  onSelectExistingGuide,
}) => {
  const [deviceModel, setDeviceModel] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  // Real-time suggestions if user is describing an existing issue
  const matchingGuides = problemDescription.trim().length > 3
    ? allGuides.filter((g) => {
        const text = `${g.title} ${g.excerpt} ${g.tags.join(' ')}`.toLowerCase();
        return text.includes(problemDescription.trim().toLowerCase());
      }).slice(0, 2)
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemDescription.trim()) return;

    // Simulate save/request dispatch
    setSubmitted(true);
    setTimeout(() => {
      // Auto close after 2.5s
      setTimeout(() => {
        setSubmitted(false);
        setDeviceModel('');
        setProblemDescription('');
        setEmail('');
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in"
      dir="rtl"
    >
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#e8e8ed] text-right"
        role="dialog"
        aria-modal="true"
      >
        <div className="px-6 py-4 border-b border-[#f0f0f3] flex items-center justify-between bg-[#fbfbfd]">
          <div className="flex items-center gap-2">
            <span className="text-xl">📩</span>
            <h3 className="font-bold text-[#1d1d1f] font-heading text-lg">
              اقترح مشكلة أو اطلب حلاً جديداً
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] flex items-center justify-center text-[#1d1d1f]"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="py-10 text-center space-y-3 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-[#e8f1ff] text-[#0071e3] flex items-center justify-center mx-auto text-2xl shadow-sm">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-xl font-bold text-[#1d1d1f] font-heading">
                تم استلام طلبك بنجاح!
              </h4>
              <p className="text-sm text-[#6e6e73] max-w-xs mx-auto">
                شكراً لك. يقوم فريق المحتوى بتجربة الحلول وصياغة دليل خطوة بخطوة قريباً.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-[#6e6e73] leading-relaxed">
                لم تجد مشكلتك في الموقع؟ اكتب لنا نوع جهازك ووصف ما يحدث معك بدقة، وسنضيف شروحات عملية جديدة.
              </p>

              <div>
                <label className="block text-xs font-bold text-[#1d1d1f] mb-1.5">
                  نوع الجهاز والموديل:
                </label>
                <input
                  type="text"
                  placeholder="مثلاً: iPhone 14 Pro أو Galaxy S23 أو لابتوب Dell"
                  value={deviceModel}
                  onChange={(e) => setDeviceModel(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-[#e8e8ed] bg-[#fbfbfd] focus:bg-white focus:border-[#0071e3] outline-none text-sm transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1d1d1f] mb-1.5">
                  ما الذي يحدث بالضبط في الجهاز؟
                </label>
                <textarea
                  rows={3}
                  placeholder="صف المشكلة بدقة: متى بدأت؟ هل يسخن الجهاز؟ هل جربت إعادة التشغيل؟"
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#e8e8ed] bg-[#fbfbfd] focus:bg-white focus:border-[#0071e3] outline-none text-sm transition-all resize-none"
                  required
                />
              </div>

              {/* Instant match if exists */}
              {matchingGuides.length > 0 && (
                <div className="p-3 bg-[#e8f1ff] rounded-xl text-xs space-y-2 border border-[#0071e3]/20">
                  <div className="flex items-center gap-1.5 font-bold text-[#0071e3]">
                    <Search size={14} />
                    هل تقصد أحد هذه الحلول المتوفرة بالفعل؟
                  </div>
                  {matchingGuides.map((guide) => (
                    <button
                      key={guide.id}
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectExistingGuide(guide.id);
                      }}
                      className="w-full p-2 bg-white rounded-lg text-right font-medium text-[#1d1d1f] hover:text-[#0071e3] flex items-center justify-between gap-2 shadow-xs transition-colors"
                    >
                      <span className="line-clamp-1">{guide.title}</span>
                      <span className="text-[11px] text-[#0071e3] shrink-0 font-bold">
                        فتح الحل ➔
                      </span>
                    </button>
                  ))}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#1d1d1f] mb-1.5">
                  بريدك الإلكتروني (اختياري، لنخبرك حين يُنشر الحل):
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-[#e8e8ed] bg-[#fbfbfd] focus:bg-white focus:border-[#0071e3] outline-none text-sm transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1d1d1f] hover:bg-black text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Send size={15} />
                إرسال الاقتراح
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
