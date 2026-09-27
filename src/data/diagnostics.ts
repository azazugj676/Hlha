export interface DiagnosticFlow {
  deviceType: string;
  deviceName: string;
  icon: string;
  symptoms: {
    id: string;
    label: string;
    description: string;
    targetGuideId: string;
    quickTip: string;
  }[];
}

export const DIAGNOSTIC_DATA: DiagnosticFlow[] = [
  {
    deviceType: 'iphone',
    deviceName: 'آيفون (Apple iPhone)',
    icon: '📱',
    symptoms: [
      {
        id: 'iphone-charge-fail',
        label: 'الجهاز لا يشحن أو الكابل يفصل باستمرار',
        description: 'لا يظهر رمز البرق، أو الشحن متذبذب ويتوقف مع أقل حركة للكابل.',
        targetGuideId: 'iphone-not-charging',
        quickTip: 'في 80% من الحالات يكون هناك وبر مضغوط داخل منفذ Lightning أو USB-C.'
      },
      {
        id: 'iphone-screen-freeze',
        label: 'الشاشة لا تستجيب للمس أو تضغط عشوائياً',
        description: 'أزرار الكيبورد لا تستجيب، أو تفتح تطبيقات بمفردها كأن شخصاً يلمسها.',
        targetGuideId: 'iphone-touch-not-working',
        quickTip: 'افصل الشاحن فوراً إذا كانت المشكلة تظهر فقط أثناء التوصيل بالكهرباء.'
      },
      {
        id: 'iphone-hot',
        label: 'الجهاز يسخن جداً ويهبط السطوع تلقائياً',
        description: 'حرارة مرتفعة في ظهر الهاتف حتى دون فتح ألعاب ثقيلة مع بطء ملحوظ.',
        targetGuideId: 'iphone-overheating',
        quickTip: 'أوقف تحديث التطبيقات في الخلفية وتجنب الشحن السريع مع استخدام الألعاب.'
      },
      {
        id: 'iphone-storage-full',
        label: 'ذاكرة الآيفون ممتلئة وبيانات النظام ضخمة',
        description: 'لا تستطيع تصوير مقطع جديد وقسم System Data يلتهم الذاكرة.',
        targetGuideId: 'check-real-storage',
        quickTip: 'نظف سلة محذوفات الصور ومحادثات الواتساب وسجل Safari.'
      }
    ]
  },
  {
    deviceType: 'samsung',
    deviceName: 'سامسونج / أندرويد (Samsung & Android)',
    icon: '📲',
    symptoms: [
      {
        id: 'samsung-bootloop',
        label: 'الهاتف معلّق على شعار Samsung ولا يفتح',
        description: 'يعيد التشغيل باستمرار أو يقف عند شاشة الإقلاع مع اهتزاز متكرر.',
        targetGuideId: 'samsung-stuck-logo',
        quickTip: 'امسح الكاش عبر Recovery mode (Wipe Cache) دون مسح بياناتك الشخصية.'
      },
      {
        id: 'samsung-battery-fast',
        label: 'البطارية تنفد بسرعة كبيرة وتهبط فجأة',
        description: 'انخفاض سريع في نسبة الشحن مع سخونة خفيفة في الجزء العلوي.',
        targetGuideId: 'android-battery-drain',
        quickTip: 'فحص التطبيقات في الخلفية وإيقاف مسح الواي فاي الدائم لتحديد الموقع.'
      }
    ]
  },
  {
    deviceType: 'windows',
    deviceName: 'كمبيوتر / لابتوب ويندوز (Windows 10 / 11)',
    icon: '💻',
    symptoms: [
      {
        id: 'win-black-screen',
        label: 'شاشة سوداء بعد التحديث أو بعد تسجيل الدخول',
        description: 'الجهاز يعمل وتسمع صوت المراوح لكن الشاشة سوداء أو تظهر الفأرة فقط.',
        targetGuideId: 'black-screen-after-update',
        quickTip: 'اضغط مفاتيح (Win + Ctrl + Shift + B) لإعادة تنشيط تعريف كرت الشاشة فوراً.'
      },
      {
        id: 'win-usb-phone',
        label: 'الكمبيوتر لا يتعرف على الجوال عند التوصيل بالـ USB',
        description: 'الجوال يشحن فقط ولا يظهر في مستكشف الملفات أو تظهر رسالة تعذر التعرف.',
        targetGuideId: 'pc-not-recognizing-phone',
        quickTip: 'تأكد أن الكابل يدعم نقل البيانات، وغير خيار USB بالجوال إلى "نقل الملفات MTP".'
      }
    ]
  },
  {
    deviceType: 'screens',
    deviceName: 'شاشات العرض والتلفزيونات الذكية',
    icon: '📺',
    symptoms: [
      {
        id: 'tv-flicker',
        label: 'الشاشة تطفئ وتعمل تلقائياً أو ترمش (Flicker)',
        description: 'تتحول لشاشة سوداء لثانية ثم ترجع، أو يظهر تشويش متقطع في الصورة.',
        targetGuideId: 'screen-flickering',
        quickTip: 'استبدل كابل HDMI بكابل معتمد فائق السرعة، وجرب منفذ إدخال آخر.'
      }
    ]
  },
  {
    deviceType: 'network',
    deviceName: 'شبكات الواي فاي والإنترنت المنزلي',
    icon: '📶',
    symptoms: [
      {
        id: 'wifi-weak-room',
        label: 'الواي فاي ضعيف في الغرفة أو يقطع باستمرار',
        description: 'الإنترنت ممتاز بجوار الراوتر لكنه ينقطع بمجرد الدخول للغرفة المغلقة.',
        targetGuideId: 'weak-wifi',
        quickTip: 'ارفع الراوتر عن الأرض وافصل بين ترددي 2.4GHz و 5GHz بحسب المسافة.'
      }
    ]
  }
];
