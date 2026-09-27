import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Sparkles, Smartphone, Wifi, X, Play, Square, Check, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react';

interface QuickToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTool?: 'water' | 'touch' | 'screen' | 'network';
}

export const QuickToolsModal: React.FC<QuickToolsModalProps> = ({ isOpen, onClose, defaultTool = 'water' }) => {
  const [activeTab, setActiveTab] = useState<'water' | 'touch' | 'screen' | 'network'>(defaultTool);

  // --- Water Ejector State ---
  const [isPlayingWaterSound, setIsPlayingWaterSound] = useState(false);
  const [waterTimer, setWaterTimer] = useState(15);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // --- Touch Tester State ---
  const [touchGrid, setTouchGrid] = useState<boolean[]>(Array(64).fill(false));
  const isTouchingRef = useRef(false);

  // --- Screen Tester State ---
  const screenColors = ['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff'];
  const [colorIndex, setColorIndex] = useState(0);
  const [isFullscreenScreenTest, setIsFullscreenScreenTest] = useState(false);

  // --- Network Ping State ---
  const [pingResult, setPingResult] = useState<number | null>(null);
  const [jitter, setJitter] = useState<number | null>(null);
  const [isTestingNet, setIsTestingNet] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    setActiveTab(defaultTool);
  }, [defaultTool]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Water Eject Sound Generator (165Hz pulsed wave)
  const startWaterSound = async () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) {
        alert('المتصفح لا يدعم توليد الصوت');
        return;
      }
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(165, ctx.currentTime); // Standard acoustic water ejection frequency

      // Frequency modulation to create kinetic pulse
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(6, ctx.currentTime); // 6Hz pulsing
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(25, ctx.currentTime);
      lfo.connect(osc.frequency);
      lfo.start();

      gain.gain.setValueAtTime(0.8, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
      setIsPlayingWaterSound(true);
      setWaterTimer(15);

      // Trigger hardware vibration if supported
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate([300, 100, 300, 100, 500]);
        } catch {
          // Vibration not permitted in iframe or unsupported
        }
      }
    } catch (e) {
      console.error('Audio context error:', e);
    }
  };

  const stopWaterSound = () => {
    try {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    } catch {
      // Ignored
    }
    setIsPlayingWaterSound(false);
    setWaterTimer(15);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingWaterSound && waterTimer > 0) {
      interval = setInterval(() => {
        setWaterTimer((prev) => {
          if (prev <= 1) {
            stopWaterSound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingWaterSound, waterTimer]);

  useEffect(() => {
    if (!isOpen && isPlayingWaterSound) {
      stopWaterSound();
    }
  }, [isOpen]);

  // Touch cell activate
  const markTouchCell = (index: number) => {
    setTouchGrid((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  const resetTouchGrid = () => {
    setTouchGrid(Array(64).fill(false));
  };

  const completedCells = touchGrid.filter(Boolean).length;
  const touchPercentage = Math.round((completedCells / touchGrid.length) * 100);

  // Network Latency Test
  const runPingTest = async () => {
    setIsTestingNet(true);
    setPingResult(null);
    setJitter(null);

    const latencies: number[] = [];
    for (let i = 0; i < 4; i++) {
      const start = performance.now();
      try {
        await new Promise((resolve) => {
          const img = new Image();
          const timer = setTimeout(() => {
            img.src = '';
            resolve(null);
          }, 1500);
          img.onload = img.onerror = () => {
            clearTimeout(timer);
            resolve(null);
          };
          img.src = `/favicon.ico?_t=${Date.now()}_${i}`;
        });
        const latency = Math.round(performance.now() - start);
        latencies.push(Math.min(latency, 250));
      } catch {
        latencies.push(45);
      }
      await new Promise((r) => setTimeout(r, 120));
    }

    if (latencies.length > 0) {
      const avg = Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length);
      const jit = Math.round(Math.max(...latencies) - Math.min(...latencies));
      setPingResult(avg);
      setJitter(jit);
    }
    setIsTestingNet(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-fade-in" dir="rtl">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#e8e8ed] max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#f0f0f3] flex items-center justify-between bg-[#fbfbfd]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#e8f1ff] text-[#0071e3] flex items-center justify-center text-lg font-bold">
              🛠️
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1d1d1f] font-heading">مختبر فحص الجهاز الفوري</h2>
              <p className="text-xs text-[#6e6e73]">أدوات برمجية مجانية تعمل مباشرة في متصفحك دون الحاجة لتثبيت برامج</p>
            </div>
          </div>
          <button
            onClick={() => {
              stopWaterSound();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] flex items-center justify-center text-[#1d1d1f] transition-all"
            aria-label="إغلاق"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-[#f0f0f3] bg-[#fafafc] px-4 py-2 gap-1 overflow-x-auto text-sm">
          <button
            onClick={() => {
              stopWaterSound();
              setActiveTab('water');
            }}
            className={`px-3 py-2 rounded-xl font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'water' ? 'bg-white text-[#0071e3] shadow-sm font-semibold' : 'text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            <Volume2 size={16} />
            طرد الماء والغبار (165Hz)
          </button>

          <button
            onClick={() => {
              stopWaterSound();
              setActiveTab('touch');
            }}
            className={`px-3 py-2 rounded-xl font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'touch' ? 'bg-white text-[#0071e3] shadow-sm font-semibold' : 'text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            <Smartphone size={16} />
            فحص لمس الشاشة (Touch)
          </button>

          <button
            onClick={() => {
              stopWaterSound();
              setActiveTab('screen');
            }}
            className={`px-3 py-2 rounded-xl font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'screen' ? 'bg-white text-[#0071e3] shadow-sm font-semibold' : 'text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            <Sparkles size={16} />
            فحص البيكسلات العالقة
          </button>

          <button
            onClick={() => {
              stopWaterSound();
              setActiveTab('network');
            }}
            className={`px-3 py-2 rounded-xl font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'network' ? 'bg-white text-[#0071e3] shadow-sm font-semibold' : 'text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            <Wifi size={16} />
            استقرار البنغ (Ping)
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* 1. Water Ejector */}
          {activeTab === 'water' && (
            <div className="space-y-5 text-center">
              <div className="max-w-md mx-auto">
                <span className="text-4xl mb-3 inline-block">🔊💧</span>
                <h3 className="text-xl font-bold text-[#1d1d1f] font-heading mb-2">
                  مولّد الذبذبات الصوتية لطرد السوائل
                </h3>
                <p className="text-sm text-[#424245] leading-relaxed mb-6">
                  يولّد نغمة صوتية مدروسة بتردد <strong>165 هرتز</strong> مع تموّجات سريعة. تقوم هذه الذبذبات بهز غشاء السماعة الميكانيكي لدفع قطرات الماء والغبار العالقة في فتحات المكبر للخارج.
                </p>

                <div className="bg-[#f5f5f7] rounded-2xl p-5 mb-6 text-right space-y-2 text-xs text-[#6e6e73]">
                  <div className="flex items-center gap-2 font-semibold text-[#1d1d1f]">
                    <ShieldCheck size={16} className="text-[#0071e3]" />
                    طريقة الاستخدام الصحيحة:
                  </div>
                  <p>1. ارفع مستوى صوت الجهاز إلى <strong>الحد الأقصى (100%)</strong>.</p>
                  <p>2. وجّه فتحات السماعات نحو الأسفل وضع منديلاً جافاً تحتها.</p>
                  <p>3. اضغط "بدء التنظيف" ودع النغمة تعمل لدورة كاملة 15 ثانية.</p>
                </div>

                <div className="flex flex-col items-center justify-center gap-3">
                  {!isPlayingWaterSound ? (
                    <button
                      onClick={startWaterSound}
                      className="px-8 py-3.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full font-semibold text-base flex items-center gap-2.5 shadow-lg shadow-[#0071e3]/20 transition-all hover:scale-105 active:scale-95"
                    >
                      <Play size={18} fill="currentColor" />
                      بدء طرد الماء (15 ثانية)
                    </button>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-20 h-20 rounded-full border-4 border-[#0071e3] border-t-transparent animate-spin flex items-center justify-center">
                        <span className="text-2xl font-bold text-[#0071e3] font-heading animate-none">{waterTimer}</span>
                      </div>
                      <p className="text-sm font-semibold text-[#0071e3] animate-pulse">
                        الذبذبة نشطة الآن... وجّه السماعة لأسفل
                      </p>
                      <button
                        onClick={stopWaterSound}
                        className="px-6 py-2.5 bg-[#1d1d1f] hover:bg-black text-white rounded-full font-medium text-sm flex items-center gap-2"
                      >
                        <Square size={16} fill="currentColor" />
                        إيقاف مؤقت
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 2. Touch Screen Tester */}
          {activeTab === 'touch' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#1d1d1f] font-heading">فحص حساسية ولمس الشاشة</h3>
                  <p className="text-xs text-[#6e6e73]">اسحب بإصبعك على كامل المربعات. إذا بقي مربع أبيض لا يتلون بالأخضر، فهناك منطقة ميتة في لمس الشاشة.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#0071e3] bg-[#e8f1ff] px-2.5 py-1 rounded-full">
                    {touchPercentage}% مكتمل
                  </span>
                  <button
                    onClick={resetTouchGrid}
                    className="p-1.5 rounded-lg bg-[#f5f5f7] hover:bg-[#e8e8ed] text-xs text-[#6e6e73] flex items-center gap-1"
                    title="إعادة التعيين"
                  >
                    <RefreshCw size={14} />
                    مسح
                  </button>
                </div>
              </div>

              {/* Touch Canvas Grid */}
              <div
                className="grid grid-cols-8 gap-1.5 bg-[#f0f0f3] p-2.5 rounded-2xl select-none touch-none aspect-square sm:aspect-[4/3] max-h-[360px]"
                onPointerDown={() => {
                  isTouchingRef.current = true;
                }}
                onPointerUp={() => {
                  isTouchingRef.current = false;
                }}
                onPointerLeave={() => {
                  isTouchingRef.current = false;
                }}
              >
                {touchGrid.map((isActive, idx) => (
                  <div
                    key={idx}
                    onPointerEnter={() => {
                      if (isTouchingRef.current) markTouchCell(idx);
                    }}
                    onPointerDown={() => markTouchCell(idx)}
                    className={`rounded-lg transition-colors duration-150 cursor-crosshair flex items-center justify-center text-[10px] ${
                      isActive ? 'bg-[#34c759] text-white shadow-sm' : 'bg-white hover:bg-slate-100 text-slate-300'
                    }`}
                  >
                    {isActive ? <Check size={12} strokeWidth={3} /> : idx + 1}
                  </div>
                ))}
              </div>

              <div className="text-xs text-[#6e6e73] flex items-center justify-between">
                <span>🟢 الأخضر = المستشعر يستجيب تماماً</span>
                <span>⚪ الأبيض = مناطق لم تُختبر بعد</span>
              </div>
            </div>
          )}

          {/* 3. Screen Dead Pixel Tester */}
          {activeTab === 'screen' && (
            <div className="space-y-5 text-center">
              <div className="max-w-md mx-auto">
                <span className="text-4xl mb-3 inline-block">🖥️🔍</span>
                <h3 className="text-xl font-bold text-[#1d1d1f] font-heading mb-2">
                  كاشف البيكسلات التالفة والعالقة (Dead Pixels)
                </h3>
                <p className="text-sm text-[#424245] leading-relaxed mb-5">
                  من خلال عرض شاشات ملونة سادة بالكامل (أسود، أبيض، أحمر، أخضر، أزرق)، يمكنك بسهولة رصد أي نقطة ملونة شاذة لا تغير لونها أو نقطة مضيئة بيضاء على الخلفية السوداء.
                </p>

                <div className="flex items-center justify-center gap-2 mb-6">
                  {screenColors.map((color, index) => (
                    <button
                      key={color}
                      onClick={() => setColorIndex(index)}
                      className={`w-9 h-9 rounded-full border-2 transition-transform ${
                        colorIndex === index ? 'scale-115 border-[#0071e3] shadow-md' : 'border-black/10'
                      }`}
                      style={{ backgroundColor: color }}
                      title={`لون ${color}`}
                    />
                  ))}
                </div>

                <div
                  className="w-full h-36 rounded-2xl border border-black/10 flex items-center justify-center shadow-inner transition-colors duration-300 cursor-pointer mb-4"
                  style={{ backgroundColor: screenColors[colorIndex] }}
                  onClick={() => setColorIndex((prev) => (prev + 1) % screenColors.length)}
                >
                  <span
                    className={`text-xs px-3 py-1.5 rounded-full font-medium shadow ${
                      screenColors[colorIndex] === '#ffffff' ? 'bg-black text-white' : 'bg-white text-black'
                    }`}
                  >
                    اضغط لتغيير اللون (اللون {colorIndex + 1} من {screenColors.length})
                  </span>
                </div>

                <p className="text-xs text-[#6e6e73]">
                  💡 نصيحة: تفحص زوايا الشاشة وأطرافها بعناية بحثاً عن أي نقاط سوداء ثابتة على الخلفية البيضاء أو نقاط حمراء/خضراء على الخلفية السوداء.
                </p>
              </div>
            </div>
          )}

          {/* 4. Network Latency Tester */}
          {activeTab === 'network' && (
            <div className="space-y-5 text-center">
              <div className="max-w-md mx-auto">
                <span className="text-4xl mb-3 inline-block">📶⚡</span>
                <h3 className="text-xl font-bold text-[#1d1d1f] font-heading mb-2">
                  فاحص سرعة استجابة الإنترنت والبنغ
                </h3>
                <p className="text-sm text-[#424245] leading-relaxed mb-6">
                  افحص زمن الاستجابة الفعلي (Latency) واستقرار الخط لتحديد إن كان التقطيع من الراوتر، أو بسبب تذبذب الشبكة والضغط الخارجي.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6 text-right">
                  <div className="bg-[#f5f5f7] p-4 rounded-2xl">
                    <span className="text-xs text-[#6e6e73] block mb-1">حالة الاتصال</span>
                    <span className={`text-base font-bold flex items-center gap-1.5 ${isOnline ? 'text-[#34c759]' : 'text-[#ff3b30]'}`}>
                      <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-[#34c759]' : 'bg-[#ff3b30]'}`}></span>
                      {isOnline ? 'متصل بالإنترنت' : 'غير متصل (Offline)'}
                    </span>
                  </div>

                  <div className="bg-[#f5f5f7] p-4 rounded-2xl">
                    <span className="text-xs text-[#6e6e73] block mb-1">متوسط زمن الاستجابة</span>
                    <span className="text-xl font-bold text-[#1d1d1f] font-heading">
                      {pingResult !== null ? `${pingResult} مللي ثانية` : '—'}
                    </span>
                  </div>
                </div>

                {jitter !== null && (
                  <div className="p-3 bg-[#e8f1ff] text-[#0071e3] rounded-xl text-xs font-medium mb-6">
                    معدل التذبذب (Jitter): {jitter}ms — {jitter < 15 ? 'خط مستقر جداً ومناسب للألعاب ومكالمات الفيديو الممتازة' : 'يوجد تذبذب ملحوظ في الخط'}
                  </div>
                )}

                <button
                  onClick={runPingTest}
                  disabled={isTestingNet}
                  className="px-8 py-3.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full font-semibold text-sm flex items-center gap-2 mx-auto disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
                >
                  <RefreshCw size={16} className={isTestingNet ? 'animate-spin' : ''} />
                  {isTestingNet ? 'جاري قياس الاستجابة...' : 'بدء فحص البنغ الآن'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-[#f0f0f3] bg-[#fbfbfd] flex items-center justify-between text-xs text-[#8e8e93]">
          <span>جميع الفحوصات تتم محلياً في جهازك بدون إرسال بيانات</span>
          <button
            onClick={() => {
              stopWaterSound();
              onClose();
            }}
            className="text-[#0071e3] font-semibold hover:underline"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
