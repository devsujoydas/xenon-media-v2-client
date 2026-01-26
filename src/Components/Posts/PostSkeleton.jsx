const PostSkeleton = () => {
  return (
    <div className="shadow-xl border border-zinc-200 rounded-2xl bg-white animate-pulse p-4 space-y-4">
      {/* Author info */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-zinc-300 rounded-full"></div>
        <div className="space-y-2">
          <div className="w-32 h-4 bg-zinc-300 rounded"></div>
          <div className="w-24 h-3 bg-zinc-200 rounded"></div>
        </div>
      </div>

      {/* Post content */}
      <div className="w-3/4 h-4 bg-zinc-300 rounded"></div>
      <div className="w-full md:h-[530px] h-56 bg-zinc-200 rounded-lg"></div>

      {/* Actions */}
      <div className="flex justify-around">
        <div className="w-16 h-5 bg-zinc-300 rounded"></div>
        <div className="w-16 h-5 bg-zinc-300 rounded"></div>
        <div className="w-16 h-5 bg-zinc-300 rounded"></div>
      </div>
    </div>
  );
};

export default PostSkeleton;
