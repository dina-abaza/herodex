'use client';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full py-16">
      <div className="relative">
        {/* الحلقة الخارجية الباهتة */}
        <div className="w-12 h-12 rounded-full border-4 border-emerald-100/50"></div>
        
        {/* الحلقة الداخلية المتحركة */}
        <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
        
        {/* تأثير توهج خلفي ناعم جداً */}
        <div className="absolute inset-0 w-12 h-12 rounded-full bg-emerald-500/10 blur-xl"></div>
      </div>
    </div>
  );
}