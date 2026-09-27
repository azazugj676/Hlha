import React, { useState } from 'react';
import { DIAGNOSTIC_DATA } from '../data/diagnostics';
import { Guide } from '../types';
import { ArrowLeft, ArrowRight, CheckCircle2, HelpCircle, Sparkles, AlertCircle } from 'lucide-react';

interface DiagnosticWizardProps {
  guides: Guide[];
  onSelectGuide: (guideId: string) => void;
  onClose?: () => void;
}

export const DiagnosticWizard: React.FC<DiagnosticWizardProps> = ({ guides, onSelectGuide }) => {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [selectedSymptomId, setSelectedSymptomId] = useState<string | null>(null);

  const currentDeviceObj = DIAGNOSTIC_DATA.find((d) => d.deviceType === selectedDevice);
  const selectedSymptomObj = currentDeviceObj?.symptoms.find((s) => s.id === selectedSymptomId);

  const matchedGuide = selectedSymptomObj
    ? guides.find((g) => g.id === selectedSymptomObj.targetGuideId)
    : null;

  const handleReset = () => {
    setSelectedDevice(null);
    setSelectedSymptomId(null);
  };

  return (
    <div className="bg-white rounded-3xl border border-[#e8e8ed] shadow-sm p-6 sm:p-8 relative overflow-hidden text-right" dir="rtl">
      {/* Background soft decorative gradient */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#0071e3]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-[#f0f0f3] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0071e3] bg-[#e8f1ff] px-3 py-1 rounded-full mb-2">
            <Sparkles size={14} />
            مساعد التشخيص الذكي
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] font-heading">
            لا تعرف سبب المشكلة؟ دعنا نشخّصها معاً
          </h2>
          <p className="text-sm text-[#6e6e73] mt-1">
            اختر نوع جهازك والعَرَض الظاهر وسنصل بك إلى الحل المجرّب فوراً
          </p>
        </div>

        {selectedDevice && (
          <button
            onClick={handleReset}
            className="self-start sm:self-auto text-xs font-semibold text-[#0071e3] hover:text-[#0077ed] flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] transition-colors"
          >
            بدء تشخيص جديد ↺
          </button>
        )}
      </div>

      {/* Step 1: Select Device */}
      {!selectedDevice && (
        <div>
          <h3 className="text-sm font-semibold text-[#8e8e93] mb-4 flex items-center gap-2">
            <span>الخطوة 1:</span> ما هو الجهاز الذي يواجه المشكلة؟
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {DIAGNOSTIC_DATA.map((dev) => (
              <button
                key={dev.deviceType}
                onClick={() => setSelectedDevice(dev.deviceType)}
                className="flex flex-col items-center justify-center p-5 rounded-2xl border border-[#e8e8ed] bg-[#fbfbfd] hover:bg-white hover:border-[#0071e3] hover:shadow-md transition-all group text-center"
              >
                <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                  {dev.icon}
                </span>
                <span className="text-sm font-bold text-[#1d1d1f] group-hover:text-[#0071e3]">
                  {dev.deviceName}
                </span>
                <span className="text-[11px] text-[#8e8e93] mt-1">
                  {dev.symptoms.length} أعطال شائعة
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Select Symptom */}
      {selectedDevice && !selectedSymptomId && currentDeviceObj && (
        <div>
          <div className="flex items-center gap-2 text-sm text-[#0071e3] font-semibold mb-4">
            <button
              onClick={() => setSelectedDevice(null)}
              className="hover:underline flex items-center gap-1 text-[#6e6e73]"
            >
              الأجهزة
            </button>
            <span>/</span>
            <span>{currentDeviceObj.deviceName}</span>
          </div>

          <h3 className="text-base font-bold text-[#1d1d1f] font-heading mb-4">
            الخطوة 2: ما هو أكثر عَرَض يطابق ما يحدث لجهازك؟
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {currentDeviceObj.symptoms.map((sym) => (
              <button
                key={sym.id}
                onClick={() => setSelectedSymptomId(sym.id)}
                className="p-4 rounded-2xl border border-[#e8e8ed] bg-white hover:border-[#0071e3] hover:bg-[#fbfbfd] hover:shadow-sm transition-all text-right group flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-bold text-[#1d1d1f] group-hover:text-[#0071e3] text-sm mb-1.5">
                    {sym.label}
                  </h4>
                  <p className="text-xs text-[#6e6e73] leading-relaxed">
                    {sym.description}
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-[#0071e3] font-semibold pt-2 border-t border-[#f5f5f7]">
                  <span>اختر هذا العَرَض</span>
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Diagnostic Result */}
      {selectedDevice && selectedSymptomId && selectedSymptomObj && (
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 text-sm text-[#0071e3] font-semibold mb-4">
            <button
              onClick={() => setSelectedSymptomId(null)}
              className="hover:underline flex items-center gap-1 text-[#6e6e73]"
            >
              ← اختيار عَرَض آخر
            </button>
          </div>

          <div className="bg-[#f8f9fc] border border-[#dce6f5] rounded-2xl p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0071e3] text-white flex items-center justify-center shrink-0 shadow-md">
                <CheckCircle2 size={24} />
              </div>
              <div className="flex-1">
                <span className="text-xs font-bold text-[#0071e3] uppercase tracking-wider block mb-1">
                  نتيجة التشخيص الموصى بها
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#1d1d1f] font-heading mb-2">
                  {selectedSymptomObj.label}
                </h3>
                <p className="text-sm text-[#424245] leading-relaxed mb-4">
                  {selectedSymptomObj.description}
                </p>

                {/* Quick immediate tip */}
                <div className="bg-white rounded-xl p-3.5 border border-[#e8e8ed] flex items-start gap-3 mb-5">
                  <AlertCircle size={18} className="text-[#ff9500] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-bold text-[#1d1d1f] block mb-0.5">
                      نصيحة أولية سريعة:
                    </strong>
                    <span className="text-xs text-[#6e6e73] leading-relaxed">
                      {selectedSymptomObj.quickTip}
                    </span>
                  </div>
                </div>

                {/* Action button to open full guide */}
                {matchedGuide && (
                  <button
                    onClick={() => onSelectGuide(matchedGuide.id)}
                    className="w-full sm:w-auto px-7 py-3 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full font-bold text-sm shadow-md shadow-[#0071e3]/20 flex items-center justify-center gap-2 transition-all hover:scale-102"
                  >
                    <span>عرض دليل الحل الكامل خطوة بخطوة</span>
                    <ArrowLeft size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
