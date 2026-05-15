'use client';

import { Sparkles } from 'lucide-react';

export default function AnnouncementBar() {
  const items = [
    "Free shipping all over India and International",
    "Pure Authentic Silk Sarees",
    "Customization also available",
    "Trusted by 1000's of Happy Customers",
    "Traditional Handloom Craftsmanship",
    "100% Quality Assurance"
  ];

  return (
    <div className="bg-background text-primary py-3 overflow-hidden border-b border-primary/20 relative z-[60]">
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Render twice for seamless loop */}
        {[...Array(2)].map((_, idx) => (
          <div key={idx} className="flex items-center space-x-12 px-6">
            {items.map((item, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Sparkles size={14} className="text-secondary" fill="currentColor" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">{item}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <style jsx>{`
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
