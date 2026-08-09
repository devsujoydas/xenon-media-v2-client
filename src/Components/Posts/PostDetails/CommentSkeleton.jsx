const CommentSkeleton = () => {
  return (
    <div className="flex gap-3 animate-pulse">
      {/* Avatar skeleton */}
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-zinc-300 shrink-0" />

      <div className="flex-1 min-w-0 space-y-2">
        {/* Comment box skeleton */}
        <div className="bg-zinc-100 rounded-2xl px-3 py-2 space-y-2">
          {/* Author Name */}
          <div className="w-24 h-4 bg-zinc-300 rounded" />
          {/* Comment text line 1 */}
          <div className="w-full h-3 bg-zinc-200 rounded" />
          {/* Comment text line 2 */}
          <div className="w-3/4 h-3 bg-zinc-200 rounded" />
        </div>

        {/* Footer actions & timestamp skeleton */}
        <div className="flex items-center gap-4 px-2">
          <div className="w-12 h-3 bg-zinc-200 rounded" />
          <div className="w-8 h-3 bg-zinc-200 rounded" />
          <div className="w-8 h-3 bg-zinc-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export default CommentSkeleton;
