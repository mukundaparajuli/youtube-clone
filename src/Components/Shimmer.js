import React from "react";

export const VideoFeedShimmer = () => {
  return (
    <div role="status" aria-busy="true" className="flex flex-wrap justify-evenly">
      <span className="sr-only">Loading videos</span>
      {Array(12)
        .fill("")
        .map((_, index) => (
          <div
            className="w-[310px] h-[280px] m-1 my-2 rounded-lg shadow-sm bg-white border border-gray-200 overflow-hidden"
            key={index}
            aria-hidden="true"
          >
            {/* Thumbnail shimmer */}
            <div className="h-[160px] bg-gray-200 animate-pulse relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>

            {/* Content area */}
            <div className="p-3 space-y-3">
              {/* Avatar and title row */}
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
              </div>

              {/* Channel name */}
              <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>

              {/* Views and date */}
              <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export const SearchResultsShimmer = () => {
  return (
    <div role="status" aria-busy="true" className="space-y-4">
      <span className="sr-only">Loading search results</span>
      {Array(8)
        .fill("")
        .map((_, index) => (
          <div
            className="flex p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors duration-200 max-w-4xl mx-auto"
            key={index}
            aria-hidden="true"
          >
            {/* Thumbnail shimmer */}
            <div className="flex-shrink-0 mr-4">
              <div className="w-64 h-36 bg-gray-200 rounded-lg animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              </div>
            </div>

            {/* Content area */}
            <div className="flex-1 min-w-0 space-y-3">
              {/* Title */}
              <div className="space-y-2">
                <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
              </div>

              {/* Channel info */}
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
              </div>

              {/* Date */}
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export const Shimmer = VideoFeedShimmer;
