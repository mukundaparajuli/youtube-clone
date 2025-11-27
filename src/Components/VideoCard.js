import React from "react";
import { FaUser } from "react-icons/fa";
import { timeSince } from "../utils/timeSince";
import { formatViews } from "../utils/formatViews";

export const VideoCard = React.memo(({ info }) => {
  const title = info?.snippet?.title || "";
  const channelTitle = info?.snippet?.channelTitle || "";
  const viewCount = info?.statistics?.viewCount ? Number(info.statistics.viewCount) : null;
  const publishedAt = info?.snippet?.publishedAt || "";

  return (
    <div className="w-[310px] h-[280px] m-1 my-2 rounded-sm shadow-sm cursor-pointer">
      <img
        loading="lazy"
        className="rounded-md w-full h-[160px] object-cover"
        src={info?.snippet?.thumbnails?.medium?.url}
        alt={title || "Video thumbnail"}
      />
      <div className="gap-1 px-2">
        <div className="grid grid-cols-6 items-center justify-center p-1">
          <FaUser className="col-span-1 rounded-full border-black border pt-1 h-8 w-8" />
          <div className="col-span-5">
            <h1 className="font-semibold text-[16px] leading-tight font-roboto">
              {title.length <= 50 ? title : title.slice(0, 50) + "..."}
            </h1>
          </div>
        </div>
        <div className="mx-1">
          <div className="flex items-center space-x-2">
            <p className="text-[14px] font-semibold text-gray-500 font-roboto">
              {channelTitle.length <= 40
                ? channelTitle
                : channelTitle.slice(0, 40) + "..."}
            </p>
          </div>
        </div>
        <div className="bottom-4">
          <p className="text-[14px] text-gray-500 font-roboto">
            {viewCount ? `${formatViews(viewCount)} • ${publishedAt ? timeSince(publishedAt.split("T")[0]) : ""}` : "Search result"}
          </p>
        </div>
      </div>
    </div>
  );
});

export const SearchResultCard = React.memo(({ info }) => {
  const title = info?.snippet?.title || "";
  const channelTitle = info?.snippet?.channelTitle || "";
  const publishedAt = info?.snippet?.publishedAt || "";

  return (
    <div className="flex p-4 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors duration-200 max-w-4xl mx-auto">
      <div className="flex-shrink-0 mr-4">
        <img
          loading="lazy"
          className="w-64 h-36 object-cover rounded-lg shadow-sm"
          src={info?.snippet?.thumbnails?.medium?.url}
          alt={title || "Video thumbnail"}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 leading-tight overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {title}
        </h3>
        <div className="flex items-center mb-2">
          <FaUser className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
          <p className="text-sm text-gray-600 truncate">
            {channelTitle}
          </p>
        </div>
        <p className="text-sm text-gray-500">
          {publishedAt ? timeSince(publishedAt.split("T")[0]) : ""}
        </p>
      </div>
    </div>
  );
});

export const AdVideo = React.memo(({ info }) => {
  return (
    <div className="w-[310px] h-[280px] m-1 my-2 rounded-md shadow-sm border-gray-300 border-4  p-2">
      <img
        loading="lazy"
        className="rounded-md w-full h-[160px] object-cover"
        src={info?.snippet?.thumbnails?.medium?.url}
        alt={info?.snippet?.title || "Video thumbnail"}
      />
      <div className="gap-1">
        <div className="grid grid-cols-6 items-center justify-center p-1">
          {/* <FaUser className="col-span-1 rounded-full border-black border pt-1 h-8 w-8" /> */}
          <div className="col-span-5">
            <h1 className="font-semibold text-[16px] leading-tight font-roboto">
              {info?.snippet?.title.length <= 50
                ? info.snippet.title
                : info.snippet.title.slice(0, 50) + "..."}
            </h1>
          </div>
        </div>

        <div className="bottom-4">
          <p className="text-gray-600 text-xl font-roboto font-bold ">
            Advertisement
          </p>
        </div>
      </div>
    </div>
  );
});