import React from 'react';

interface AdSlotProps {
  slotId?: string;
  format?: 'banner' | 'rectangle' | 'in-feed';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  slotId = 'default-ad-slot',
  format = 'banner',
  className = '',
}) => {
  return (
    <div
      className={`my-6 mx-auto w-full transition-all text-center ${className}`}
      dir="rtl"
    >
      <div className="relative overflow-hidden rounded-2xl border border-dashed border-[#e8e8ed] bg-[#f9f9fb] p-4 sm:p-5 flex flex-col items-center justify-center min-h-[100px] text-center">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8e8e93] bg-[#f0f0f3] px-2.5 py-0.5 rounded-full mb-1.5">
          مساحة إعلانية مصرح بها
        </span>
        <p className="text-xs text-[#6e6e73] font-medium">
          جاهز للربط مع Google AdSense — (معرف الوحدة: {slotId})
        </p>
        <span className="text-[11px] text-[#8e8e93] mt-1">
          {format === 'banner'
            ? 'متوافق مع القياس التجاوبي (Responsive Banner)'
            : format === 'rectangle'
            ? 'متوافق مع القياس المستطيل (300x250 Medium Rectangle)'
            : 'متوافق مع إعلانات التغذية (In-Feed Native)'}
        </span>
      </div>
    </div>
  );
};
