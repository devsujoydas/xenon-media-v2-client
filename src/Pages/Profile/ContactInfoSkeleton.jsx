const ContactInfoSkeleton = () => {
  return (
    <div className="space-y-4 pb-8 animate-pulse">
      {/* Title skeleton */}
      <div className="h-6 w-44 bg-zinc-300 rounded-md mb-4" />

      {/* Item skeletons */}
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between p-4 rounded-xl bg-white border border-zinc-100 shadow-sm"
        >
          <div className="flex items-center gap-3">
            {/* Icon box skeleton */}
            <div className="w-10 h-10 rounded-xl bg-zinc-300" />
            {/* Label and Value text skeletons */}
            <div className="space-y-2">
              <div className="w-20 h-4 bg-zinc-300 rounded" />
              <div className="w-32 h-3 bg-zinc-200 rounded" />
            </div>
          </div>

          {/* Arrow skeleton */}
          <div className="w-4 h-4 bg-zinc-200 rounded-full" />
        </div>
      ))}
    </div>
  );
};

export default ContactInfoSkeleton;