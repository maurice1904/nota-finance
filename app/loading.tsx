export default function Loading() {
  return (
    <div className="min-h-[calc(100dvh-5rem)] flex flex-col items-center justify-center bg-gradient-to-br from-white via-white to-surface-100">
      {/* Spinner Container */}
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-16 h-16 border-4 border-surface-100 rounded-full" />
        
        {/* Spinning Arc */}
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-brand-900 rounded-full animate-spin" />
      </div>
      
      {/* Loading Text */}
      <p className="mt-6 text-neutral-500 font-medium text-sm tracking-wide">
        Wird geladen...
      </p>
    </div>
  );
}

