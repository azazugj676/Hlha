import React, { useState, useEffect } from 'react';
import { Guide } from '../types';
import {
  X,
  Clock,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Copy,
  Check,
  Share2,
  Volume2,
  VolumeX,
  ThumbsUp,
  ThumbsDown,
  Wrench,
  Bookmark,
  Sparkles,
  HelpCircle,
  Code2,
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { AdSlot } from './AdSlot';

interface ArticleModalProps {
  guide: Guide | null;
  allGuides: Guide[];
  onClose: () => void;
  onOpenGuide: (id: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (guideId: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  guide,
  allGuides,
  onClose,
  onOpenGuide,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [userVote, setUserVote] = useState<'yes' | 'no' | null>(null);

  // Reset state when opening a new guide
  useEffect(() => {
    if (guide) {
      setCheckedSteps({});
      setCopied(false);
      setUserVote(null);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsReadingAloud(false);
    }
  }, [guide?.id]);

  // Clean speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!guide) return null;

  const categoryName = CATEGORIES.find((c) => c.id === guide.category)?.name || guide.category;

  const toggleStep = (idx: number) => {
    setCheckedSteps((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  // Text-to-speech reader
  const handleToggleVoice = () => {
    if (!('speechSynthesis' in window)) return;

    if (isReadingAloud) {
      window.speechSynthesis.cancel();
      setIsReadingAloud(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${guide.title}. ${guide.intro}. الخطوات: ${guide.steps
        .map((s, i) => `الخطوة ${i + 1}: ${s.title}. ${s.detail}`)
        .join('. ')}`;

      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.95;

      utterance.onend = () => setIsReadingAloud(false);
      utterance.onerror = () => setIsReadingAloud(false);

      window.speechSynthesis.speak(utterance);
      setIsReadingAloud(true);
    }
  };

  // Copy full guide summary
  const handleCopySteps = () => {
    const pageUrl = typeof window !== 'undefined' ? window.location?.href || '' : '';
    const text = `🛠️ حل المشكلة من منصة (حلّها | Halha):
${guide.title}

ملخص الحل:
${guide.intro}

الخطوات:
${guide.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.detail}`).join('\n')}

⚠️ متى تذهب للصيانة:
${guide.whenToSeekRepair}

رابط الدليل: ${pageUrl}`;

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  // Share using Web Share API
  const handleShare = async () => {
    if (navigator?.share) {
      try {
        await navigator.share({
          title: `${guide.title} - منصة حلّها`,
          text: guide.excerpt,
          url: window.location.href,
        });
      } catch {
        // Ignored
      }
    } else {
      handleCopySteps();
    }
  };

  const completedStepsCount = Object.values(checkedSteps).filter(Boolean).length;
  const progressPercent = Math.round((completedStepsCount / guide.steps.length) * 100);

  const relatedGuides = guide.relatedIds
    ? allGuides.filter((g) => guide.relatedIds?.includes(g.id))
    : allGuides.filter((g) => g.category === guide.category && g.id !== guide.id).slice(0, 2);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md animate-fade-in"
      dir="rtl"
    >
      {/* Backdrop click */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <article
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#e8e8ed] my-4 text-right animate-slide-up"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Floating Control Bar */}
        <div className="sticky top-0 z-20 px-6 py-4 bg-white/90 backdrop-blur-md border-b border-[#f0f0f3] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#8e8e93]">
            <span className="font-semibold text-[#0071e3]">{categoryName}</span>
            <span aria-hidden="true">·</span>
            <span>مستوى {guide.difficulty}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Reader */}
            {'speechSynthesis' in window && (
              <button
                onClick={handleToggleVoice}
                className={`p-2 rounded-full transition-all text-xs flex items-center gap-1.5 font-medium ${
                  isReadingAloud
                    ? 'bg-[#0071e3] text-white animate-pulse'
                    : 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]'
                }`}
                title={isReadingAloud ? 'إيقاف القراءة الصوتية' : 'استمع للخطوات صوتياً'}
              >
                {isReadingAloud ? <VolumeX size={16} /> : <Volume2 size={16} />}
                <span className="hidden sm:inline">
                  {isReadingAloud ? 'إيقاف الصوت' : 'قراءة صوتية'}
                </span>
              </button>
            )}

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(guide.id)}
              className={`p-2 rounded-full transition-all ${
                isBookmarked
                  ? 'bg-[#0071e3] text-white'
                  : 'bg-[#f5f5f7] text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
              title={isBookmarked ? 'محفوظ في قائمتك' : 'حفظ المقال'}
            >
              <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] transition-all"
              title="مشاركة المقال"
            >
              <Share2 size={16} />
            </button>

            {/* Copy button */}
            <button
              onClick={handleCopySteps}
              className="p-2 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] transition-all"
              title="نسخ الخطوات"
            >
              {copied ? <Check size={16} className="text-[#34c759]" /> : <Copy size={16} />}
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] transition-all"
              aria-label="إغلاق النافذة"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#eef4ff] to-[#f7f8fb] px-6 py-10 sm:px-10 flex flex-col items-center justify-center text-center relative border-b border-[#f0f0f3]">
          <span className="text-7xl mb-4">{guide.icon}</span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1d1d1f] font-heading leading-tight max-w-2xl">
            {guide.title}
          </h1>

          <div className="flex items-center justify-center gap-3 text-xs text-[#8e8e93] mt-4 flex-wrap">
            <span className="flex items-center gap-1">
              <Calendar size={13} />
              {guide.date}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock size={13} />
              {guide.readTime} دقائق قراءة
            </span>
            <span aria-hidden="true">·</span>
            <span>مجرّب وعملي 100%</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Intro paragraph */}
          <div className="text-base sm:text-lg text-[#3a3a3c] leading-relaxed bg-[#fbfbfd] p-5 rounded-2xl border border-[#f0f0f3]">
            {guide.intro}
          </div>

          {/* Affected Symptoms and Devices */}
          {(guide.symptoms?.length > 0 || guide.devicesAffected?.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {guide.symptoms && guide.symptoms.length > 0 && (
                <div className="p-4 rounded-2xl bg-[#fff9f2] border border-[#ffe8d1]">
                  <span className="font-bold text-[#b25e00] block mb-2">أعراض المشكلة:</span>
                  <ul className="space-y-1 text-[#663600]">
                    {guide.symptoms.map((s, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#b25e00]" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {guide.devicesAffected && guide.devicesAffected.length > 0 && (
                <div className="p-4 rounded-2xl bg-[#f5f8ff] border border-[#dce6f5]">
                  <span className="font-bold text-[#0051a8] block mb-2">الأجهزة والأنظمة المعنية:</span>
                  <ul className="space-y-1 text-[#003773]">
                    {guide.devicesAffected.map((d, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0051a8]" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Ad Slot before steps */}
          <AdSlot slotId="article-before-steps" format="banner" />

          {/* Practical Step-by-Step Implementation */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black font-heading text-[#1d1d1f] flex items-center gap-2">
                <span>خطوات الحل والتطبيق العملي</span>
                <span className="text-xs font-normal text-[#8e8e93]">
                  ({completedStepsCount}/{guide.steps.length} مكتمل)
                </span>
              </h2>

              {completedStepsCount > 0 && (
                <span className="text-xs font-bold text-[#34c759]">
                  {progressPercent}% تم تنفيذها
                </span>
              )}
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-[#f0f0f3] rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-[#0071e3] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Steps list */}
            <div className="space-y-4">
              {guide.steps.map((step, idx) => {
                const isChecked = !!checkedSteps[idx];
                return (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border transition-all duration-200 ${
                      isChecked
                        ? 'bg-[#f0f9f3] border-[#34c759]/40 text-[#1d1d1f]'
                        : 'bg-white border-[#e8e8ed] hover:border-[#0071e3]/40'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <button
                        onClick={() => toggleStep(idx)}
                        className={`w-7 h-7 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                          isChecked
                            ? 'bg-[#34c759] border-[#34c759] text-white'
                            : 'border-[#c7c7cc] bg-white hover:border-[#0071e3] text-transparent'
                        }`}
                        title={isChecked ? 'إلغاء التحديد' : 'تحديد كتمت التجربة'}
                      >
                        <Check size={16} strokeWidth={3} />
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-[#0071e3]">الخطوة {idx + 1}</span>
                          <h3
                            className={`text-base font-bold font-heading ${
                              isChecked ? 'line-through text-[#6e6e73]' : 'text-[#1d1d1f]'
                            }`}
                          >
                            {step.title}
                          </h3>
                        </div>

                        <p className="text-sm text-[#424245] leading-relaxed mt-2">
                          {step.detail}
                        </p>

                        {/* Action Code / Shortcut box */}
                        {step.actionCode && (
                          <div className="mt-3 inline-block bg-[#1d1d1f] text-white px-3 py-1.5 rounded-xl font-mono text-xs font-bold ltr:text-left shadow-sm">
                            ⌨️ {step.actionCode}
                          </div>
                        )}

                        {/* Safety Warning */}
                        {step.warning && (
                          <div className="mt-3 p-3 bg-[#fff2f2] border-r-4 border-[#ff3b30] rounded-xl text-xs text-[#d70015] flex items-start gap-2 leading-relaxed">
                            <AlertTriangle size={15} className="shrink-0 mt-0.5" />
                            <span>{step.warning}</span>
                          </div>
                        )}

                        {/* Pro Tip */}
                        {step.tip && (
                          <div className="mt-3 p-3 bg-[#e8f1ff] border-r-4 border-[#0071e3] rounded-xl text-xs text-[#004085] flex items-start gap-2 leading-relaxed">
                            <Lightbulb size={15} className="shrink-0 mt-0.5 text-[#0071e3]" />
                            <span>{step.tip}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Practical Examples if available */}
          {guide.practicalExamples && guide.practicalExamples.length > 0 && (
            <div className="p-6 rounded-3xl bg-[#fdfaf5] border border-[#f5ebd8]">
              <h3 className="text-base font-bold font-heading text-[#945500] mb-3 flex items-center gap-2">
                <span>💡 أمثلة وسيناريوهات عملية:</span>
              </h3>
              <ul className="space-y-2 text-sm text-[#663b00] leading-relaxed">
                {guide.practicalExamples.map((ex, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold text-[#b25e00]">•</span>
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Practical Tips */}
          {guide.tips && guide.tips.length > 0 && (
            <div className="p-6 rounded-3xl bg-[#f0f9f3] border border-[#cbebd4]">
              <h3 className="text-base font-bold font-heading text-[#1e6b37] mb-3 flex items-center gap-2">
                <Sparkles size={18} className="text-[#34c759]" />
                <span>نصائح ذهبية لتفادي المشكلة مستقبلاً:</span>
              </h3>
              <ul className="space-y-2 text-sm text-[#18532b] leading-relaxed">
                {guide.tips.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check size={15} className="text-[#34c759] shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Specific FAQs */}
          {guide.faqs && guide.faqs.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-[#1d1d1f] font-heading mb-4 flex items-center gap-2">
                <HelpCircle size={18} className="text-[#0071e3]" />
                <span>أسئلة شائعة حول هذا الموضوع</span>
              </h3>
              <div className="space-y-3">
                {guide.faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#fbfbfd] border border-[#e8e8ed]">
                    <h4 className="font-bold text-sm text-[#1d1d1f] mb-1.5">{faq.question}</h4>
                    <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Conclusion */}
          {guide.conclusion && (
            <div className="p-5 rounded-2xl bg-[#f5f5f7] border border-[#e8e8ed] text-sm text-[#424245] leading-relaxed">
              <strong className="block text-xs font-bold text-[#1d1d1f] uppercase mb-1">الخلاصة:</strong>
              {guide.conclusion}
            </div>
          )}

          {/* When to Seek Repair */}
          {guide.whenToSeekRepair && (
            <div className="p-6 rounded-3xl bg-[#f8f9fc] border border-[#dce6f5]">
              <div className="flex items-center gap-2.5 mb-2 font-bold text-base text-[#1d1d1f] font-heading">
                <Wrench size={18} className="text-[#0071e3]" />
                متى تتوقف وتأخذ الجهاز لمركز الصيانة المعتمد؟
              </div>
              <p className="text-sm text-[#424245] leading-relaxed">
                {guide.whenToSeekRepair}
              </p>
            </div>
          )}

          {/* Ad Slot after article */}
          <AdSlot slotId="article-after-body" format="rectangle" />

          {/* User Feedback Widget */}
          <div className="bg-[#fbfbfd] border border-[#f0f0f3] rounded-2xl p-6 text-center">
            <h4 className="text-base font-bold text-[#1d1d1f] font-heading mb-1">
              هل ساعدك هذا الشرح في حل المشكلة؟
            </h4>
            <p className="text-xs text-[#8e8e93] mb-4">رأيك يساعدنا في تحسين وتدقيق الشروحات</p>

            {userVote === null ? (
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setUserVote('yes')}
                  className="px-5 py-2.5 rounded-full bg-[#f0f9f3] text-[#34c759] hover:bg-[#34c759] hover:text-white font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <ThumbsUp size={15} />
                  نعم، انحلت مشكلتي 🎉
                </button>
                <button
                  onClick={() => setUserVote('no')}
                  className="px-5 py-2.5 rounded-full bg-[#f5f5f7] text-[#6e6e73] hover:bg-[#e8e8ed] font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <ThumbsDown size={15} />
                  لا، لا زالت مستمرة
                </button>
              </div>
            ) : (
              <div className="text-xs font-bold text-[#0071e3] animate-fade-in flex items-center justify-center gap-1.5">
                <CheckCircle2 size={16} />
                شكراً لمشاركتك! سنواصل تحديث هذا الدليل دائماً.
              </div>
            )}
          </div>

          {/* Related Articles */}
          {relatedGuides.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-[#1d1d1f] font-heading mb-3">
                مقالات وحلول أخرى مرتبطة:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedGuides.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => onOpenGuide(rel.id)}
                    className="p-4 rounded-2xl border border-[#e8e8ed] hover:border-[#0071e3] bg-white text-right flex items-center gap-3 group transition-all cursor-pointer"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {rel.icon}
                    </span>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-[#1d1d1f] group-hover:text-[#0071e3] line-clamp-1">
                        {rel.title}
                      </h4>
                      <span className="text-xs text-[#8e8e93]">
                        {rel.readTime} دقائق قراءة
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};
