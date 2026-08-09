const UserProfileTopSkeleton = () => {
  return (
    <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl overflow-hidden border border-zinc-200 animate-pulse">
      {/* Cover Skeleton */}
      <div className="h-44 sm:h-64 w-full bg-zinc-300" />

      {/* Profile Info */}
      <div className="px-5 sm:px-8 pb-6">
        <div className="flex flex-row items-end justify-between -mt-14 sm:-mt-16">
          {/* Avatar Skeleton */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-lg shrink-0 bg-zinc-300" />

          {/* Action button Skeleton */}
          <div className="mt-3 sm:mt-0 sm:mb-2">
            <div className="w-28 h-9 bg-zinc-300 rounded-full" />
          </div>
        </div>

        {/* Name Skeleton */}
        <div className="mt-4 space-y-2">
          <div className="w-48 sm:w-64 h-7 bg-zinc-300 rounded-md" />
          {/* Username Skeleton */}
          <div className="w-32 h-4 bg-zinc-200 rounded-md" />
        </div>

        {/* Bio Skeleton */}
        <div className="mt-4 space-y-2">
          <div className="w-full sm:w-3/4 h-4 bg-zinc-200 rounded-md" />
          <div className="w-2/3 sm:w-1/2 h-4 bg-zinc-200 rounded-md" />
        </div>

        {/* Location Skeleton */}
        <div className="flex flex-col sm:flex-row sm:gap-4 mt-4 space-y-2 sm:space-y-0">
          <div className="w-36 h-4 bg-zinc-200 rounded-md" />
          <div className="w-32 h-4 bg-zinc-200 rounded-md" />
        </div>

        {/* Stats Skeleton */}
        <div className="flex mt-5 divide-x divide-zinc-200 border-t border-zinc-100 pt-4">
          <div className="px-4 sm:px-5 space-y-1">
            <div className="w-12 h-5 bg-zinc-300 rounded-md" />
          </div>
          <div className="px-4 sm:px-5 space-y-1">
            <div className="w-12 h-5 bg-zinc-300 rounded-md" />
          </div>
          <div className="px-4 sm:px-5 space-y-1">
            <div className="w-12 h-5 bg-zinc-300 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileTopSkeleton;
